import { Spin } from "antd";
import "./styles/App.css";
import { Suspense } from "react";
import Routing from "./Routing";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spin spinning fullscreen />}>
        <Layout>
          <Routing />
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;
