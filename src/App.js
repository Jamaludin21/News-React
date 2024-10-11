import { Spin } from "antd";
import "./App.css";
import HomePage from "./pages/MainPage";
import { Suspense } from "react";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spin spinning fullscreen />}>
        <HomePage />
      </Suspense>
    </div>
  );
}

export default App;
