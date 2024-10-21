import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; 
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="box" onClick={() => navigate('/Category')}>
        <h2>Category</h2>
      </div>

      <div className="box" onClick={() => navigate('/Product')}>
        <h2>Products</h2>
      </div>
    </div>
  );
};

export default HomePage;
