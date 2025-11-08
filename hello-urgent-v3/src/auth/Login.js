import React, { useState } from 'react';

function sendMockOtp(mobile){
  const code = Math.floor(1000 + Math.random()*9000).toString();
  localStorage.setItem('mock_otp_'+mobile, code);
  console.log('Mock OTP for', mobile, '->', code);
  return code;
}

export default function Login({ onLogin }){
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');

  const start = (e)=>{
    e.preventDefault();
    if(!/^[6-9]\d{9}$/.test(mobile)){
      setMsg('Enter a valid 10-digit mobile starting with 6-9');
      return;
    }
    sendMockOtp(mobile);
    setStep(2);
    setMsg('OTP sent (mock). Check console for code.');
  }

  const verify = (e)=>{
    e.preventDefault();
    const stored = localStorage.getItem('mock_otp_'+mobile);
    if(otp === stored){
      const user = { mobile };
      localStorage.setItem('hello_urgent_user', JSON.stringify(user));
      onLogin(user);
    } else {
      setMsg('Invalid OTP — check console for the mock code.');
    }
  }

  return (
    <div className="card" style={{maxWidth:420}}>
      <div className="header">
        <div className="brand">
          <div className="logo-wrap"><img src="/logo/box-lightning.svg" className="logo-img" alt="logo" /></div>
          <div>
            <div className="title">Hello Urgent</div>
            <div className="small">Mobile login — mock OTP</div>
          </div>
        </div>
      </div>

      {step===1 && (
        <form onSubmit={start}>
          <label className="small">Mobile number</label>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="e.g. 9123456789" style={{flex:1,padding:12,borderRadius:10,border:'1px solid #edf2f7'}} />
          </div>
          <div style={{height:12}} />
          <button className="btn" type="submit">Send OTP</button>
          <div style={{height:10}} />
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <button type="button" className="link" onClick={()=>{ setStep(1); setMsg('Registration flow is same — enter mobile and receive OTP.'); }}>Register</button>
            <div className="small">No real SMS — demo only</div>
          </div>
          {msg && <div style={{marginTop:12,color:'var(--primary)'}}>{msg}</div>}
        </form>
      )}

      {step===2 && (
        <form onSubmit={verify}>
          <label className="small">Enter OTP</label>
          <div className="otp-box">
            <input className="otp-input" value={otp} onChange={e=>setOtp(e.target.value)} placeholder="1234" />
          </div>
          <div style={{height:12}} />
          <button className="btn" type="submit">Verify & Login</button>
          <div style={{height:10}} />
          <button type="button" className="link" onClick={()=>{ setStep(1); setMsg(''); }}>Back</button>
          {msg && <div style={{marginTop:12,color:'var(--primary)'}}>{msg}</div>}
        </form>
      )}
    </div>
  );
}
