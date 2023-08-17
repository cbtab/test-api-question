import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewQuestion from "./pages/ViewQuestion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/questions/:questionId"
            element={<ViewQuestion />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
