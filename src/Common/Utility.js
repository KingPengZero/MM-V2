import PlatformApi from './PlatformApi';

export default class Utility {
  static __Instance;

  constructor() {
    this._TempSaveContent = {};
    this.__ConstPrefix = 'WeiXinGOCOM';
  }

  static $platformApi = PlatformApi;

  /**
   * 实例
   * @returns {*}
   */
  static instance() {
    if (this.__Instance === null || typeof this.__Instance === 'undefined') {
      this.__Instance = new this();
    }
    return this.__Instance;
  }

  /**
   * 常量
   * @type {{SaveUrlPath: string}}
   */
  static constItem = {
    PageSize: 15, // 每页大小数据
    CaptchaTimeout: 60,
    /**
     * 当前的上下文
     */
    Context: 'GOCOM_CONTEXT',                                             // 当前页面的Context
    /**
     * 事件
     */
    Event: 'GOCOM_EVENT',                                                 // 事件。
    Events: {
      HttpStatus: {
        1: 'HTTP_STATUS_GOCOM_1',
        200: 'HTTP_STATUS_GOCOM_200',                  // 处理成功
        400: 'HTTP_STATUS_GOCOM_400',                  // 请求无效
        401: 'HTTP_STATUS_GOCOM_401',                  // 未授权访问
        402: 'HTTP_STATUS_GOCOM_402',
        403: 'HTTP_STATUS_GOCOM_403',                  // 禁止访问
        404: 'HTTP_STATUS_GOCOM_404',                  // 资源未找到
        405: 'HTTP_STATUS_GOCOM_405',
        406: 'HTTP_STATUS_GOCOM_406',
        407: 'HTTP_STATUS_GOCOM_407',
        408: 'HTTP_STATUS_GOCOM_408',
        409: 'HTTP_STATUS_GOCOM_409',
        411: 'HTTP_STATUS_GOCOM_411',                   // 登陆超时
        500: 'HTTP_STATUS_GOCOM_500',                   // 服务器错误
        501: 'HTTP_STATUS_GOCOM_501',
        502: 'HTTP_STATUS_GOCOM_502',
        503: 'HTTP_STATUS_GOCOM_503',
      },
      ShowModel: {
        OnActionSheet: 'ON_GOCOM_MODEL_ACTION_SHEET',                            //
        OnLoading: 'ON_GOCOM_MODEL_LOADING',                                     // 加载
        OnAlert: 'ON_GOCOM_MODEL_ALERT',                                         // 弹出信息
        OnConfirm: 'ON_GOCOM_MODEL_CONFIRM',                                     // 确定--取消
        OnShowDialog: 'ON_GOCOM_MODEL_SHOW_DIALOG',                              // 打开对话框
        OnShowDialogHide: 'ON_GOCOM_MODEL_SHOW_DIALOG_HIDE',                     // 隐藏对话框
        OnShowDialogClose: 'ON_GOCOM_MODEL_SHOW_DIALOG_CLOSE',                   // 关闭对话框
        OnActionSheetHide: 'ON_GOCOM_MODEL_ACTION_SHEET_HIDE',                   // 关闭
        OnLoadingHide: 'ON_GOCOM_MODEL_LOADING_HIDE',
        OnConfirmHide: 'ON_GOCOM_MODEL_CONFIRM_HIDE',
      },
      OnGoBack: 'ON_GOCOM_EVENT_GOBACK',                               // 页面退回事件
      OnEditNavBar: 'ON_GOCOM_EVENT_NAVBAR',                           // 
      OnOpenDatePicker: 'ON_GOCOM_EVENT_OPEN_DATE_PICKER',             // 打开日期控件
      OnUpdateNavbarTitle: 'ON_GOCOM_UPDATE_NAVBAR_TITLE',             // 修改导航条名称
      OnPagePositionClear: 'ON_GOCOM_PAGE_POSITION_CLEAR',             // 清空App页面位置
      OnPagePositionClearAll: 'ON_GOCOM_PAGE_POSITION_CLEAR_ALL',      // 清空所有App页面位置
    },
    /**
     * 所有状态的
     */
    StateName: {
      beginTime: 'GoCom_GXDB_BEGIN_TIME',
      endTime: 'GoCom_GXDB_END_TIME',
      captureBeginTime: 'GoCom_CAPTURE_BEGIN_TIMEE',
      captureEndTime: 'GoCom_CAPTURE_END_TIME',
      updateNotifyTime: 'GoCom_UPDATE_NOTIFY_TIMEE',
      IsOpenSwitch: 'GoCom_IS_OPEN_SWITCH',
    },
    /**
     * url 列表
     */
    UrlItem: {
      GoBack: 'goBack',                                                       // 回退操作
      AddWorkContent: 'addworkcontent',                                       // 添加今日工作
      WorkContentDetail: 'workcontentdetail',                                 // 添加今日工作
      MMCalendar: 'mmcalendar',                                               // 添加今日工作
      MMCalendarList: 'mmcalendarlist',                                       // 晨会日历列表
      MMSetting: 'mmsetting',                                                 // 晨会设置
      // MMEdit: 'mmedit',                                                       // 晨会编辑
      MMList: 'mmlist',                                                       // 晨会列表-首页
      ExecutivePeople: 'executivepeople',                                     // 参与人
    },
    UrlTitle: {
      '/mmlist': { Title: '晨会', Index: 0, isClose: true },
      '/': { Title: '默认页面', Index: 0 },
      '/addworkcontent': { Title: '今日工作内容', Index: 0 },
      '/workcontentdetail': { Title: '详情', Index: 0 },
      '/mmcalendar': { Title: '完成情况', Index: 0 },
      '/mmcalendarlist': { Title: '晨会日历', Index: 0 },
      '/mmsetting': { Title: '晨会设置', Index: 0 },
      // '/mmedit': { Title: '编辑', Index: 0 },
      '/executivepeople': { Title: '参与人', Index: 0 },
    },
    /**
     * 显示模式
     */
    ShowModel: {
      ActionSheet: 'GOCOM_MODEL_ACTION_SHEET',                     //
      Loading: 'GOCOM_MODEL_LOADING',                              // 加载
      Alert: 'GOCOM_MODEL_ALERT',                                  // 弹出信息
      Confirm: 'GOCOM_MODEL_CONFIRM',                              // 确定--取消
    },
    KeyHistory: 'GOCOM_KEY_HISTORY',
    KeyGoBack: 'GOCOM_KEY_GOBACK',
    KeySetContent: 'GOCOM_KEY_SET_CONTENT',
    KeyTokenGroupId: 'GOCOM_KEY_TOKE_GROUPID',
    Navbar: {
      LEFT_INFO: 'NAVBAR_LEFT_INFO',
      RIGHT_INFO: 'NAVBAR_RIGHT_INFO',                    // 
      LOCATION_LEFT: 'NAVBAR_LOCATION_LEFT',              // 左边
      LOCATION_RIGHT: 'NAVBAR_LOCATION_RIGHT',            // 右边
      TYPE_DEFAULT: 'NAVBAR_TYPE_DEFAULT',                // 默认
      TYPE_BUTTON: 'NAVBAR_TYPE_BUTTON',                  // 按钮
      TYPE_MENU: 'NAVBAR_TYPE_MENU',                      // 菜单
      TYPE_ICON: 'NAVBAR_TYPE_ICON',                      // 图标
      TYPE_TEXT: 'NAVBAR_TYPE_TEXT',                      // 内容
    },
    StoreName: {
      NAVBAR_LEFT_INFO: 'STORE_NAME_NAVBAR_LEFT_INFO',
      NAVBAR_RIGHT_INFO: 'STORE_NAME_NAVBAR_LEFT_INFO',
    },
  }

