import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ChatAppPage from "./pages/ChatAppPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {

  return (
    <>
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes */}


      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ChatAppPage />} />
      </Route>


    </Routes>
    </>
  )
}

export default App
