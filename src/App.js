import { Navigate, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import UserPage from "./pages/UserPage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <main>
      <MainMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
