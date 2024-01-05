import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import '../style.css';

function CreatePost({ isAuth }) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [postcontent, setPostContent] = useState('');

  const postCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const postDocRef = doc(db, 'posts', postId);
        const postDocSnap = await getDoc(postDocRef);

        if (postDocSnap.exists()) {
          const postData = postDocSnap.data();
          setTitle(postData.title || '');
          setPostContent(postData.postcontent || '');
        } else {
          console.log('Post not found');
        }
      }
    };

    fetchPost();
  }, [postId]);

  const createOrUpdatePost = async () => {
    if (title === '' || postcontent === '') {
      alert('Fill in all fields');
    } else {
      try {
        if (postId) {
          // Update existing post
          const postDocRef = doc(db, 'posts', postId);
          await updateDoc(postDocRef, {
            title,
            postcontent,
          });
        } else {
          // Create new post
          await addDoc(postCollectionRef, {
            title,
            postcontent,
            timestamp: serverTimestamp(),
            author: {
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid,
            },
          });
        }

        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (!isAuth && storedAuth !== 'true') {
      navigate('/login');
    }
  }, [isAuth]);

  return (
    <div className="container1">
      <h1>{postId ? 'Edit Post' : 'Create Post'}</h1>
      <label htmlFor="postTitle">Title:</label>
      <input
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="postContent">Content:</label>
      <ReactQuill
        style={{ width: '100%', height: '180px' }}
        id="postContent"
        value={postcontent}
        onChange={(value) => setPostContent(value)}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
        ]}
      />
      <input type="submit" value="Submit" onClick={createOrUpdatePost} />
    </div>
  );
}

export default CreatePost;
