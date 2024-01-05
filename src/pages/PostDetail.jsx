// PostDetail.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../style.css';
import adImg from '../images/img_tmp_tag1704424512605.jpg';

const PostDetail = ({ isAuth }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      const postDocRef = doc(db, 'posts', id);
      const postDocSnap = await getDoc(postDocRef);

      if (postDocSnap.exists()) {
        setPost({ id: postDocSnap.id, ...postDocSnap.data() });
      } else {
        console.log('Post not found');
      }
    };

    fetchPost();
  }, [id]);

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, 'posts', id);
      await deleteDoc(postDoc);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const navigateToEdit = () => {
    navigate(`/createpost/${id}`);
  };

  return (
    <div className="blog-content">
      {post ? (
        <div className="left-column">
          <article className="blog-card" key={post.id}>
            <div className="blog-info">
              <h2 className="blog-title">{post.title}</h2>
              <p
                className="blog-summary"
                dangerouslySetInnerHTML={{ __html: post.postcontent }}
              />
            </div>
          </article>
          <div className="btn-wrap">
            <button onClick={navigateToEdit} className="edit-btn">
              edit
            </button>
            {isAuth && post.author.id === auth.currentUser.uid && (
              <button onClick={() => deletePost(post.id)} className="delete-btn">
                delete
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="right-column">
        <div className="ad-container">
          <img style={{ width: '100%', height: 'auto' }} src={adImg} alt="ad" />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
