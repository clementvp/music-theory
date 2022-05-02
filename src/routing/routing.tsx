import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";
import ScalesVisualizer from "../views/ScalesVisualizer/ScalesVisualizer";
import layoutStyle from "./routing.module.css";

import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

const Routing = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header className={layoutStyle.layoutHeader}>
        <h1 className={layoutStyle.headerTitle}>Pelycano Synth</h1>
      </Header>
      <Content style={{ padding: "0 50px", backgroundColor: "#F1DEDE" }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/scales" element={<ScalesVisualizer />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer className={layoutStyle.layoutFooter}>Footer</Footer>
    </Layout>
  );
};

export default Routing;
