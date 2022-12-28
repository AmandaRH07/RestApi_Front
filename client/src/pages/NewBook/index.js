import { React, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';
import './styles.css';

export default function NewBook() {
  const [id, setId] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [price, setPrice] = useState('');

  const { bookId } = useParams();

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  const authorization = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  useEffect(() => {
    if (bookId === '0') return;
    else loadBook();
  }, bookId)

  async function saveOrUpdate(e) {
    e.preventDefault();

    const data = {
      author,
      title,
      launchDate,
      price,
    };

    try {
      if (bookId === '0') {
        await api.post('api/Book/v1', data, authorization);
      }
      else {
        data.id = id;
        await api.put('api/Book/v1', data, authorization);
      }

      navigate('/books');
    }
    catch (error) {
      alert("Falied creating new book, please try again!");
    }
  }

  async function loadBook() {
    try {
      const response = await api.get(`api/Book/v1/${bookId}`, authorization)

      let dateFormater = response.data.launchDate.split('T', 10)[0];

      setId(response.data.id);
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setLaunchDate(dateFormater);
      setPrice(response.data.price);
    }
    catch (error) {
      alert("Falied recovering books, please try again!");
      navigate('/books');
    }
  }

  return (
    <div className='new-book-container'>
      <div className='content'>
        <section className='form'>
          <h1>{(bookId === '0') ? 'Add New' : 'Update'}  Book</h1>
          <p>Enter the book information and click on '{(bookId === '0') ? 'Add New' : 'Update'}'!</p>
          <Link className='back-link' to="/books">
            <FiArrowLeft size={16} color="154c79" />
            Back to Books
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
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
            value={launchDate}
            onChange={e => setLaunchDate(e.target.value)}
          />
          <input
            placeholder='Price'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <button className='button' type="submit"> {(bookId === '0') ? 'Add' : 'Update'}</button>
        </form>
      </div>
    </div>
  )
}