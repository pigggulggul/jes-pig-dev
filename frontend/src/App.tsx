import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HeaderMakerPage from "./pages/HeaderMakerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/headermaker" element={<HeaderMakerPage />}></Route>
    </Routes>
  );
}

export default App;
