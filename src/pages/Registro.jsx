import React from 'react'
import regiones from '../data/regiones.json'
import { useAuth } from '../context/AuthContext'
import { nombre as vNombre, email as vEmail, password as vPass, rut as vRut, required } from '../utils/validators'
import { useNavigate } from 'react-router-dom'

export default function Registro(){
  const { register } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = React.useState({ nombre:'', email:'', password:'', run:'', region:'', comuna:'' })
  const [errors, setErrors] = React.useState({})

  const comunas = React.useMemo(()=> regiones[form.region] || [], [form.region])

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if(name==='region') setForm(prev => ({ ...prev, comuna:'' }))
  }

  function validate(){
    const e = {}
    const n = vNombre(form.nombre); if(n) e.nombre = n
    const em = vEmail(form.email); if(em) e.email = em
    const pw = vPass(form.password); if(pw) e.password = pw
    const r = vRut(form.run); if(r) e.run = r
    if(!form.region) e.region = 'Selecciona región'
    if(!form.comuna) e.comuna = 'Selecciona comuna'
    setErrors(e); return Object.keys(e).length===0
  }

  function onSubmit(ev){
    ev.preventDefault()
    if(!validate()) return
    try{
      register(form)
      alert('Usuario registrado. Ahora puedes iniciar sesión.')
      nav('/login')
    }catch(err){
      setErrors({ email: err.message })
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="card p-4">
          <h3 className="mb-3">Registro</h3>
          <form onSubmit={onSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Nombre</label>
                <input name="nombre" className={'form-control ' + (errors.nombre?'is-invalid':'')}
                  value={form.nombre} onChange={handleChange} />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Email</label>
                <input name="email" type="email" className={'form-control ' + (errors.email?'is-invalid':'')}
                  value={form.email} onChange={handleChange} />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Contraseña</label>
                <input name="password" type="password" className={'form-control ' + (errors.password?'is-invalid':'')}
                  value={form.password} onChange={handleChange} />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">RUN (RUT)</label>
                <input name="run" className={'form-control ' + (errors.run?'is-invalid':'')}
                  value={form.run} onChange={handleChange} placeholder="12.345.678-5" />
                {errors.run && <div className="invalid-feedback">{errors.run}</div>}
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Región</label>
                <select name="region" className={'form-select ' + (errors.region?'is-invalid':'')}
                  value={form.region} onChange={handleChange}>
                  <option value="">Selecciona...</option>
                  {Object.keys(regiones).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.region && <div className="invalid-feedback">{errors.region}</div>}
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Comuna</label>
                <select name="comuna" className={'form-select ' + (errors.comuna?'is-invalid':'')}
                  value={form.comuna} onChange={handleChange} disabled={!comunas.length}>
                  <option value="">Selecciona...</option>
                  {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-accent">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
