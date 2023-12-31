import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Form from "./scenes/form";
import CloudPage from "./scenes/CloudPage";
// import Contacts from "./scenes/contacts";

import { mockDataTeam } from "./data/mockData";
import { userData } from "./data/userData";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/login";
import TeacherProfile from "./scenes/teacher";
import CreateUser from "./scenes/createUser";
import Lectures from "./scenes/lectures";
import OnlyTeacherProfile from "./scenes/teacher/OnlyTeacher";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { pathname } = useLocation();
    const token = JSON.parse(localStorage.getItem("token"));
    const team = JSON.parse(localStorage.getItem("team"));
    const users = JSON.parse(localStorage.getItem("users"));
    if (team === null || team === undefined || team.length === 0) {
        localStorage.setItem("team", JSON.stringify(mockDataTeam));
    }
    if (users === null || users === undefined || users.length === 0) {
        localStorage.setItem("users", JSON.stringify(userData));
    }
    let role = "admin";
    let user = null;

    role = token?.role;
    const u = team.filter((t) => t.email === token?.email)[0] || null;
    user = u;
   

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {!token ? (
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                ) : role === "admin" ? (
                    <div className="app">
                        <Sidebar isSidebar={isSidebar} />
                        <main className="content max-w-screen overflow-scroll scrollHidden">
                            <Topbar />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Navigate to="/dashboard" />}
                                />
                                <Route
                                    path="/login"
                                    element={<Navigate to="/dashboard" />}
                                />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/team" element={<Team />} />
                                <Route path="/form" element={<Form />} />
                                <Route
                                    path="/lectures"
                                    element={<Lectures />}
                                />
                                <Route
                                    path="/cloud"
                                    element={<CloudPage />}
                                />
                                <Route
                                    path="/teacher/:id"
                                    element={<TeacherProfile />}
                                />
                                <Route
                                    path="/createUser"
                                    element={<CreateUser />}
                                />
                                <Route
                                    path="/update/teacher/:id"
                                    element={<CreateUser />}
                                />
                            </Routes>
                        </main>
                    </div>
                ) : (
                    <div>
                        <Routes>
                            <Route
                                path="/"
                                element={<OnlyTeacherProfile state={user} />}
                            />
                        </Routes>
                    </div>
                )}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
