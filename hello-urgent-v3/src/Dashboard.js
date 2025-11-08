import React from 'react';
import TabView from './tabs/TabView';
import data from './data/mock';

export default function Dashboard({ user, onLogout }){
  return (
    <div className="card" style={{maxWidth:980}}>
      <div className="header">
        <div className="brand">
          <div className="logo-wrap"><img src="/logo/box-lightning.svg" className="logo-img" alt="logo" /></div>
          <div>
            <div className="title">Hello Urgent</div>
            <div className="small">Welcome — {user.mobile}</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className="link" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <TabView modules={data} />
    </div>
  );
}
