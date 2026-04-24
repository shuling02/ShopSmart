import Login from "./pages/Login";
import Signup from "./pages/Signup";
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

  return (
    <div>
      <h1>Welcome to ShopSmart!</h1>;

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
