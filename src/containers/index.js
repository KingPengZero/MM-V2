import cfg from '../config';
const { isProduction } = cfg;
import App from './App/App';
import Default from 'containers/Default/Default';
import AddWorkContent from 'containers/AddWorkContent/AddWorkContent';               // 添加工作内容
import WorkContentDetail from 'containers/WorkContentDetail/WorkContentDetail';      // 添加工作内容
import Home from 'containers/Home/Home';
import MMCalendar from 'containers/MMCalendar/MMCalendar';                           // 晨会日历
import MMCalendarList from 'containers/MMCalendarList/MMCalendarList';
import MMSetting from 'containers/MMSetting/MMSetting';                              // 晨会设置
import MMEdit from 'containers/MMEdit/MMEdit';                                       // 晨会编辑
import MMList from 'containers/MMList/MMList';                                       // 晨会列表-首页
import ExecutivePeople from 'containers/ExecutivePeople/ExecutivePeople';            // 通知人、参与人


const obj = {
  MMCalendar, MMCalendarList, Default, AddWorkContent, WorkContentDetail, Home, MMSetting, MMEdit, MMList, ExecutivePeople
};
if (!!isProduction) {
  // 生产环境下使用懒加载方法
  Object.keys(obj).forEach((key) => {
    try {
      obj[key] = require('bundle-loader?lazy&name=[name]!containers/' + key + '/' + key);
    } catch (ex) {
      console.log(ex);
    }
  });
}

export default Object.assign(obj, { App });
