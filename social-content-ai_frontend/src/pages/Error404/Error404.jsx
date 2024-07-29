import React from 'react'
import Lottie from 'lottie-react';
import NotFound from '../../assets/NotFound.json'

import './Error404.scss'
import { NavLink } from 'react-router-dom';


function Error404() {
  return (
    <div className="errorPage">
      <Lottie animationData={NotFound} className="errorPage__animation" />
      <div className="errorPage__content">
        <p>Page not found !!!</p>
      </div>
      <NavLink to={'/'} className="errorPage__btn">
        <span className="errorPage__btn__text">
          Go Home
        </span>
      </NavLink>
    </div>
  )
}

export default Error404