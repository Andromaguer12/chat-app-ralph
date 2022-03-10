import React, { useContext, useEffect, useRef, useState } from 'react'
import background from "../assets/background1.jpg"
import TextInput from '../components/stylingComponents/TextInput'
import "../css/dashboard.css"
import send from "../assets/send.png"
import SendButton from '../components/stylingComponents/SendButton'
import { UserContext } from '../services/UserContext'
import axios from 'axios'
import { APIURL, SERVERURL } from '../constants/API'
import UserCards from '../components/dashboardComps/UserCards'
import "../css/cssLoader.css"
import MsgCard from '../components/dashboardComps/msgCard'
import io from "socket.io-client"
import user from "../assets/users-icon-white.png"

const server = io.connect(SERVERURL)

export default function Dashboard() {
	const {User} = useContext(UserContext)
	const [toggleDrawer, settoggleDrawer] = useState(false)
	const [Users, setUsers] = useState([])
	const [Messages, setMessages] = useState([])

	// users
	useEffect(() => {
		axios.get(APIURL + "/users").then((response) => {
			setUsers(response.data.users)
		})
	}, [])

	// messages
	useEffect(() => {
		if(Messages.length === 0){
			axios.get(APIURL + "/messages").then((response) => {
				if(response.data !== "No data"){
					setMessages(response.data.chat)
				}
				else{
					console.log(" no hay datos ")
				}
			})
		}
	}, [Messages])
	
	useEffect(() => {	
		server.on('new message', (data) => {
			setMessages(data)
		})
	}, [])

	useEffect(() => {
		const container = document.getElementById("messagescontainer")
		container.scrollTop = container.scrollHeight
	}, [Messages])
	

	const sendMessage = async (e) => {
		e.preventDefault()
		const form = new FormData(e.target)
		const content = form.get("content")
		if(content.length > 0){
			const object = {
				sender: User.name,
				content,
				timestamp: new Date().getTime()
			}
			server.emit('messages', object)
			e.target.reset()
		}
	}	

	return (
		<div className='ChatPage' style={{ backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
			{toggleDrawer && <div className='drawer'>
				<div className='ButtonHeader'>
					<button onClick={() => settoggleDrawer(!toggleDrawer)} className='SendButton font1' style={{ borderRadius: "10px"}}>
						<p className='font1' style={{ color: "#e7e7e7", fontWeight: "lighter", fontSize: "20px" }}>
							Cerrar
						</p>	
					</button>
				</div>
				<div className='UsersHeader'>
					<h1 className='font1' style={{ color: "#e7e7e7", fontSize: "40px"}}>
						Usuarios
					</h1>
					<div style={{display: "flex", flexFlow: "row", alignItems: "center"}}>
						<p className='font1' style={{ color: "#e7e7e7", fontWeight: "lighter", fontSize: "20px" }}>
							Conectado como {User.name} 
						</p>
						<div style={{ background: "lightgreen", borderRadius: "50%", width: 10, height: 10, marginLeft: 10}}></div>
					</div>
				</div>
				{Users.length > 0 ? <React.Fragment>
					{Users.map((user) => (
						<UserCards key={user.id} card={user} />
					))}
				</React.Fragment> : <React.Fragment>
					<div className="lds-ripple"><div></div><div></div></div>
				</React.Fragment>}
			</div>}
			<div className='ButtonHeader'>
				<button onClick={() => settoggleDrawer(!toggleDrawer)} className='SendButton font1'>
					<img src={user} alt="users-button" style={{ width: 20, height: 20 }} />
				</button>
			</div>
			<div className='ChatContainer'>
				<div className='UsersDiv'>
					<div className='UsersHeader'>
						<h1 className='font1' style={{ color: "#e7e7e7", fontSize: "40px"}}>
							Usuarios
						</h1>
						<div style={{display: "flex", flexFlow: "row", alignItems: "center"}}>
							<p className='font1' style={{ color: "#e7e7e7", fontWeight: "lighter", fontSize: "20px" }}>
								Conectado como {User.name} 
							</p>
							<div style={{ background: "lightgreen", borderRadius: "50%", width: 10, height: 10, marginLeft: 10}}></div>
						</div>
					</div>
					{Users.length > 0 ? <React.Fragment>
						{Users.map((user) => (
							<UserCards key={user.id} card={user} />
						))}
					</React.Fragment> : <React.Fragment>
						<div className="lds-ripple"><div></div><div></div></div>
					</React.Fragment>}
				</div>
				<div className='ChatDiv'>
					<div className='header'>
						<h1 className='font1 chatTitle' style={{ color: "#e7e7e7"}}>
							Bienvenido al chat grupal!
						</h1>
						<p className='font1' style={{ color: "#e7e7e7", fontWeight: "lighter", fontSize: "20px" }}>
							Aqui podras interactuar con otros usuarios.
						</p>
					</div>
					<div className='MessagesContainer' id="messagescontainer">
						{Messages.length > 0 ? <React.Fragment>
							{Messages.map((msg) => {
								return (
									<MsgCard key={msg.id} timestamp={msg.timestamp} message={msg.content} sender={msg.sender} />
								)
							})}
						</React.Fragment> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
							<div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
						</div>}
					</div>
					<div className='InputAndSend'>
						<form className='messageForm' onSubmit={sendMessage}>
							<TextInput 
								name="content" 
								placeholder="Escribe un mensaje..." 
								style={{ width: "90%", background: "#0000007a", borderRadius: "10px", padding: "10px"}} 
								inputStyle={{ background: "transparent", color: "#fff", width: "100%" }}
							/>
							<SendButton icon={send} style={{ width: "40px", height: "40px" }} type="submit" />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