  /**
   * 初始化页面信息
   *
   * @static
   * @returns
   * @memberof Utility
   */
  static $getInitPageTurning() {
    return { pg_index: 0, pg_count: this.constItem.PageSize, };
  }

  /**
   * 是否是数组
   * @param obj
   * @returns {boolean}
   */
  static isArray(obj) {
    if (!obj || !obj.length || obj.length === 0) {
      return false;
    }
    return Array.isArray(obj);
  }

  /**
   * 判断是否为空
   * true-为空;false-不为空
   * @param obj
   * @returns {boolean}
   */
  static isNull(obj) {
    return obj === null;
  }

  /**
   * 判断是否是微信打开的
   * @returns {boolean}
   */
  static isWeiXin() {
    try {
      const ua = window.navigator.userAgent.toLowerCase();
      const isWeiXin = ua.match(/micromessenger/i).indexOf('micromessenger');
      console.log(isWeiXin);
      return isWeiXin >= 0;
    } catch (ex) {
      return false;
    }
  }

  /**
   * 浏览器信息
   * @returns {Browser}
   */
  static browserInfo() {
    const _Browser = {
      versions: () => {
        const uu = navigator.userAgent;
        // const app = navigator.appVersion;
        return {
          trident: uu.indexOf('Trident') > -1,                                     // IE内核
          presto: uu.indexOf('Presto') > -1,                                       // opera内核
          webKit: uu.indexOf('AppleWebKit') > -1,                                 // 苹果、谷歌内核
          gecko: uu.indexOf('Gecko') > -1 && uu.indexOf('KHTML') === -1,           // 火狐内核
          mobile: !!uu.match(/AppleWebKit.*Mobile.*/),                            // 是否为移动终端
          ios: !!uu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                        // ios终端
          android: uu.indexOf('Android') > -1 || uu.indexOf('Adr') > -1,           // android终端
          iPhone: uu.indexOf('iPhone') > -1,                                       // 是否为iPhone或者QQHD浏览器
          iPad: uu.indexOf('iPad') > -1,                                            // 是否iPad
          webApp: uu.indexOf('Safari') === -1,                                    // 是否web应该程序，没有头部与底部
          weixin: uu.indexOf('MicroMessenger') > -1,                             // 是否微信 （2015-01-22新增）
          qq: uu.match(/\sQQ/i) === ' qq'                                         // 是否QQ
        };
      },
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return _Browser;
  }

  static $judgeIsMobile() {
    const browser = {
      versions: () => {
        const u = navigator.userAgent;
        // const app = navigator.appversion;
        // 移动终端浏览器版本信息
        return {
          trident: u.indexOf('Trident') > -1, // IE内核
          presto: u.indexOf('presto') > -1, // opera内核
          webKit: u.indexOf('AppleWebkit') > -1, // 苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
          mobile: !!u.match(/AppleWebkit.*Mobile.*/) || !!u.match(/Applewebkit/), // 是否为移动终端
          // ios: !!u.match(/\(i[^;]+;( U;)? ceU.+Mac Os X/)，// ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者UC浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QqHD浏览器
          iEad: u.indexOf('iEad') > -1, // 是否iPad
          webApp: u.indexOf('safari') == -1, // 是否web应该程序，没有头部与底部
          google: u.indexOf('Chrome') > -1,
          weixin: u.match(/MicroMessenger/i) == 'MicroMessenger'
        };
      },
      language: (navigator.browserlanguage || navigator.language).toLocaleLowerCase()
    };
    console.log('language' + browser.language);
    console.log('是否为移动端' + browser.versions().mobile);
    return browser.versions().mobile;
  }

  /**
   * 是否IOS系统
   *
   * @static
   * @returns
   *
   * @memberOf Utility
   */
  static $isIOS() {
    try {
      const u = navigator.userAgent;
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      return isIOS;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  /**
   * 获取android版本
   *
   * @static
   * @returns
   *
   * @memberOf Utility
   */
  static $androidVersion() {
    const { userAgent } = navigator;
    if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
      const num = userAgent.substr(userAgent.indexOf('Android') + 8, 3);
      return { type: 'Android', version: num };
    }
    return null;
  }

  /**
   * 对Date的扩展，将 Date 转化为指定格式的String
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * @method __FormatDate
   * @param fmt
   * @param date
   * @return {*}
   * @example
   *  Utility.FormatDate('yyyy-MM-dd hh:mm:ss.S',new Date());
   * @constructor
   */
  static formatDate(fmt, date) {
    if (!date) {
      return '';
    }
    let __this = new Date();
    let _fmt = fmt || 'yyyy-MM-dd HH:mm:ss.S';
    if (date !== null) {
      if (Date.parse(date)) {
        __this = date;
      } else {
        try {
          __this = new Date(date);
        } catch (ex) {
          __this = new Date();
        }
      }
    }
    const oo = {
      'M+': __this.getMonth() + 1, // 月份
      'd+': __this.getDate(), // 日
      'D+': __this.getDate(), // 日
      'H+': __this.getHours(), // 小时
      'h+': __this.getHours(), // 小时
      'm+': __this.getMinutes(), // 分
      's+': __this.getSeconds(), // 秒
      'q+': Math.floor((__this.getMonth() + 3) / 3), // 季度
      S: __this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(_fmt)) {
      /(y+)/.exec(_fmt);
      // const aa = /(y+)/.test(_fmt);
      // if (aa) {
      const fmt1 = _fmt.replace(RegExp.$1, (__this.getFullYear() + '').substr(4 - RegExp.$1.length));
      _fmt = fmt1;
      // }
    }
    for (const kk in oo) {
      if (new RegExp('(' + kk + ')').test(fmt)) {
        _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (oo[kk]) : (('00' + oo[kk]).substr(('' + oo[kk]).length)));
      }
    }
    return _fmt;
  }

  /**
   * 打印输出日志
   * @method __PrintLog
   * @param {object} args 内容
   * @private
   */
  static printLog(args) {
    try {
      let __callmethod = '';
      try {
        throw new Error();
      } catch (ex) {
        // console.log(e.stack);
        __callmethod = ex.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, '');
      }

      const _curDate = new Date();
      const _aa = _curDate.toLocaleDateString() + ' ' + _curDate.toLocaleTimeString() + '.' + _curDate.getMilliseconds();
      console.log('--begin->', _aa, ' call method :', __callmethod);
      const __content = JSON.stringify(args);
      console.log(__content);
    } catch (ex) {
      console.log('---------输出日志，传入的内容传为JSON出现在异常--------------');
      console.log(ex);
      console.log('---------输出日志，内容为下--------------');
      console.log(args);
    }
  }

