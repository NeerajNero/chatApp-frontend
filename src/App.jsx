import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import LoginAndRegister from "./components/loginAndRegister"
import ChatPage from "./components/chatPage"
function App() {

  return (
    <>
      <Router>
      <Link to="/loginAndRegister">Click here to login</Link>
        <Routes>
          <Route path="/loginAndRegister" element={<LoginAndRegister />}/>
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
