import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  antd: {},
  mfsu: {},
  dva: {
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
});
