import React, { useContext, useEffect } from 'react'
import image from "../assets/background1.jpg"
import Button from '../components/stylingComponents/Button'
import TextInput from '../components/stylingComponents/TextInput'
import "../css/App.css"
import user from '../assets/user.png'
import users from "../assets/users-icon.png"
import "../css/StylingComps.css"
import { APIURL } from '../constants/API'
import axios from 'axios'
import { UserContext } from '../services/UserContext'

export default function App() {
  const {User, setUser} = useContext(UserContext)

  const submitForm = (e) => { 
    e.preventDefault()
    const form = new FormData(e.target)
    const name = form.get("username")

    if(name !== ""){
      const object = {
        name,
        auth: "user",
        timestamp: new Date().getTime() 
      }
      axios.get(APIURL + "/users/" + name).then((user) => {
        if(user.data === "No data"){
          axios.post(APIURL + "/users", object).then(res => {
            axios.get(APIURL + "/users/" + name).then((newuser) => {
                setUser(newuser.data)
            })
          })
        }
        else{
          setUser(user.data)
        }
      })
      .catch((error) => console.log(error))
    }
  }

  return (
    <div className="LoginPage" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
      <div className="loginBox">
        <div className='loginIcon'>
          <img src={user} alt="icon" style={{ width: "100%", height: "100%" }} />
        </div>
        <form className='loginForm' onSubmit={submitForm}>
          <p className='font1' style={{ marginBottom: '0px', fontSize: "30px" }}>
            ¿Quien esta usando este chat?
          </p>
          <TextInput icon={users} style={{ width: "80%", background: "#fff", borderRadius: "10px", padding: "20px" }} placeholder="Usuario" name="username" />
          <Button style={{ width: "90%" }} label="Iniciar" type="submit" />
        </form>
      </div>
      <div className='footer'>
        <p className='font1' style={{ fontSize: "20px", color: "#fff", marginTop: "10px" }}>
          Prueba Inicial | Andres Carrasquero | 2022©
        </p>
      </div>
    </div>
  );
}

