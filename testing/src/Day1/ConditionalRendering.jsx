import React, { useState } from 'react'

const ConditionalRendering = () => {

    const[show,setShow]=useState(false)
  return (
    <div>
        <button onClick={()=>setShow(true)}>Click</button>
        {show && <p>Hello World</p>}
    </div>
  )
}

export default ConditionalRendering