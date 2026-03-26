import { Routes, Route } from "react-router-dom";
import TestPage from "./components/TestPage";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;