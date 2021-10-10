import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import './Footer.css';

const Footer = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  if (!user) {
    return <div></div>;
  } else {
    return (
      <div>
        <h1>This is footer</h1>
      </div>
    )
  }
};

export default Footer;
