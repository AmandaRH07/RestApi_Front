import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function Cards() {
  return (
    <div>
      <li>
        <strong>Title:</strong>
        <p>Docker Deep Dive</p>

        <strong>Autor:</strong>
        <p>Nigel Poulton</p>

        <strong>Price:</strong>
        <p>47,90</p>

        <strong>Release Date:</strong>
        <p>12/07/2017</p>

        <button type="button">
          <FiEdit size={20} color="1e81b0" />
        </button>
        <button type="button">
          <FiTrash2 size={20} color="1e81b0" />
        </button>
      </li>
    </div>
  )
}
