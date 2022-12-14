import { Navigate, Route, Routes } from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";
import SitePage from "./pages/SitePage";
import UploadSite from "./pages/UploadSite";
import UpdateSite from "./pages/UpdateSite";
import HomePage from "./pages/HomePage";

// A <Navigate> element changes the current location when it is rendered. It's a component wrapper around useNavigate, 
// and accepts all the same arguments as props.
// https://reactrouter.com/en/main/components/navigate

// <Routes> Rendered anywhere in the app, <Routes> will match a set of child routes from the current location.
// https://reactrouter.com/en/main/components/routes

export default function App() {
  return (
    <main>
      <TopMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadSite />} />
        <Route path="/site/:id" element={<SitePage />} />
        <Route path="/update/:id" element={<UpdateSite />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </main>
  );
}
