import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HeaderMakerPage from "./pages/HeaderMakerPage";
import ConceptMakerPage from "./pages/ConceptMakerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/headermaker" element={<HeaderMakerPage />}></Route>
      <Route path="/componentmaker" element={<ConceptMakerPage />}></Route>
    </Routes>
  );
}

export default App;
