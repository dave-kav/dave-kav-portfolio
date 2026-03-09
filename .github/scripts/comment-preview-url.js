module.exports = async ({ github, context, app, branch }) => {
  // Cloudflare converts slashes to hyphens in branch URLs
  const sanitizedBranch = branch.replace(/\//g, '-');
  const previewUrl = `https://${sanitizedBranch}.dave-kav-${app}.pages.dev`;

  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });

  const marker = `<!-- preview-${app} -->`;
  const botComment = comments.find(c => c.body.includes(marker));

  const body = `${marker}\n### 🚀 Preview (${app})\n\n**URL:** ${previewUrl}`;

  if (botComment) {
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: botComment.id,
      body,
    });
  } else {
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body,
    });
  }
};
