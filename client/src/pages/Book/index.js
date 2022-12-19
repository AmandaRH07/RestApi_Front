import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi'
import './styles.css';

export default function Book() {
  return (
    <div className='book-container'>
      <header>
        <span>Welcome, <strong>Amanda</strong>!</span>
        <Link
          className='button'
          to='book/new'>
          Add new book
        </Link>
        <button type="button">
          <FiPower
            size={18}
            color="#154c79" />
        </button>
      </header>
    </div>
  )
}
