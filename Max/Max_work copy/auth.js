// auth.js - front login/register (calls backend if /api exists)
async function registerUser(formId){
  const f = document.getElementById(formId);
  if(!f) return;
  f.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(f).entries());
    // try backend
    try{
      const res = await fetch('/api/register', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
      if(res.ok){ alert('Registered. You can now login.'); location.href='login.html'; return; }
    }catch(e){}
    // fallback: store in localStorage (demo only)
    const users = JSON.parse(localStorage.getItem('ever_users')||'{}');
    if(users[data.email]){ alert('User exists locally'); return; }
    users[data.email] = {name:data.name, password: data.password};
    localStorage.setItem('ever_users', JSON.stringify(users));
    alert('Registered locally (demo). Please login.');
    location.href='login.html';
  });
}

async function loginUser(formId){
  const f = document.getElementById(formId);
  if(!f) return;
  f.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(f).entries());
    // try backend
    try{
      const res = await fetch('/api/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
      if(res.ok){
        const j = await res.json();
        localStorage.setItem('ever_token', j.token || 'demo-token');
        alert('Logged in (server).');
        location.href = 'index.html';
        return;
      }
    }catch(e){}
    // fallback localStorage demo login
    const users = JSON.parse(localStorage.getItem('ever_users')||'{}');
    if(users[data.email] && users[data.email].password === data.password){
      localStorage.setItem('ever_token', 'demo-local');
      alert('Logged in (local demo).');
      location.href='index.html';
      return;
    }
    alert('Login failed.');
  });
}
