import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import projectsData from '../data/projects.json';
import blogsData from '../data/blogs.json';
import profileData from '../data/profile.json';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // API routes
    switch (path) {
      case '/api/experience':
        return jsonResponse(experienceData);

      case '/api/education':
        return jsonResponse(educationData);

      case '/api/projects':
        return jsonResponse(projectsData);

      case '/api/blogs':
        return jsonResponse(blogsData);

      case '/api/profile':
        return jsonResponse(profileData);

      case '/api/all':
        return jsonResponse({
          experience: experienceData,
          education: educationData,
          projects: projectsData,
          blogs: blogsData,
          profile: profileData,
        });

      case '/':
        return jsonResponse({
          endpoints: [
            '/api/experience',
            '/api/education',
            '/api/projects',
            '/api/blogs',
            '/api/all',
          ],
        });

      default:
        // Let assets handle static files (logos, etc.)
        return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
    }
  },
};
