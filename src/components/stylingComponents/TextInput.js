import React from 'react'

export default function TextInput({onChange, style, inputStyle, name, placeholder, icon}) {
  return (
    <div className='textInput' style={style}>
        {icon && <div className="inputAux">
            <img src={icon} alt="inputicon" style={{width: "30px", height: "30px"}} />
        </div>}
        <input className="input font1" style={inputStyle} name={name} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}
