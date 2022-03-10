import React from 'react'

export default function Button({label, style, type}) {
  return (
    <button type={type} style={style} className='CustomButton font1'>
        {label}
    </button>
  )
}
