import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { email as vEmail, password as vPass } from '../utils/validators'

export default function Login(){
  const { user, login } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState({})
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  if(user) return <div className="text-center"><h4>Ya estás logueado</h4><p>{user.email}</p></div>

  function validate(){
    const e = {}
    const e1 = vEmail(email); if(e1) e.email = e1
    const e2 = vPass(password); if(e2) e.password = e2
    setErrors(e); return Object.keys(e).length===0
  }

  async function onSubmit(ev){
    ev.preventDefault(); setError('')
    if(!validate()) return
    try{
      setLoading(True)
    }catch(e){}
  }
  async function onSubmit(ev){
    ev.preventDefault(); setError('')
    if(!validate()) return
    try{
      setLoading(true)
      await login(email.trim(), password)
      navigate(from, { replace:true })
    }catch(err){
      setError(err.message||'Error de login')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card p-4">
          <h3 className="mb-3">Iniciar sesión</h3>
          <form onSubmit={onSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className={'form-control ' + (errors.email?'is-invalid':'')}
                value={email} onChange={e=>setEmail(e.target.value)} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className={'form-control ' + (errors.password?'is-invalid':'')}
                value={password} onChange={e=>setPassword(e.target.value)} />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button disabled={loading} className="btn btn-accent w-100" type="submit">
              {loading? 'Ingresando...' : 'Ingresar'}
            </button>
            <p className="text-secondary mt-3 small">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
