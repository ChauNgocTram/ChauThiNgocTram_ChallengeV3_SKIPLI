import React from 'react';
import { useUserGeneratedContents } from '../../hooks/useAuth';
import './Profile.scss'
import Lottie from 'lottie-react';
import NoData from '../../assets/NoData.json'
const Profile = () => {
  const phoneNumber = localStorage.getItem("phoneNumber"); 
  const { data: contents, isLoading, isError, error } = useUserGeneratedContents(phoneNumber);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <h2>User Generated Contents</h2>
      <ul>
        {contents && contents.length > 0 ? (
          contents.map((content, index) => (
            <li key={index}>
              <h3>{content.topic}</h3>
              <p>{content.data}</p>
            </li>
          ))
        ) : (
          <div className='nodata'>
            <Lottie animationData={NoData} className="errorPage__animation" />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Profile;
