import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import api from '@/services/index';
import { ConnectState, LoginUserInfoState } from './connect.d';
const { loginMsg, logout } = api;

export interface LoginModelState {
  userInfo: LoginUserInfoState;
  isError: boolean;
}

export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects: {
    getUserInfo: Effect;
    queryLogin: Effect;
    logoutfun: Effect;
  };
  reducers: {
    save: Reducer<LoginModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<LoginModelState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    userInfo: {
      id: '',
      name: '',
    },
    isError: false,
  },
  effects: {
    *queryLogin({ payload }, { call, put }) {
      const response = yield call(loginMsg, 'POST', { ...payload });
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            userInfo: response.currentAuthority,
          },
        });
        localStorage.setItem(
          'userid',
          JSON.stringify(response.currentAuthority.userid),
        );
        message.success('登录成功！');
        history.replace('/');
      } else {
        yield put({
          type: 'save',
          payload: {
            isError: true,
          },
        });
      }
    },
    *getUserInfo({ payload }, { call, put, select }) {
      const { name } = yield select((state: ConnectState) => state.global);
      const data = yield call(loginMsg, 'POST', { ...payload, name });
      yield put({
        type: 'save',
        payload: {
          userInfo: data,
        },
      });
    },
    *logoutfun(_, { call }) {
      const response = yield call(logout, 'GET');
      if (response.status === 'ok') {
        localStorage.removeItem('userid');
        history.replace({
          pathname: '/login',
          search: `timestamp=${new Date().getTime()}`,
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default LoginModel;
