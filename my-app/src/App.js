import SignIn from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import SignUp from "./pages/Signup";
import { BrowserRouter } from "react-router-dom";
import StudentHome from "./features/Student/StudentHome";




function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home/> : <Navigate to="/signin" />}
          />
          <Route
            path="/signin"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
