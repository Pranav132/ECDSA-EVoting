import "./App.css"
import { Navbar } from "./components/Navbar/Navbar"
import { Footer } from "./components/Footer/Footer"
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Candidates, Login, Register, Standings, Vote, Profile } from "./screens/index"

export const App = () => {

  const isLoggedIn = true;

  return (
    <>
      <Navbar />
      {/* routing */}
      <Routes>
        <Route path="/candidates" element={<Candidates />} />
        <Route index element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/vote" element={isLoggedIn ? <Vote /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
      {/* End routing */}
      <Footer />
    </>
  )
}
