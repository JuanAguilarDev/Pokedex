import React from 'react'
import './style.css';

export default function Pagination({onLeftClick, onRightClick, page, totalPages}) {


  return (
    <div className="pagination">
        <button onClick={onLeftClick}>
            <div>👈</div>
        </button>
        <div>{page} de {totalPages}</div>
        <button onClick={onRightClick}>
            <div>👉</div>
        </button>
    </div>
  )
}
