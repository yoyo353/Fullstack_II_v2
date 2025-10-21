import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
export default function CartWidget(){
  const { totalItems } = useCart()
  return (
    <Link to="/cart" className="btn btn-outline-light">
      🛒 Carrito <span className="badge bg-light text-dark ms-2">{totalItems}</span>
    </Link>
  )
}
