
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import { ClassPage } from "./components/pages/class-page";




export function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/class/:classId" element={<ClassPage />} />
    </Routes>
  );
}
