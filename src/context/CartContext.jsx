import React, { createContext, useContext, useMemo, useReducer } from 'react'
const CartContext = createContext(null)
function reducer(state, action){
  switch(action.type){
    case 'ADD':{
      const e = state.items[action.payload.id] || { ...action.payload, qty:0 }
      const items = { ...state.items, [action.payload.id]: { ...e, qty: e.qty+1 } }
      return { ...state, items }
    }
    case 'REMOVE':{
      const e = state.items[action.payload]; if(!e) return state
      const qty = e.qty-1; const items = { ...state.items }
      if(qty<=0) delete items[action.payload]; else items[action.payload] = { ...e, qty }
      return { ...state, items }
    }
    case 'CLEAR': return { ...state, items:{} }
    default: return state
  }
}
const initial = { items:{} }
export function CartProvider({children}){
  const [state, dispatch] = React.useReducer(reducer, initial)
  const totalItems = useMemo(()=>Object.values(state.items).reduce((a,i)=>a+i.qty,0),[state.items])
  const totalAmount = useMemo(()=>Object.values(state.items).reduce((a,i)=>a+i.qty*i.price,0),[state.items])
  const value = useMemo(()=> ({
    items: state.items, add:(p)=>dispatch({type:'ADD',payload:p}),
    remove:(id)=>dispatch({type:'REMOVE',payload:id}),
    clear:()=>dispatch({type:'CLEAR'}), totalItems, totalAmount
  }),[state.items, totalItems, totalAmount])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart(){
  const ctx = useContext(CartContext); if(!ctx) throw new Error('useCart dentro de provider'); return ctx
}
