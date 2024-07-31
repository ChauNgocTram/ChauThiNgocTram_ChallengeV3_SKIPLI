import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const phoneNumber = localStorage.getItem('phoneNumber');

  useEffect(() => {
    if (!phoneNumber) {
      navigate('/auth/login');
    }
  }, [navigate, phoneNumber]);

  if (!phoneNumber) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
