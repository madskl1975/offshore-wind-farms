import { Navigate, Route, Routes } from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";
import SitePage from "./pages/SitePage";
import CreateSite from "./pages/CreateSite";
import UpdateSite from "./pages/UpdateSite";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <main>
      <TopMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateSite />} />
        <Route path="/users/:id" element={<SitePage />} />
        <Route path="/update/:id" element={<UpdateSite />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </main>
  );
}
