import React, { useEffect } from 'react'
import './Logout.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../Redux/Slices/AuthSlice';
import { clearAdmin } from '../../../Redux/Slices/AdminSlice';
import { clearCompany } from '../../../Redux/Slices/CompanySlice';
import { clearCustomer } from '../../../Redux/Slices/CustomerSlice';


type Props = {}

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutAction());
    dispatch(clearAdmin());
    dispatch(clearCompany());
    dispatch(clearCustomer());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <div className="logout">
      <div className="logout-message">
        <h2>Logging Out...</h2>
        <p>You are being safely logged out. Please wait...</p>
      </div>
    </div>
  );
}

export default Logout;