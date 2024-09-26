import React, { useEffect } from 'react'
import './Header.css';
import store from '../../../Redux/Store';
import { Link } from 'react-router-dom';


type Props = {}

const Header = (props: Props) => {
  const [userDetails, setUserDetails] = React.useState(store.getState().auth.user);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => setUserDetails(store.getState().auth.user));
    return () => {
      unsubscribe();
    }
  }, [])
  return (
    <div className='header'>
      {userDetails?.token ? (
        <>
          <p>Welcome, {userDetails.name}</p>
          <Link to="/logout" className="header-link">Logout</Link>
        </>
      ) : (
        <>
          <p>Welcome, Guest</p>
          <Link to="/login" className="header-link">Login</Link>
        </>
      )}
    </div>
  );
}

export default Header;
