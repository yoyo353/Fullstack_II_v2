import React from 'react'
import { useCart } from '../context/CartContext'
export default function Cart(){
  const { items, remove, clear, totalAmount } = useCart()
  const arr = Object.values(items)
  if(!arr.length) return <p className="text-center">Tu carrito está vacío.</p>
  return (
    <div className="card p-3">
      <h4>Carrito</h4>
      <ul className="list-group list-group-flush">
        {arr.map(it => (
          <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-light" key={it.id}>
            <div><strong>{it.nombre || it.name}</strong> <span className="text-secondary">x{it.qty}</span></div>
            <div className="d-flex gap-3 align-items-center">
              <span>$ {(it.qty*it.precio||it.qty*it.price).toLocaleString('es-CL')}</span>
              <button className="btn btn-sm btn-outline-light" onClick={()=>remove(it.id)}>Quitar</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <strong>Total: $ {totalAmount.toLocaleString('es-CL')}</strong>
        <div className="d-flex gap-2">
          <button className="btn btn-secondary" onClick={clear}>Vaciar</button>
          <button className="btn btn-accent">Pagar</button>
        </div>
      </div>
    </div>
  )
}
