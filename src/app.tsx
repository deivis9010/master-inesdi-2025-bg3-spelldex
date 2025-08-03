
import { Route, Routes } from "react-router-dom";
import {Home} from "./components/home";





export function App() {
 

  return (
    <>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Home />} />
          <Route path="/classes/:classId" element={<Home />} />
          <Route
            path="/not-found"
            element={
              <div>
                <h2>Class Not Found</h2>
                <a href="/">Back to Home</a>
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div>
                <h2>Page Not Found</h2>
                <a href="/">Back to Home</a>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
