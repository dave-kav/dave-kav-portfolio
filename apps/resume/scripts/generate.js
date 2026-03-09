import { writeFileSync } from 'fs';
import { experiences, education, profile } from '@dave-kav/config';

function escapeLatex(str) {
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

function formatPeriod(period) {
  return period.replace(' - ', '--').replace('Present', 'Present');
}

function generateExperience(experiences) {
  return experiences.map(exp => {
    const highlights = exp.highlights
      .map(h => `    \\item ${escapeLatex(h)}`)
      .join('\n');

    return `\\cventry{${formatPeriod(exp.period)}}{${escapeLatex(exp.role)}}{${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}{}{
\\begin{itemize}\\itemsep -2pt
${highlights}
\\end{itemize}}`;
  }).join('\n\n');
}

function generateEducation(educationList) {
  return educationList.map(edu => {
    const highlights = edu.highlights
      ? edu.highlights.map(h => `    \\item ${escapeLatex(h)}`).join('\n')
      : '';

    const content = highlights
      ? `{
\\begin{itemize}\\itemsep -2pt
${highlights}
\\end{itemize}}`
      : '{}';

    return `\\cventry{${formatPeriod(edu.period)}}{${escapeLatex(edu.degree)}}{${escapeLatex(edu.school)}}{${escapeLatex(edu.location)}}{}${content}`;
  }).join('\n\n');
}

function generate() {
  console.log('Loading config data from @dave-kav/config...');

  const latex = `\\documentclass[10pt,a4paper,sans]{moderncv}
\\moderncvstyle{classic}
\\moderncvcolor{blue}

\\usepackage[scale=0.92]{geometry}
\\setlength{\\hintscolumnwidth}{2.5cm}

% Personal Information
\\name{David}{Kavanagh}
\\email{work@dave-kav.com}
\\phone[mobile]{083 427 4918}
\\social[linkedin]{dave-kav}
\\social[github]{dave-kav}
\\homepage{dave-kav.com}

\\begin{document}

\\makecvtitle

\\section{Profile}
${escapeLatex(profile.summary)}

\\section{Core Skills}
\\cvitem{Languages}{${escapeLatex(profile.skills.languages)}}
\\cvitem{Data}{${escapeLatex(profile.skills.data)}}
\\cvitem{Tools}{${escapeLatex(profile.skills.tools)}}
\\cvitem{Architecture}{${escapeLatex(profile.skills.architecture)}}
\\cvitem{DevOps}{${escapeLatex(profile.skills.devops)}}
\\cvitem{Leadership}{${escapeLatex(profile.skills.leadership)}}

\\section{Experience}
${generateExperience(experiences)}

\\section{Education}
${generateEducation(education)}

\\end{document}
`;

  writeFileSync('resume.tex', latex);
  console.log('Generated resume.tex');
}

generate();
