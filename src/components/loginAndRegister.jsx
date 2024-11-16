import { useState } from "react"
import { userRegistration, userLogin } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginAndRegister = () => {
    const [rFullName, rSetFullName] = useState("");
    const [rUserName, rSetUserName] = useState("");
    const [rPassword, rSetPassword] = useState("");

    const [lUserName, lSetUserName] = useState("");
    const [lPassword, lSetPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault()
        const user = {
            fullName: rFullName,
            userName: rUserName,
            password: rPassword
        }
        dispatch(userRegistration({user})).unwrap().then(() => {
            window.alert("registration successfull")
        })
        rSetFullName("")
        rSetUserName("")
        rSetPassword("")    
    }
    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            userName: lUserName,
            password: lPassword
        }
        dispatch(userLogin({user})).unwrap().then(() => {
            navigate('/chat')
        })
        lSetUserName("")
        lSetPassword("")    
    }
    return(
        <>
    <h1 className="loginHeading" style={{textAlign: "center"}}>Welcome to our Chat App</h1>
        <section className="loginPage container">
            <div className="register">
                <p>New User? Register Here.</p>
                <form onSubmit={handleRegister} className="verticalAlign">
                <label htmlFor="fullName">Full Name: </label>
                <input id="fullName" value={rFullName} onChange={(e) => rSetFullName(e.target.value)}/>
                <label htmlFor="userName">User Name: </label>
                <input id="userName" value={rUserName} onChange={(e) => rSetUserName(e.target.value)}/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={rPassword} onChange={(e) => rSetPassword(e.target.value)}/>
                <button className="loginAndRegisterButtonMargin btn btn-primary">Register</button>
                </form>
            </div>
            <div className="login">
                <p>Already a User? Login Here.</p>
                <form onSubmit={handleLogin} className="verticalAlign">
                <label htmlFor="userNamel">User Name: </label>
                <input id="userNamel" value={lUserName} onChange={(e) => lSetUserName(e.target.value)}/>
                <label htmlFor="passwordl">Password: </label>
                <input type="password" id="passwordl" value={lPassword} onChange={(e) => lSetPassword(e.target.value)}/>
                <button className="loginAndRegisterButtonMargin btn btn-primary">Login</button>
                </form>
            </div>
        </section>
        </>
    )
}
export default LoginAndRegister