import React, { useState, useEffect } from 'react';
import Login from './auth/Login';
import Dashboard from './Dashboard';

export default function App(){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const stored = localStorage.getItem('hello_urgent_user');
    if(stored) setUser(JSON.parse(stored));
  },[]);

  return (
    <div className="app">
      {!user ? <Login onLogin={setUser} /> : <Dashboard user={user} onLogout={()=>{localStorage.removeItem('hello_urgent_user'); setUser(null);}} />}
    </div>
  );
}
