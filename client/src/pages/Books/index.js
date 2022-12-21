import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi'
import Cards from './cards';
import './styles.css';

export default function Books() {
  return (
    <div className='book-container'>
      <header>
        <span>Welcome, <strong>Amanda</strong>!</span>
        <Link
          className='button'
          to='new'>
          Add new book
        </Link>
        <button type="button">
          <FiPower
            size={18}
            color="#154c79" />
        </button>
      </header>
      <h1>Registered Books</h1>
      <ul>
         <Cards/>
         <Cards/>
         <Cards/>
      </ul>
     </div>
  )
}
