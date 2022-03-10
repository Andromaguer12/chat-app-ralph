import React from 'react'
import { getDateFromTimestamp } from '../../functions/utils'
import image from "../../assets/users-icon.png"

export default function UserCards({card}) {
  return (
    <div className='UserCard'>
        <div style={{ width: 30, height: 30, margin: "0 15px", padding: 5, background: "#fff", borderRadius: "50%", display: 'flex', flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={image} alt="icon" style={{ width: "100%", height: "100%" }} />
        </div>
        <div>
            <p className='font1' style={{ width: "100%", fontWeight: "bold", fontSize: "20px", color: "#fff" }}>
                {card.name}
            </p>
            <p className='font1' style={{ width: "100%", color: "#fff" }}>
                Ultima vez {getDateFromTimestamp(card.timestamp).date} | {getDateFromTimestamp(card.timestamp).hour}
            </p>
            
        </div>
    </div>
  )
}
