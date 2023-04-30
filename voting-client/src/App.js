import "./App.css"
import { Navbar } from "./components/Navbar/Navbar"
import { Footer } from "./components/Footer/Footer"
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Candidates, Login, Register, Standings, Vote, Profile, PageNotFound } from "./screens/index"
import { useAuth } from "./Globals/authContext";

export const App = () => {

  const isLoggedIn = useAuth().isLoggedIn();

  return (
    <>
      <Navbar />
      {/* routing */}
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route index element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/vote" element={isLoggedIn ? <Vote /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
        <Route path="/standings" element={<Standings />} />
        {/* Catch-all Route for 404 Page Not Found */}
      </Routes>
      {/* End routing */}
      <Footer />
    </>
  )
}
