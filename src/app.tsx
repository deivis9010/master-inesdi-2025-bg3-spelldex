
import { Route, Routes } from "react-router-dom";
import {Home} from "./components/home";





export function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classes" element={<Home />} />
      <Route path="/classes/:classId" element={<Home />} />
      <Route path="/not-found" element={<div>Class Not Found</div>} />
      <Route path="*" element={<div>Page Not Found</div>} />
      
    </Routes>
  );
}
