import { Spin } from "antd";
import "./styles/App.css";
import { Suspense } from "react";
import Routing from "./Routing";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spin spinning fullscreen />}>
        <Routing />
      </Suspense>
    </div>
  );
}

export default App;
