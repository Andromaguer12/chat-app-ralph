import React, { useContext, useState } from 'react'
import { getDateFromTimestamp } from '../../functions/utils'
import { UserContext } from '../../services/UserContext'



const MsgCard = ({timestamp, sender, message}) => {
    const {User} = useContext(UserContext)
    
    if(sender){
        return (
            <React.Fragment>
                <div className="messagecard" style={{ alignSelf: `${sender == User.name ? "flex-end" : "flex-start"}`, boxShadow: "none", margin: "0", maxWidth: "75%", flexFlow: "row", alignItems: "baseline"}}>
                    <div className="messagecard" style={{ 
                        background: `${sender == User.name ? "#e7e7e7" : "#0000007a"}`,        
                        borderRadius: `10px 10px ${sender == User.name ? "0px" : "10px" } ${sender != User.name ? "0px" : "10px" }`
                    }}> 
                        {message !== "" && <p className="message font1" style={{ color: `${sender == User.name ? "#7a7a7a" : "#fff"}` }}>{message}</p>}
                        <p className="font1" style={{ color: `${sender == User.name ? "#7a7a7a" : "#fff"}`, justifyContent: `${sender == User.name ? "flex-end" : "flex-start"}`}}>
                            {getDateFromTimestamp(timestamp).date} | {getDateFromTimestamp(timestamp).hour}
                        </p>
                    </div>
                </div>
            </React.Fragment>
        ) 
    }

    return <p>Nothing</p>
}

export default React.memo(MsgCard)