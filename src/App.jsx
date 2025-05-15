import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./component/auth/Login";
import Forum from "./component/Forum";
import "./App.css";
import { login, selectUser } from "./feature/userSlice";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from "./component/Context"; 

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);

  return (
    <ContextProvider> {/* ✅ Context wrapped here */}
      <div className="App">
        {user ? <Forum /> : <Login />}
        <Toaster />
      </div>
    </ContextProvider>
  );
}

export default App;
