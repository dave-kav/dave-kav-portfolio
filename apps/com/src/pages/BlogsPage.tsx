import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchRSSFeed } from '../utils/rssFetcher';
import { BlogPost } from '../types/blog';
import '../styles/bento.css';

const BlogsPage: FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetchRSSFeed('https://davekav.substack.com/feed');
        if (response.status === 'ok') {
          setBlogs(response.items);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <main className="bento">
      {/* Header */}
      <header className="blogs__header">
        <Link to="/" className="blogs__back">&larr; Back</Link>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Writing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Thoughts on software engineering, distributed systems, and building things.
        </motion.p>
        <motion.a
          href="https://davekav.substack.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="blogs__subscribe"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Subscribe on Substack
        </motion.a>
      </header>

      {/* Posts */}
      <section className="blogs__list">
        {loading ? (
          <div className="blogs__loading">Loading posts...</div>
        ) : (
          blogs.map((blog, index) => (
            <motion.article
              key={index}
              className="blogs__post"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <time>{formatDate(blog.pubDate)}</time>
              <h2>
                <a href={blog.link} target="_blank" rel="noopener noreferrer">
                  {blog.title}
                </a>
              </h2>
              <div
                className="blogs__excerpt"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blogs__read-more"
              >
                Read post &rarr;
              </a>
            </motion.article>
          ))
        )}
      </section>

      {/* Footer */}
      <footer className="bento__footer">
        <span>&copy; {new Date().getFullYear()} David Kavanagh</span>
        <span className="bento__footer-hint">Press ⌘K for options</span>
      </footer>
    </main>
  );
};

export default BlogsPage;
