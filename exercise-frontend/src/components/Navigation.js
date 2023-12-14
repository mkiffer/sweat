// Navigation.js (example)
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/track-exercise">Track Exercise</Link>
        </li>
        <li>
          <Link to="/exercise-list">Exercise List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
