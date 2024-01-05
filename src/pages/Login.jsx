import React from 'react';
import {auth, provider} from '../firebase'
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../style.css'; // Include your CSS file
const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result)=>{
   localStorage.setItem('isAuth', 'true')
   setIsAuth(true);
   navigate('/');
 })
}
  return (
   <div className="card">
  <h2>Sign in with Google</h2>
 <button className="button" onClick={signInWithGoogle}>
  Google
</button>
  </div>
);
}
export default Login;
