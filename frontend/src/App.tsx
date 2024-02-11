import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Questions from "./pages/Questions/Questions";
import Pdf from "./pages/Pdf";
import Contact from "./pages/Contact";
import About from "./pages/About";
// import Footer from "./components/footer/Footer";
function App() {
  const auth = useAuth();
  // console.log(useAuth().isLoggedIn);

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        {auth?.isLoggedIn && auth.user && (
          <Route path="/questions" element={<Questions />} />
        )}
        {auth?.isLoggedIn && auth.user && (
          <Route path="/pdf" element={<Pdf />} />
        )}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
