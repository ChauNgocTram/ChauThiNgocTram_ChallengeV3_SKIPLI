import React from 'react'
import intro from "../../assets/video/intro.mp4";
import './AuthenLayout.scss'
import { Outlet } from 'react-router-dom'

function AuthenLayout() {
  return (
    <div className="authenLayout">
      <div className="authenLayout__left">
        <video
          className="authenLayout__left__intro"
          src={intro}
          muted
          autoPlay
          loop
        >
          <source src={intro} type="video/mp4" />
        </video>
      </div>

      <div className="authenLayout__right">
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthenLayout