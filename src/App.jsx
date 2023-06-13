import { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Hackathons from "./pages/Hackathons/Hackathons";
import Articles from "./pages/Articles/Articles";
import Chat from "./pages/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/Signup/SignUp";
import Profile from "./pages/Profile/Profile";
import Help from "./pages/Help/Help";
import TeamFinderCard from "./components/TeamFinder/TeamFinderCard";
import FeedCard from "./components/FeedCard/FeedCard";
import { EditProfile } from "./pages/Profile/EditProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn ? (
    <Router>
      <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/messages" element={<Chat />} />
          <Route path="/help" element={<Help />} />
          <Route path="/tf" element={<TeamFinderCard />} />
          <Route path="/fc" element={<FeedCard />} />

          <Route path="*" element={<div>404 Page not found :(</div>} />
        </Routes>
      </Sidebar>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
