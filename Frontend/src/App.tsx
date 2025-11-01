import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ChatAppPage from "./pages/ChatAppPage"

function App() {

  return (
    <>
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes */}


      {/* todo: protected routes */}
      <Route path="/" element={<ChatAppPage />} />


    </Routes>
    </>
  )
}

export default App
