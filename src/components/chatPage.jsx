import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { privateRoute } from "../features/userSlice"
import {io} from 'socket.io-client'
import Cookies from 'js-cookie'
const ChatPage = () => {
    const [message, setMessage] = useState("")
    const [messagesDump, setMessagesDump] = useState([]);
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const token = Cookies.get('access_token')
    const socketRef = useRef(null)
    useEffect(() => {
        dispatch(privateRoute())
    }, [dispatch])

    useEffect(() => {
    
        socketRef.current = io('https://chatapp-backend-i30i.onrender.com', {withCredentials: true, auth: {access_token: token}})

    socketRef.current.on('connect', () => {
        console.log("user connected successfully", socketRef.current.id)
    })
    socketRef.current.on('privateMessage', (data) => {
        console.log(data)
        setMessagesDump((prevMessages) => [...prevMessages, data]);
        console.log(messagesDump)
    }) 
    
    return () => {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
    };
    },[])

    const handleMessage = (e) => {
        e.preventDefault();
        socketRef.current.emit('privateMessage', {message: message, userName: user.userName})
    }
    return (
        <>
            <form onSubmit={handleMessage}>
            <label>Send Message</label>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button type="submit">Send Message</button>
            </form>
            <div>
            
                    {messagesDump ? <ul>{messagesDump.map((m,i) => (<li key={i}>{m.data.message} from {m.data.userName}</li>))}</ul> : ""}
                
            </div>
        </>
    )
}
export default ChatPage