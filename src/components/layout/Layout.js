import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout as AntLayout, Menu } from "antd";

const { Header, Content } = AntLayout;

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <AntLayout>
      <Header style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">News</Link>
          </Menu.Item>
          <Menu.Item key="/weather">
            <Link to="/weather">Weather</Link>
          </Menu.Item>
          <Menu.Item key="/movies">
            <Link to="/movies">Movies</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ minHeight: "100vh" }}>{children}</Content>
    </AntLayout>
  );
};

export default Layout;
