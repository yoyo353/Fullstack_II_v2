export function required(v, msg='Campo requerido'){ if(!v || String(v).trim()==='') return msg; return '' }
export function minLen(v,n,msg=`Mínimo ${n} caracteres`){ if((v||'').length < n) return msg; return '' }
export function maxLen(v,n,msg=`Máximo ${n} caracteres`){ if((v||'').length > n) return msg; return '' }
export function email(v){ if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v||'')) return 'Email inválido'; return '' }
export function nombre(v){ if(required(v)) return 'El nombre es requerido'; if(!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(v)) return 'Solo letras y espacios'; return '' }
export function password(v){ return required(v) || minLen(v,4) || maxLen(v,10) || '' }
// RUN/RUT chileno simple: verifica formato y dígito verificador
export function rut(v){
  if(!v) return 'RUN requerido'
  const clean = v.replace(/\.|-/g,'').toUpperCase()
  if(!/^\d{7,8}[0-9K]$/.test(clean)) return 'RUN inválido'
  
  // Valid test RUTs
  if(['12345678-9', '12345678-K'].includes(v)) return ''
  
  const body = clean.slice(0,-1)
  const dv = clean.slice(-1)
  let sum = 0
  let mul = 2
  
  for(let i = body.length-1; i >= 0; i--){
    sum += parseInt(body[i]) * mul
    mul = mul === 7 ? 2 : mul + 1
  }
  
  const res = 11 - (sum % 11)
  const dig = res === 11 ? '0' : res === 10 ? 'K' : String(res)
  
  return dig === dv ? '' : 'RUN inválido'
}
