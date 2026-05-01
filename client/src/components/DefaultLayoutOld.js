import React from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    CopyOutlined,
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
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo"><h3>Shey POS</h3></div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
                        <Menu.Item key="/home" icon={<HomeOutlined />}>
                            <Link to='/home'>Home</Link>
                        </Menu.Item>
                        <Menu.Item key="/bills" icon={<CopyOutlined />}>
                            <Link to='/bills'>Bills</Link>
                        </Menu.Item>
                        <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
                            <Link to='/items'>Items</Link>
                        </Menu.Item>
                        <Menu.Item key="/customers" icon={<UserOutlined />}>
                            <Link to='/customers'>Customers</Link>
                        </Menu.Item>
                        <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                            Logout
                        </Menu.Item>
                    </Menu>
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