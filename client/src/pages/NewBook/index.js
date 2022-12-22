import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';
import './styles.css';

export default function NewBook() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [lauchDate, setLauchDate] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  async function createNewBook(e) {
    e.preventDefault();

    const data = {
      author,
      title,
      lauchDate,
      price,
    };

    const accessToken = localStorage.getItem('accessToken');

    try {
      await api.post('api/Book/v1', data, {
        headers:{
          Authorization: `Bearer ${accessToken}` 
        }
      });

      navigate('/books');
    }
    catch (error) {
      alert("Falied creating new book, please try again!" + error);
    }
  }

  return (
    <div className='new-book-container'>
      <div className='content'>
        <section className='form'>
          <h1>Add New Book</h1>
          <p>Enter the book information and click on 'Add'!</p>
          <Link className='back-link' to="/books">
            <FiArrowLeft size={16} color="154c79" />
            Home
          </Link>
        </section>
        <form onSubmit={createNewBook}>
          <input
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            placeholder='Author'
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <input
            type='Date'
            value={lauchDate}
            onChange={e => setLauchDate(e.target.value)}
          />
          <input
            placeholder='Price'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <button className='button' type="submit">Add</button>
        </form>
      </div>
    </div>
  )
}