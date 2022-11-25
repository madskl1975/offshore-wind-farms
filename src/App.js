import { Navigate, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import AboutPage from "./pages/AboutPage";


export default function App() {
  return (
    <>
      <MainMenu />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
