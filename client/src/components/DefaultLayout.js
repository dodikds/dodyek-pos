import React from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    CopyOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import '../resourses/layout.css';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default class DefaultLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        const menuItems = [
            {
                key: "/home",
                icon: <HomeOutlined />,
                label: <Link to="/home">Home</Link>,
            },
            {
                key: "/bills",
                icon: <CopyOutlined />,
                label: <Link to="/bills">Bills</Link>,
            },
            {
                key: "/items",
                icon: <UnorderedListOutlined />,
                label: <Link to="/items">Items</Link>,
            },
            {
                key: "/customers",
                icon: <UserOutlined />,
                label: <Link to="/customers">Customers</Link>,
            },
            {
                key: "/logout",
                icon: <LogoutOutlined />,
                label: "Logout",
            },
        ];

        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo"><h3>Shey POS</h3></div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[window.location.pathname]}
                        items={menuItems}
                    />
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', padding: 10 }}>
                        {this.state.collapsed ? (
                            <MenuUnfoldOutlined
                                className="trigger"
                                onClick={this.toggle}
                            />
                        ) : (
                            <MenuFoldOutlined
                                className="trigger"
                                onClick={this.toggle}
                            />
                        )}
                    </Header>

                    <Content
                        style={{
                            margin: '10px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}