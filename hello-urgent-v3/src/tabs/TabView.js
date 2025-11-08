import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabView({ modules }){
  const keys = Object.keys(modules);
  const [active, setActive] = useState(keys[0]);

  return (
    <div>
      <div className="tabs">
        {keys.map(k=>(
          <div key={k} className={'tab '+(active===k?'active':'')} onClick={()=>setActive(k)}>{k.toUpperCase()}</div>
        ))}
      </div>

      <div style={{marginTop:16}}>
        <AnimatePresence exitBeforeEnter>
          <motion.div key={active} initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} exit={{opacity:0, y:-6}} transition={{duration:0.28}}>
            <div className="grid">
              {modules[active].map(item=>(
                <div className="module" key={item.id}>
                  <div style={{fontWeight:800}}>{item.name}</div>
                  <div className="small" style={{marginTop:6}}>{item.description}</div>
                  <div style={{height:10}} />
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontWeight:700}}>₹{item.price}</div>
                    <button className="btn" onClick={()=>alert('Added '+item.name)}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
