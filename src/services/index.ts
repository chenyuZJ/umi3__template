import request from '@/utils/request';
import qs from 'qs';
import api from './api';

const handleApiFun = (url: string) => {
  return function (method = 'GET', data: object, loadingCopy = '加载中') {
    const URL = method == 'GET' ? `${url}${qs.stringify(data)}` : url;
    return request(URL, {
      method,
      data,
      loadingCopy,
    });
  };
};

const ApiFun: any = {};
for (const key in api) {
  ApiFun[key] = handleApiFun(api[key]);
}
export default ApiFun;
