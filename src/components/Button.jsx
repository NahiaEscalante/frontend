import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const Button = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(props.to);
  };

  const currentButton = location.pathname === props.to ? 'bg-primary text-white font-bold' : 'bg-secondary';

  return (
    <button 
      className={`${currentButton} mx-6 py-2 px-4 rounded-full cursor-pointer`}
      onClick={handleClick}
    >
      {props.message}
    </button>
  )
}
