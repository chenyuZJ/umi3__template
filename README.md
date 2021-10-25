# umi3 + antd4 + hooks

## 搭建简单的架构

```
|-- 后台架子
    |-- .editorconfig
    |-- .gitignore
    |-- .prettierignore
    |-- .prettierrc
    |-- .umirc.ts // umi配置文件
    |-- package-lock.json
    |-- package.json // 项目配置文件
    |-- README.md
    |-- tsconfig.json // ts配置文件
    |-- typings.d.ts
    |-- config // 默认的config
    |   |-- menu.config.ts
    |-- mock // 模拟数据
    |   |-- global.ts
    |   |-- login.ts
    |-- src
        |-- .umi // 临时生成的umi文件
        |-- components // 公共组件
        |-- layouts // 公共层级最大的布局
        |   |-- index.tsx
        |   |-- baseLayout
        |   |   |-- index.less
        |   |   |-- index.tsx
        |   |   |-- header
        |   |   |   |-- index.tsx
        |   |   |   |-- userSetting.tsx
        |   |   |-- menu
        |   |       |-- index.tsx
        |   |-- simpleLayout
        |       |-- index.tsx
        |-- models // 数据models层
        |   |-- connect.d.ts
        |   |-- global.ts
        |   |-- login.ts
        |-- pages // view层
        |   |-- index
        |   |   |-- index.less
        |   |   |-- index.tsx
        |   |-- login
        |       |-- index.less
        |       |-- index.tsx
        |       |-- components
        |           |-- loginForm
        |               |-- index.less
        |               |-- index.tsx
        |-- services // api服务管理
        |   |-- api.ts
        |   |-- index.ts
        |-- utils // 公共方法
            |-- request.ts
            |-- utils.ts

```

## 数据与接口的调用
···
services文件夹下的api.ts增加接口链接
index.ts封装处理
model增添，注意命名空间不能重复
effects对象中增加方法
```js
*queryLogin({ payload }, { call, put }) {
      const response = yield call(loginMsg, 'POST', { ...payload }); // loginMsg是自己增加的接口命名
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
```
页面层调用
```js
    dispatch({
      type: 'login/queryLogin',
      payload: {
        ...values, // 参数
      },
    });
```
···

## eslint stylelint
···
没写，有机会再补上
···