import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import SinglePost from "./pages/SinglePost/SinglePost";

function App() {
  const theme = useSelector((state) => state.theme.value);
  const user = useSelector((state) => state.user.value);

  return (
    <div className={`${theme.background} ${theme.color} App`}>
      <Router>
        {user.id && <Topbar />}

        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route
            path="/"
            element={user.id ? <Home type="home" /> : <Login />}
          />
          <Route
            path="/login"
            element={user.id ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user.id ? <Navigate to="/" /> : <Register />}
          />

          <Route
            path="/hearted"
            element={!user.id ? <Navigate to="/" /> : <Home type="hearted" />}
          />
          <Route
            path="/bookmarks"
            element={!user.id ? <Navigate to="/" /> : <Home type="bookmarks" />}
          />
          <Route
            path="/explore"
            element={!user.id ? <Navigate to="/" /> : <Home type="explore" />}
          />
          <Route
            path="/settings"
            element={!user.id ? <Navigate to="/" /> : <Settings />}
          />
          <Route
            path="/profile/:username"
            element={!user.id ? <Navigate to="/" /> : <Profile />}
          />
          <Route
            path="/post/:id"
            element={!user.id ? <Navigate to="/" /> : <SinglePost />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
