import { BrowserRouter, Routes, Route } from "react-router-dom";
import BriefingList from "./pages/BriefingList";
import BriefingForm from "./pages/BriefingForm";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<BriefingList />} />
            <Route path="/create" element={<BriefingForm />} />
            <Route path="/edit/:id" element={<BriefingForm />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
