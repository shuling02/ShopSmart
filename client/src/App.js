import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {

  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(true);

  if (!token) {
    return (
      <div>
        {isLogin ? <Login /> : <Signup />}

        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Go to Signup" : "Go to Login"}
        </button>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
