import "./App.css";
import { PageLayout } from "./components/PageLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
