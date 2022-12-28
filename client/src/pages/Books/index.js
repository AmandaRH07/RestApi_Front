import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api';
import './styles.css';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const userName = localStorage.getItem('userName');

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  const authorization = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  useEffect(() => {
    fetchMoreBooks();

  }, [accessToken]);

  async function fetchMoreBooks() {
    const response = await api.get(`api/Book/v1/findBooksPaged?page=${page}&sortDirection=asc&size=6`, authorization)
    setBooks([...books, ...response.data.list]);
    setPage(page + 1);
  }

  async function deleteBook(id) {
    try {
      await api.delete(`api/Book/v1/${id}`, authorization);

      setBooks(books.filter(book => book.id !== id));
    }
    catch (error) {
      alert('Delete failed! Try again');
    }
  }

  async function editBook(id) {
    try {
      navigate(`new/${id}`);
    }
    catch (error) {
      alert('Edit failed! Try again');
    }
  }

  async function logout() {
    try {
      await api.get('/api/Auth/v1/revoke', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      localStorage.clear();
      navigate('/');
    }
    catch (error) {
      alert('Logout failed! Try again');
    }
  }

  return (
    <div className='book-container'>
      <header>
        <span>Welcome, <strong>{userName.toUpperCase()}</strong>!</span>
        <Link
          className='button'
          to='new/0'>
          Add new book
        </Link>
        <button type="button">
          <FiPower
            size={18}
            color="#154c79"
            onClick={logout} />
        </button>
      </header>
      <h1>Registered Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>Title:</strong>
            <p>{book.title}</p>
            <strong>Author:</strong>
            <p>{book.author}</p>
            <strong>Price:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}</p>
            <strong>Release Date:</strong>
            <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
            <button
              type="button"
              onClick={() => editBook(book.id)}>
              <FiEdit size={20} color="1e81b0" />
            </button>
            <button
              type="button"
              onClick={() => deleteBook(book.id)}>
              <FiTrash2 size={20} color="1e81b0" />
            </button>
          </li>
        ))}
      </ul>

      <button
        style={{marginTop:'30px'}}
        className='button'
        type='button'
        onClick={fetchMoreBooks}>
        Load More
      </button>
    </div>
  )
}
