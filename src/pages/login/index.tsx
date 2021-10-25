import React, { FC } from 'react';
import { connect, Dispatch } from 'umi';
import { Row, Col } from 'antd';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/loginForm';
import './index.less';

export interface LoginLayoutProps {
  dispatch: Dispatch;
  login: ConnectState;
  loading: boolean;
}

export interface SubmitValProps {
  username: string;
  password: string;
}

const Login: FC<LoginLayoutProps> = ({ dispatch }) => {
  function handleSubmit(values: SubmitValProps) {
    dispatch({
      type: 'login/queryLogin',
      payload: {
        ...values,
      },
    });
  }
  return (
    <div className="login-container">
      <div className="login">
        <div className="login-right">
          <div className="login-content">
            <Row>
              <Col className="logo" span={24} style={{ textAlign: 'center' }}>
                <span
                  style={{ fontSize: 22, fontWeight: 600, color: '#1abc9c' }}
                >
                  平台
                </span>
              </Col>
            </Row>
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ login }: { login: ConnectState }) => ({ login }))(
  Login,
);
