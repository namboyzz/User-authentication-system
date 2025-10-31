import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  return (
    <>
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />



      {/* private routes */}

    </Routes>
    </>
  )
}

export default App