  /**
   * 判断输入的是否是手机号
   * @method __PhonePattern
   * @param {number} phone 手机号
   * @return {boolean} true 成功；false 失败
   * @example
   *  Utility.PhonePattern('13000100100');
   * @private
   */
  static PhonePattern(phone) {
    const ex = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    return ex.test(phone);
  }

  /**
   * 密码验证
   * @method __PasswordPattern
   * @param {string} password 密码
   * @return {boolean} true 成功；false 失败
   * @private
   */
  static PasswordPattern(password) {
    // test('/^[_0-9a-z]{6,16}$/i');
    const ex = /^[_0-9a-zA-Z]{6,25}$/;
    return ex.test(password);
  }

  /**
   * 是否含有中文（也包含日文和韩文）
   * @method __IsChineseChar
   * @param {string} str 要判断的内容
   * @return {boolean} true:成功;false:失败.
   * @private
   */
  static IsChineseChar(str) {
    // const reg = !/^[\u4E00-\u9FA5]/g;    // \uF900-\uFA2D
    // return !/^[\u4e00-\u9fa5]+$/gi.test(str);// .test(str);

    const regu = '^[\u4e00-\u9fa5]+$';
    const re = new RegExp(regu);
    return re.test(str);
  }

  /**
   * 设置内容,这里主要是用来存放临时数据的。
   * @method _SetContent
   * @param key  键值，用于下次的时候获取内容用的。其实就是 _TempSaveContent的属性名称。
   * @param content 要存储的内容
   * @param isSaveLocalStorage 是否保存到本地存储里面
   * @param IsUser 根据用户uid 来获取缓存里的数据。
   * @private
   */
  static setContent(key, content, isSaveLocalStorage, IsUser) {
    try {
      const self = this.instance();
      if (isSaveLocalStorage) {
        let __Content = content;
        if (IsUser) {
          const __UserInfo = self._TempSaveContent[this.constItem.API.UserInfo];
          if (typeof __UserInfo !== 'undefined' && __UserInfo !== null) {
            __Content = {};
            __Content[__UserInfo.member_id] = content;
          }
        }
        __Content = JSON.stringify(__Content);
        // __content = CryptoJS.AES.encrypt(__Content, __key);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, __Content);
        }
      }
      self._TempSaveContent[key] = content;
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * 删除指定字段值。
   * @method __RemoveContent
   * @param key
   * @return {null}
   * @private
   */
  static removeContent(key, IsRemoveLocalStorage) {
    try {
      const __self = this.instance();
      if (key === null || typeof key === 'undefined') {
        return;
      }
      if (__self._TempSaveContent[key]) {
        delete __self._TempSaveContent[key];
      }

      if (IsRemoveLocalStorage && typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (ex) {
      this.printLog(ex.toString());
    }
  }

  /**
   * 获取内容，
   * @method _GetContent
   * @param key 健名称。其实就是 _TempSaveContent的属性名称。
   * @return {*} 返回内容
   * @private
   */
  static getContent(key, IsUser) {
    try {
      let __Content = null;
      const __self = this.instance();
      if (__self._TempSaveContent[key]) {
        __Content = __self._TempSaveContent[key];
        return __Content;
      }
      if (typeof window === 'undefined') {
        return null;
      }
      if (__Content === null || typeof __Content === 'undefined') {
        const _value = window.localStorage.getItem(key);
        if (_value !== null && _value !== '' && typeof _value !== 'undefined') {
          const __JSONValue = JSON.parse(_value);
          __self._TempSaveContent[key] = __JSONValue;
          if (IsUser) {
            // 
          }
          __Content = __self._TempSaveContent[key];
        }
      }

      return __Content;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  /**
   * 判断是否是函数
   * @param func 判断函数对象
   * @returns {boolean} true:成功，false:失败。
   */
  static $isFunction(func) {
    if (func !== null && typeof func !== 'undefined' && func.constructor.name === 'Function') {
      return true;
    }
    return false;
  }

  /**
   * 判断是否未定义
   * @param obj 判断对象
   * @returns {boolean} true:成功，false:失败。
   */
  static isUndefined(obj) {
    if (typeof obj === 'undefined') {
      return true;
    }
    return false;
  }

  /**
   * 判断是否定义。
   * @param obj 判断对象
   * @return {boolean} true:成功，false:失败。
   */
  static isDefined(obj) {
    if (typeof obj !== 'undefined') {
      return true;
    }
    return false;
  }

  /**
   * 判断是否是日期类型
   *
   * @static    * @param {any} obj  判断对象
   * @returns {boolean} true: 是日期，false:不是日期。
   * @example
   *        Utility.$isDate('abcadfa')  ---> false
   *        Utility.$isDate(new Date()) ---> true
   *        Utility.$isDate('2013年10月10日') ---> true
   * @memberOf Utility
   */
  static $isDate(obj) {
    if (typeof obj === 'undefined' || obj === null || obj === '') {   // 判断是不是 undefined,或 null
      return false;
    }
    const __isDate = obj.constructor.name === 'Date';  // 如果传入的就是日期
    if (__isDate) {
      return true;
    }
    try {
      return (new Date(obj.replace('年', '-').replace('月', '-').replace('日', ''))).constructor.name === 'Date';
    } catch (ex) {
      return false;
    }
  }

  /**
   * 将一个 对象转成url参数与&分开
   *
   * @param params 参数对象
   * @param split 分割符
   * @returns {*}
   * @example {a:a,b:b,c:c,e:e}
   * a=a&b=b&c=c&e=e
   */
  static $convertToUrlParams(params, options) {
    const { split, notFields } = options || {};
    if (this.isUndefined(params) || params === null) {
      return '';
    }
    const __KeyValue = [];
    const self = this;
    const __JSONValue = (value) => {
      try {
        let __JValue;
        if (value === null) {
          return '';
        }
        const { constructor } = value;
        if (typeof constructor === 'undefined' || constructor === null) {
          return '';
        }
        switch (value.constructor.name) {
          case 'Object':
            __JValue = '{' + this.convertToUrlParams(value) + '}';
            break;
          case 'Array':
            __JValue = JSON.stringify(value);
            break;
          default:
            __JValue = value;
        }
        return __JValue;
      } catch (ex) {
        console.log(ex.message);
        return value || '';
      }
    };
    Object.keys(params).forEach((key) => {
      const __value = params[key];
      if (self.isDefined(__value) && __value !== '') {
        if (key.toLowerCase() !== 'IsExistsNextData'.toLowerCase()) {
          // const __JsonValue = (self.isArray(__value) ? JSON.stringify(__value) : __value);
          if (notFields) {
            if (notFields.indexOf(key) === -1) {
              __KeyValue.push(key + '=' + __JSONValue(__value));
            }
          } else {
            __KeyValue.push(key + '=' + __JSONValue(__value));
          }
        }
      }
    });
    return __KeyValue.join(split || '&');
  }
  static $convertUrlParamToObj(search) {
    if (!search) {
      return {};
    }
    const obj = {};
    search.substr(1, search.length - 1).split('&').forEach((keyValue) => {
      const kv = keyValue.split('=');
      const key = kv[0];
      const value = kv[1];
      obj[key] = value;
    });
    return obj;
  }

  /**
   * 将 map对象 转成 key-value 数组对象
   * @param row
   * @returns {Array}
   */
  static $convertMapToObject(row) {
    if (this.isUndefined(row) || this.isNull(row) || row === '') {
      return [];
    }
    const __Array = [];
    Object.keys(row).forEach((key) => {
      const __obj = {};
      __obj.key = key;
      __obj.value = row[key];
      __Array.push(__obj);
    });
    return __Array;
  }

  /**
   * 页面跳转
   * @param url 要跳转的页面。
   * @param params 参数
   */
  static toPage(url, params) {
    try {
      const __history = this.getContent(this.constItem.KeyHistory);
      if (this.isUndefined(url) || url === '' || this.isUndefined(__history)) {
        return;
      }
      this.$loadingHide();

      if (url === this.constItem.UrlItem.GoBack) {
        this.setContent(this.constItem.KeyGoBack, true);
        __history.goBack();
        return;
      }
      const _p = this.$convertToUrlParams(Object.assign(params || {}, Utility.getContent(Utility.constItem.KeyTokenGroupId) || {}, { _timestamp: new Date().getTime() }));
      const __pathname = '/' + url + '?' + _p;
      __history.push(__pathname);
    } catch (ex) {
      console.log(ex.toString());
    }
  }

  /**
   * 格式化
   * @example
   * sprintf('Latitude: %s, Longitude: %s, Count: %d', 41.847, -87.661, 'two')
   * Expected output: Latitude: 41.847, Longitude: -87.661, Count: 0
   * @returns {*}
   */
  static sprintf() {
    const args = arguments;
    const string = args[0];
    let __index = 1;
    return string.replace(/%((%)|s|d)/g, (mm) => {
      // m is the matched format, e.g. %s, %d
      let val = null;
      if (mm[2]) {
        val = mm[2];
      } else {
        val = args[__index];
        // A switch statement so that the formatter can be extended. Default is %s
        switch (mm) {
          case '%d':
            val = parseFloat(val);
            if (!val) {
              val = 0;
            }
            break;
          default:
            break;
        }
        __index += 1;
      }
      return val;
    });
  }

  /**
   * 格式化
   * @example
   * format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
   * ASP is dead, but ASP.NET is alive! ASP {2}
   * @param format
   * @returns {*}
   */
  static format(format) {
    const args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== 'undefined'
        ? args[number] : match;
    });
  }

  /**
   * 解析URL地址
   * @method __ParseURL
   * @param {string} url 完整的URL地址
   * @return {object} 自定义的对象
   * @example
   *  用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
   * myURL.file='index.html'
   * myURL.hash= 'top'
   * myURL.host= 'abc.com'
   * myURL.query= '?id=255&m=hello'
   * myURL.params= Object = { id: 255, m: hello }
   * myURL.path= '/dir/index.html'
   * myURL.segments= Array = ['dir', 'index.html']
   * myURL.port= '8080'
   * yURL.protocol= 'http'
   * myURL.source= 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
   */
  static $parseURL(url) {
    const ae = document.createElement('a');
    ae.href = url;
    return {
      source: url,
      protocol: ae.protocol.replace(':', ''),
      host: ae.hostname,
      port: ae.port,
      query: ae.search,
      params: (() => {
        const ret = {};
        const seg = ae.search.replace(/^\?/, '').split('&');
        const len = seg.length;
        let ii = 0;
        let ss;
        for (; ii < len; ii += 1) {
          if (seg[ii]) {
            ss = seg[ii].split('=');
            ret[ss[0]] = ss[1];
          }
        }
        return ret;
      })(),
      file: (ae.pathname.match(/\/([^/?#]+)$/i) || [''])[1],
      hash: ae.hash.replace('#', ''),
      path: ae.pathname.replace(/^([^/])/, '/$1'),
      relative: (ae.href.match(/tps?:\/\/[^/]+(.+)/) || [''])[1],
      segments: ae.pathname.replace(/^\//, '').split('/')
    };
  }

  /**
   * 事件处理
   * @param eventName 事件名称
   * @param param1     参数名称1
   * @param param2     参数名称2
   * @param param3     参数名称3
   * @param param4     参数名称4
   * @param param5     参数名称5
   * @param param6     参数名称6
   * @param param7     参数名称7
   * @param param8     参数名称8
   * @param param9     参数名称9
   */
  static $emit(eventName, param1, param2, param3, param4, param5, param6, param7, param8, param9) {
    if (this.isUndefined(eventName)) {
      return;
    }
    const event = this.getContent(this.constItem.Event);
    if (this.isUndefined(event) || event === null) {
      return;
    }
    if (!this.$isFunction(event.emit)) {
      return;
    }
    event.emit(eventName, param1, param2, param3, param4, param5, param6, param7, param8, param9);
  }

  /**
   * 添加事件
   * @param eventName  {string}  事件名称
   * @param callBack  {function} 回调的方法名称
   */
  static $on(eventName, callBack) {
    if (this.isUndefined(eventName)) {
      return;
    }
    const event = this.getContent(this.constItem.Event);
    if (this.isUndefined(event) || event === null) {
      return;
    }
    if (!this.$isFunction(event.on)) {
      return;
    }
    event.on(eventName, callBack);
  }

  static $removeEvent(eventName, listener) {
    if (this.isUndefined(eventName)) {
      return;
    }
    const event = this.getContent(this.constItem.Event);
    if (this.isUndefined(event) || event === null) {
      return;
    }
    event.removeListener(eventName, listener);
  }

  /**
   * 弹出提示信息
   * @param Content 弹出显示内容
   * @param Title  弹出显示的标题，可以不填写，默认为当前导航条里的标题
   * @param ToPage 弹出来，页面跳转到下一个页面 {Url: Utility.constItem.UrlItem.Login, Options: {}}
   * @constructor
   */
  static $actionSheet(Content, Title, ToPage) {
    this.$emit(this.constItem.Events.ShowModel.OnActionSheet, {
      Title, ContentInfo: { Content }, ToPage
    });
  }

  /**
   * 弹出按钮
   * @static
   * @param {any} Buttons [{Title:'btn1',FunName:()=>{}},{}...]
   * @param {any} IsHideCancel 默认不用填写
   * @memberof Utility
   */
  static $actionSheetBtns(Buttons, IsHideCancel) {
    this.$emit(this.constItem.Events.ShowModel.OnActionSheet, { Buttons, Options: { IsHideCancel } });
  }

  static $actionSheetHide(callback) {
    this.$emit(this.constItem.Events.ShowModel.OnActionSheetHide, { callBack: callback });
  }


  /**
   * 确定，取消窗体
   * @param Message 信息内容
   * @param okButton 点击确定事件
   * @param Title 弹出窗体上的标题 (可空)
   * @param onCancel 点击取消事件  (可空)
   */
  static $confirm(Message, okButton, Title, onCancel, options) {
    this.$emit(
      this.constItem.Events.ShowModel.OnConfirm,
      {
        Title, Content: Message, okButton, onCancel, Options: options
      }
    );
  }

  static $showDialog(Html, Title, okButton, onCancel, Options) {
    this.$emit(
      this.constItem.Events.ShowModel.OnShowDialog,
      {
        Title, Html, okButton, onCancel, isShowAction: true,
        Options: Object.assign(Options || {}, { IsHideCancel: true, IsHideOk: true })
      }
    );
  }

  static $showDialogHide(args) {
    this.$emit(this.constItem.Events.ShowModel.OnShowDialogHide, args);
  }

  static $showDialogConfirm(msg, Title, okButton, onCancel) {
    let _title = Title;
    let _okButton = okButton;
    if (this.$isFunction(Title)) {
      _title = '提示信息';
      _okButton = Title;
    }
    this.$emit(
      this.constItem.Events.ShowModel.OnShowDialog,
      {
        Content: msg, Title: _title, okButton: _okButton, onCancel
      }
    );
  }

  static $alert(msg, title) {
    let _title = title;
    let _okButton;
    if (this.$isFunction(title)) {
      _title = '提示信息';
      _okButton = title;
    }
    this.$emit(
      this.constItem.Events.ShowModel.OnShowDialog,
      {
        Content: msg, Title: _title, okButton: _okButton, Options: { IsHideCancel: true }
      }
    );
  }

  /**
   * 打开加载动画
   */
  static $loading() {
    this.$emit(this.constItem.Events.ShowModel.OnLoading);
  }

  /**
   * 关闭加载动画
   */
  static $loadingHide() {
    this.$emit(this.constItem.Events.ShowModel.OnLoadingHide);
  }

  /**
   * 去空格
   * @param value
   * @returns {*}
   */
  static $trim(value) {
    if (typeof value !== 'undefined') {
      return value.replace(/(^\s*)|(\s*$)/g, '');
    }
    return '';
  }

  /**
   * 去右边空格
   * @param value
   * @returns {*}
   */
  static $trimRight(value) {
    if (typeof value !== 'undefined') {
      return value.replace(/(\s*$)/g, '');
    }
    return '';
  }

  /**
   * 去左边空格
   * @param s
   * @returns {*}
   */
  static $trimLeft(value) {
    if (typeof value !== 'undefined') {
      return value.replace(/(^\s*)/g, '');
    }
    return '';
  }

  /**
   * 菜单-->添加文字
   * @param Text
   * @param onClick
   * @param FontColor
   */
  static $navBarRightAddText(Text, onClick, FontColor) {
    this.$emit(
      this.constItem.Events.OnEditNavBar,
      this.constItem.Navbar.RIGHT_INFO,
      {
        MenuType: this.constItem.Navbar.TYPE_TEXT,
        DataSource: { Text, onBtnClick: onClick, FontColor }
      }
    );
  }

  /**
   * 菜单-->添加文字
   * @param Text
   * @param onClick
   * @param FontColor
   */
  static $navBarRightReset() {
    this.$emit(
      this.constItem.Events.OnEditNavBar,
      this.constItem.Navbar.RIGHT_INFO,
      { MenuType: this.constItem.Navbar.TYPE_DEFAULT, DataSource: {} }
    );
  }

  /**
   * 菜单-->添加按键
   * @param Text
   * @param onClick
   * @param FontColor
   * @param BgColor
   */
  static $navBarRightAddButton(Text, onClick, FontColor, BgColor) {
    this.$emit(
      this.constItem.Events.OnEditNavBar,
      this.constItem.Navbar.RIGHT_INFO,
      {
        MenuType: this.constItem.Navbar.TYPE_BUTTON,
        DataSource: { Text, onBtnClick: onClick, FontColor, BgColor }
      }
    );
  }

  /**
   * 菜单-->添加图标
   * @param Icon
   * @param onClick
   */
  static $navBarRightAddIcon(IconName, onClick) {
    this.$emit(
      this.constItem.Events.OnEditNavBar,
      this.constItem.Navbar.RIGHT_INFO,
      {
        MenuType: this.constItem.Navbar.TYPE_ICON,
        DataSource: { IconName, onIconClick: onClick }
      }
    );
  }

  /**
   * 菜单-->添加图标
   * @param Icon
   * @param onClick
   */
  static $navBarRightAddImage(IconImage, onClick) {
    this.$emit(
      this.constItem.Events.OnEditNavBar,
      this.constItem.Navbar.RIGHT_INFO,
      {
        MenuType: this.constItem.Navbar.TYPE_ICON,
        DataSource: { IconImage, onIconClick: onClick }
      }
    );
  }

  /**
   * 菜单-->添加菜单
   * [{Text:'菜单1',onClick:onClick},{Text:'菜单2',onClick:onClick},...]
   * @param MenuItem
   */
  static $navBarRightAddMenuItem(MenuItem) {
    this.$emit(this.constItem.Events.OnEditNavBar, this.constItem.NavBarRightType.NBMenu, MenuItem);
  }

  /**
   * 打开日期控件
   *
   * @static    * @param {datetime} currentDate 当前时间
   * @param {boolean} isShowTime 是否显示时间
   * @param {Function} ok  点击确定按钮事件-->这里可以获取到返回的日期
   * @param {Function} cancel 取消按钮事件
   *
   * @example
   *    // 打开日期
   *    Utility.$openDatePicker(new Date(),false,(date)=>{console.log(date);},()=>{ // cancel todo });
   *    // 打开日期和时间
   *    Utility.$openDatePicker(new Date(),true,(date)=>{console.log(date);},()=>{ // cancel todo });
   *    // 传入日期
   *    Utility.$openDatePicker('2013-10-10',false,(date)=>{console.log(date);},()=>{// cancel todo });
   *    // 传入日期和时间
   *    Utility.$openDatePicker('2010-10-10 12:20,true,(date)=>{console.log(date);},()=>{ // cancel todo });
   *    // 传入值，如果是null 或 '' 默认为当前时间
   *    Utility.$openDatePicker('',false,(date)=>{console.log(date);},()=>{// cancel todo });
   *
   * @memberOf Utility
   */
  static $openDatePicker(currentDate, isShowTime, ok, cancel) {
    this.$emit(this.constItem.Events.OnOpenDatePicker, currentDate, isShowTime, ok, cancel);
  }

  /**
   * 将日期转为时间戳
   *
   * @static    * @param {any} date
   * @returns
   *
   * @memberOf Utility
   */
  static $convertToTimestamp(date) {
    if (typeof date === 'undefined' || date === null || date === '') {
      return 0;
    }
    if (this.$isDate(date)) {
      // replace(/(\s*$)/g, '') r.replace(/-/g, "/")
      return date.constructor.name === 'Date' ? date.getTime() : new Date(date.replace('年', '-').replace('月', '-').replace('日', '').replace(/-/g, '/')).getTime();
    }
    return 0;
  }

  /**
   * 将时间戳转为日期类型
   *
   * @static    * @param {number} value
   * @returns
   * @example
   *    Utility.$convertToDateByTimestamp('1478131200000') -> 2016-11-03
   *    Utility.$convertToDateByTimestamp('1478131200000','yyyy年MM月dd日') -> 2016年11月03日
   * @memberOf Utility
   */
  static $convertToDateByTimestamp(value, format) {
    if (this.$isNumber(value)) {
      const __date = new Date(parseInt(value, 0));
      return this.formatDate(format || 'yyyy-MM-dd', __date);
    }
    return '';
  }

  /**
   * 字符串转为日期类型
   *
   * @static    * @param {string} value 日期
   * @returns Date 或为 null
   * @example
   *  Utility.$convertToDateByString('2013-10-10');
   * @memberOf Utility
   */
  static $convertToDateByString(value) {
    if (this.$isDate(value)) {
      return value.constructor.name === 'Date' ? value : new Date(value.replace('年', '-').replace('月', '-').replace('日', ''));
    }
    return null;
  }

  /**
   * @param value
   * @returns {*}
   */
  static $isNumber(value) {
    if (typeof value === 'undefined' || value === null || value === '') {
      return false;
    }
    return /^\+?[0-9]\d*$/.test(value);
  }

  /**
   * 格式化数字
   *
   * @static
   * @param {any} number
   * @returns
   *
   * @example Utility.$formatNumber(10000) ==> 10,000
   * @memberOf Utility
   */
  static $formatNumber(number) {
    if (!this.$isNumber(number)) {
      return number;
    }
    const __value = this.$trim(number);
    return String(__value).split('').reverse().join('')
      .replace(/(\d{3})(?=[^$])/g, '$1,')
      .split('')
      .reverse()
      .join('');
  }

  /**
   * 判断是否为空
   *
   * @static
   * @param {string} value 要判断的值
   * @returns true:是 ; false:否
   *
   * @memberOf Utility
   */
  static $isEmpty(value) {
    if (!value) {
      return true;
    }
    const __value = this.$trim(value);
    if (__value === '') {
      return true;
    }
    return false;
  }

  static $clone(obj) {
    if (!obj) {
      return null;
    }
    const __temp = {};
    Object.keys(obj).forEach((key) => {
      if (key !== 'IsExistsNextData' && key !== '_timestamp') {
        __temp[key] = obj[key] ? obj[key].toString() : '';
      }
    });
    return __temp;
  }

  /**
   * 后退操作
   *
   * @static
   *
   * @memberOf Utility
   */
  static $goBack(times) {
    this.toPage(this.constItem.UrlItem.GoBack, { times });
  }

  /**
   * 向redux里设置内容。
   * 
   * @static
   * @param {any} key store名称
   * @param {any} value 内容
   * @returns 
   * @memberof Utility
   */
  static $onSetContent(key, value) {
    const onSetContent = this.getContent(this.constItem.KeySetContent);
    if (!onSetContent) {
      return;
    }
    onSetContent(key, value);
  }

  /**
   * 清空页面位置
   * 
   * @static
   * @param {any} [Pages=[]]  可以清空多个页面，页面请从 Utility.constItem.UrlItem里取。
   * @param {boolean} [IsClearAll=false] 是否清空所有。默认为false
   * @memberof Utility
   */
  static $onClearPagePosition(Pages = [], IsClearAll = false) {
    // OnPagePositionClear: 'ON_GOCOM_PAGE_POSITION_CLEAR',             // 清空App页面位置
    this.$emit(this.constItem.Events.OnPagePositionClear, { IsClearAll, Pages });
  }

  static parseUrlParam() {
    const { location } = window;
    const { search } = location || {};
    return this.$convertUrlParamToObj(search);
  }

  /**
   * 采用正则表达式获取地址栏参数
   * @static
   * @param {any} name 
   * @returns 
   * @memberof Utility
   */
  static $getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  /**
   * 判断当前时间是否是今天
   * @static
   * @param {any} date isToday(new Date(1510047326271)); 
   * @returns 
   * @memberof Utility
   */
  static isToday(date) {
    const today = new Date();
    // 获取从今天0点开始到现在的时间
    const todayTime = today.getTime() % (1000 * 60 * 60 * 24);
    // 获取要判断的日期和现在时间的偏差
    const offset = date.getTime() - today.getTime();
    // 获取要判断日期距离今天0点有多久
    const dateTime = offset + todayTime;
    if (dateTime < 0 || dateTime > 1000 * 60 * 60 * 24) {
      return false;
    }
    return true;
  }
}
