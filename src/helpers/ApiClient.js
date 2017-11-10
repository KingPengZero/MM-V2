import superagent from 'superagent';
import Utility from 'common/Utility';
import cfg from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];
function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  //  'https://127.0.0.1:30081/webapi'
  const _ApiUrl = cfg.serverApi + adjustedPath;
  return _ApiUrl;
}

export default class ApiClient {
  API = {
    /**
     * get 获取晨会权限     httptoken
     * ----------------------------------------------------------------------------------
     * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)
     * group_id             string             是                        群id
     *
     * @url /meeting/admin?token=jsdkahskajdska&group_id=
     */
    Admin: '/admin',
    /**
     * 添加今日工作内容
     */
    TodayWorkContentDetail: '/detail',
    /**
     * 添加今日工作内容
     */
    AddTodayWorkContent: '/content',
    /**
     * 编辑工作内容
     */
    EditWorkContent: '/Edit',
    /**
     * 详情
     */
    MorningMeetingDetail: '/Detail/{0}',
    /**
     * get 获取晨会列表     httptoken
     * ----------------------------------------------------------------------------------
     * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)
     * group_id             string             是                        群id
     * pg_index             int                是                        页码
     * pg_count             int                是                        每页记录数量
     *
     * @url /meeting/contents?token=jsdkahskajdska&pg_index=0&pg_count=15&group_id=
     */
    MeetingList: '/contents',
    /**
     * get 获取晨会设置详情  httptoken
     * ----------------------------------------------------------------------------------
     * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)
     * group_id             string             是                        群id
     *
     * @url /meeting/setup/detail?token=jsdkahskajdska&group_id=
     */
    GetSettingDetail: '/setup/detail',
    /**
     * put 保存晨会设置     httptoken
     * ----------------------------------------------------------------------------------
     * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)
     * beginTime             string             是                        开始时间
     * captureBeginTime      int                是                        执行开始时间
     * updateNotifyTime      int                是                        更新时间
     * captureEndTime        int                是                        执行结束时间
     * captureStatus         int                是                        捕获状态
     * endTime               int                是                        结束时间
     * groupId               int                是                        群组id
     * notifyUsers           int                是                        通知人列表
     * partakeUsers          int                是                        参与人列表
     * repeatStatus          int                是                        重复状态
     *
     * @url /meeting/setup?token=jsdkahskajdska
     */
    SaveMMSetting: '/setup',
    /**
     * put 修改通知人列表     httptoken
     * ----------------------------------------------------------------------------------
     * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)
     * group_id              int                是                        群组id
     * active                string             是                        标志位
     *
     * @url /meeting/setup/notifier?token=jsdkahskajdska&group_id=
     */
    NotifiterList: '/setup/notifier',
    /**
     * put 修改参与人列表     httptoken
     * ----------------------------------------------------------------------------------
     * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)
     * group_id              int                是                        群组id
     * active                string             是                        标志位
     *
     * @url /meeting/setup/partaker?token=jsdkahskajdska&group_id=
     */
    PartakerList: '/setup/partaker',
    /**
     * get 晨会日历列表
     * ------------------------------------
     * /calendar?token=a&pg_index=0&pg_count=10&group_id=a&date=a
     */
    Calendar: '/calendar',
    /**
     * get 日历统计人数
     * --------------------------------------------
     * date
     */
    CalendarTotal: '/calendar/total',
    /**
     * get 查询日历提交情况
     * ----------------------------
     * date
     */
    CalendarTotalUser: '/calendar/total/user',
  }

  constructor() {
    const self = this;
    methods.forEach((method) =>
      self[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        const { token, groupId } = Utility.getContent(Utility.constItem.KeyTokenGroupId) || {};
        const _p = Object.assign({}, params, { token, group_id: groupId });
        if (_p) {
          request.query(_p);
        }
        if (data) {
          request.send(data);
        }
        request.header.token = token;
        request.header.groupId = groupId;

        /**
         * 错误处理及提示
         *
         * @param {any} err
         */
        function __ProcessError(err, body, __req) {
          try {
            Utility.$loadingHide();
            if (err.status) {
              console.log(err.status);
              // Utility.$actionSheet(err.status);
              if (Utility.constItem.Events.HttpStatus[err.status]) {
                // 删除loading
                if (err.status === 400 && Utility.constItem.Events.HttpStatus[__req.status]) {
                  Utility.$emit(Utility.constItem.Events.HttpStatus[__req.status], err, body);
                } else {
                  Utility.$emit(Utility.constItem.Events.HttpStatus[err.status], err, body);
                }
              }
            } else if (!!err.crossDomain) {
              console.log('与服务器连接中断...');
              Utility.$actionSheet('与服务器连接中断...');
            } else if (err.message && err.message !== '') {
              Utility.$actionSheet(err.message);
              console.log(err.message);
            }
          } catch (ex) {
            console.log(ex);
          }
        }

        function __SendRequest(_request) {
          _request.end((err, response) => {
            const { body } = response || {};
            // const { date } = headers || {};
            if (err) {
              __ProcessError(err, body, response);
              reject(body || err);                    // reject-->拒绝; resolve-->解决
            } else {
              if (!body) {
                console.log({ status: response.status, msg: '处理成功' });
              }
              // setTimeout(() => {
              resolve(body);
              // }, 1000);
            }
          });
        }

        try {
          __SendRequest(request);
        } catch (ex) {
          console.log(ex);
        }
      }));
  }
  empty() {
  }
}
