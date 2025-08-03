
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { NotFound } from "./components/not-found";
import { PageNotFound } from "./components/page-not-found";

export function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Home />} />
        <Route path="/classes/:classId" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}
