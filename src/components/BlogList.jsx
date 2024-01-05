// BlogList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import '../style.css';
import adImg from '../images/img_tmp_tag1704424512605.jpg'

const BlogList = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const postsCollectionRef = collection(db, 'posts');

  const getPosts = async () => {
    setLoading(true);
    try {
      const data = await getDocs(query(postsCollectionRef, orderBy('timestamp', 'desc')));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="blog-content">
    <div className="left-column">
      {loading ? (
        <h3>Loading...</h3>
      ) : postList.length === 0 ? (
        <h3>No post added</h3>
      ) : (
        postList.map((post) => (
          <article className="blog-card" key={post.id}>
            <div className="blog-info">
              <div className="blog-summary">
                {post.postcontent.includes('<img') && (
                  <img
                    src={post.postcontent.match(/<img.*?src=['"](.*?)['"]/)?.[1]}
                    alt="Post Thumbnail"
                    className="blog-image"
                  />
                )}
                <h2 className="blog-title">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h2>
                     <p dangerouslySetInnerHTML={{ __html: post.postcontent.slice(0, 150) + '...' }} />
              </div>
              <button className="read-more-button">
                <Link to={`/post/${post.id}`}>Read More</Link>
              </button>
            </div>
          </article>
        ))
      )}
    </div>
<div className="right-column">
      <div className="ad-container">
        <img style={{width: '100%', height: 'auto'}} src={adImg} alt="ad" />
      </div>
    </div>
    </div>
  );
};

export default BlogList;
