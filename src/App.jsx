// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BlogList from './components/BlogList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Footer from './components/Footer';
import SearchComponent from './components/SearchComponent'; // Import the new component
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './style.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(db, 'posts');
      const snapshot = await getDocs(postsCollectionRef);
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <Router>
      <div>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <SearchComponent posts={posts} />
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/createpost/:postId?" element={<CreatePost isAuth={isAuth} />} />
       { /*  <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} /> */}
          <Route path="/" element={<BlogList posts={posts} />} />
          <Route path="/post/:id" element={<PostDetail isAuth={isAuth}/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;





/*import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BlogList from './components/BlogList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import SearchComponent from './components/SearchComponent';
import Login from './pages/Login';
import Footer from './components/Footer';
import { db } from './firebase'; // Adjust the path accordingly
import { collection, getDocs } from 'firebase/firestore';
import './style.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuth(true);
    }
  }, []);
  return (
    <Router>
      <div>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <SearchComponent posts={posts} />
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="/createpost"
            element={<CreatePost isAuth={isAuth}/>} 
          />
          <Route path="/" element={<BlogList />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
*/