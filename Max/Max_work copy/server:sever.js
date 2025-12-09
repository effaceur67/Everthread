const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const db = new Database('db.sqlite');

// Create tables if not exist
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, user_email TEXT, created_at TEXT, total REAL, data TEXT
)`).run();

// register
app.post('/api/register', async (req,res)=>{
  const {name, email, password} = req.body;
  if(!email || !password) return res.status(400).json({error:'missing'});
  const hashed = await bcrypt.hash(password, 10);
  try{
    const id = uuidv4();
    db.prepare('INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)').run(id, name||'', email, hashed);
    res.json({ok:true});
  }catch(e){ res.status(400).json({error:'exists'}); }
});

// login
app.post('/api/login', async (req,res)=>{
  const {email, password} = req.body;
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if(!row) return res.status(401).json({error:'unknown'});
  const ok = await bcrypt.compare(password, row.password);
  if(!ok) return res.status(401).json({error:'bad'});
  // simple token demo (not JWT)
  res.json({token: 'token-demo-'+row.id, email: row.email, name: row.name});
});

// save order
app.post('/api/orders', (req,res)=>{
  const order = req.body;
  if(!order || !order.id) return res.status(400).json({error:'bad'});
  db.prepare('INSERT INTO orders (id, user_email, created_at, total, data) VALUES (?,?,?,?,?)')
    .run(order.id, (order.billing && order.billing.email) || '', order.createdAt, Number(order.total), JSON.stringify(order));
  res.json({ok:true});
});

app.listen(3000, ()=> console.log('Server running on :3000'));
