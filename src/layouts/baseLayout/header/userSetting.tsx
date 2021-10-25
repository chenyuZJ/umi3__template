import React, { FC } from "react";
import { connect, Dispatch } from "umi";
import { Dropdown, Menu } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { LoginModelState, GlobalModelState } from "@/models/connect";

export interface HeaderLayoutProps {
  dispatch: Dispatch;
  global: GlobalModelState;
}

const UserSettingLayout: FC<HeaderLayoutProps> = ({ global, dispatch }) => {
  const handleSubmit = (e: { key: any }) => {
    const { key } = e;
    if (key === "logout") {
      dispatch({
        type: "login/logoutfun",
      });
    }
  };
  const { userInfo } = global;
  console.log(userInfo);

  const menu = (
    <Menu onClick={handleSubmit}>
      <Menu.Item key="setPwd">
        <SettingOutlined />
        设置密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined /> 退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        width: 200,
        textAlign: "right",
      }}
    >
      <Dropdown overlay={menu} placement="bottomRight">
        <span style={{ cursor: "pointer", color: "#fff", fontSize: 16 }}>
          {userInfo.username} <DownOutlined />
        </span>
      </Dropdown>
    </div>
  );
};

export default connect(
  ({
    login,
    global,
  }: {
    login: LoginModelState;
    global: GlobalModelState;
  }) => ({ login, global })
)(UserSettingLayout);
