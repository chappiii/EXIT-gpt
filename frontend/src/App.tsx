import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginAdmin from "./pages/Admin/loginAdmin";
import HomeAdmin from "./pages/Admin/Home";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import { useAuthAdmin } from "./context/AuthContextAdmin";
import Questions from "./pages/Questions/Questions";
import Pdf from "./pages/Pdf";
// import Contact from "./pages/Contact";
// import About from "./pages/About";
// import Footer from "./components/footer/Footer";
function App() {
  const auth = useAuth();
  const authadmin = useAuthAdmin();
  // console.log(useAuth().isLoggedIn);

  return (
    <main>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        {/* <Route path="/admin/home" element={<HomeAdmin />} /> */}

        <Route
          path="/admin/home"
          element={
            authadmin?.isLoggedIn && authadmin.admin ? (
              <HomeAdmin />
            ) : (
              <LoginAdmin />
            )
          }
        />

        <Route
          path="/chat"
          element={auth?.isLoggedIn && auth.user ? <Chat /> : <Login />}
        />
        <Route
          path="/questions"
          element={auth?.isLoggedIn && auth.user ? <Questions /> : <Login />}
        />
        <Route
          path="/pdf"
          element={auth?.isLoggedIn && auth.user ? <Pdf /> : <Login />}
        />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
