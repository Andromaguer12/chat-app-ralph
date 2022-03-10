import React from 'react'

export default function SendButton({label, icon, style, type}) {
  return (
    <button type={type} style={style} className='SendButton font1'>
        <img src={icon} alt={label} style={{ width: "100%", height: "100%" }} />
    </button>
  )
}