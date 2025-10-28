import React from 'react'

const Input = ({type,placeholder ,onChange ,className,...props}) => {
  return (
    <input type={type} onChange={onChange} placeholder={placeholder} className={className} />
  )
}

export default Input