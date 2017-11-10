export default class PlatformApi {
  constructor() {
    this._TempSaveContent = {};
    this.__ConstPrefix = 'WeiXinGoCom';
  }

  static __JudgeGoComIsExist(error) {
    const { GoCom } = window;
    if (!GoCom) {
      if (error) {
        error({ code: -1, msg: 'gocom api 没有找到。' });
      }
      return null;
    }
    return GoCom;
  }

  /**
   * 拍照,图片上传
   * 
   * @static
   * @param {any} type  [0:打开相机和相册，1：打开相机，2：打开相册]
   * @param {any} success 成功回调
   * @param {any} error  失败回调
   * @returns 
   * @memberof PlatformApi
   */
  static $capture(postUrl, type, isEdit, success, error) {
    if (!postUrl) {
      return;
    }
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    function captured(data) {
      if (success) {
        success(data);
      }
    }
    function _error(err) {
      if (error) {
        error(err);
      }
    }

    window.__captured = captured;
    window.__failed = _error;
    // http://172.20.95.138:9910/workplace/{filename}
    goCom.capture({ edit: !!isEdit, posturl: postUrl, maxlength: 1024 * 1024 * 5, type }, '__captured', '__failed');
  }

  /**
   * 版本
   * @static
   * @memberof PlatformApi
   */
  static $version(success) {
    const goCom = this.__JudgeGoComIsExist(null);
    if (!goCom) {
      return;
    }
    window.goComVersionOk = (data) => {
      if (success) {
        success(data);
      }
    };
    goCom.version('goComVersionOk');
  }

  /**
   * 选择人员
   * 
   * @static
   * @memberof PlatformApi
   */
  static $selectUser(userNameList, isMultiselect, success, error) {
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    window.goComSelectUserOk = (data) => {
      if (success) {
        success(data);
      }
    };
    window.goComSelectUserFail = (er) => {
      if (error) {
        error(er);
      }
    };
    goCom.selectUser(userNameList.join(','), isMultiselect, 'goComSelectUserOk', 'goComSelectUserFail');
  }

  /**
   * 查看人员
   * 
   * @static
   * @memberof PlatformApi
   */
  static $openChat(userName, success, error) {
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    window.goComChatWithUserOk = (data) => {
      if (success) {
        success(data);
      }
    };
    window.goComChatWithUserFail = (er) => {
      if (error) {
        error(er);
      }
    };
    goCom.chatWithUser(userName, 'goComChatWithUserOk', 'goComChatWithUserFail');
  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $showInfo(userName, success, error) {
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    window.goComShowInfoOk = (data) => {
      if (success) {
        success(data);
      }
    };
    window.goComShowInfoFail = (er) => {
      if (error) {
        error(er);
      }
    };
    goCom.showInfo(userName, 'goComShowInfoOk', 'goComShowInfoFail');
  }

  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $uploadFile() {

  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $getLocation() {

  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $openWindow(url) {
    if (!url) {
      return;
    }
    const goCom = this.__JudgeGoComIsExist();
    if (!goCom) {
      window.location.href = url;
      return;
    }
    goCom.openWindow(url);
  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $qrCode(success, error) {
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    window.goComQrCodeOk = (data) => {
      if (success) {
        success(data);
      }
    };
    window.goComQrCodeFail = (er) => {
      if (error) {
        error(er);
      }
    };
    goCom.tdcode('goComQrCodeOk', 'goComQrCodeFail');
  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $launchApp() {

  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $sendInfoMsg() {

  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $openAppMsgList() {

  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $closeWindow() {
    const goCom = this.__JudgeGoComIsExist(null);
    if (!goCom) {
      return;
    }
    window.goComCloseWindow = () => {

    };

    goCom.closeWindow('goComCloseWindow');
  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $maxWindow() {
    const goCom = this.__JudgeGoComIsExist(null);
    if (!goCom) {
      return;
    }
    window.goComMaxWindow = () => {
      console.log('maxWindo');
    };
    goCom.maxWindow('goComMaxWindow');
  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $getSmartKeys(success, error) {
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    window.goComSmartKeysOk = (data) => {
      if (success) {
        success(data);
      }
    };
    window.goComSmartKeysFail = (er) => {
      if (error) {
        error(er);
      }
    };
    goCom.getSmartKeys('goComSmartKeysOk', 'goComSmartKeysFail');
  }

  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $getNetworkStatus(success, error) {
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    window.goComNetworkStatusOk = (data) => {
      if (success) {
        success(data);
      }
    };
    window.goComNetworkStatusFail = (er) => {
      if (error) {
        error(er);
      }
    };
    goCom.getNetworkStatus('goComNetworkStatusOk', 'goComNetworkStatusFail');
  }
  /**
   * 
   * 
   * @static
   * @memberof PlatformApi
   */
  static $getWifiSSIDs(success, error) {
    const goCom = this.__JudgeGoComIsExist(error);
    if (!goCom) {
      return;
    }
    window.goComWifiSSIDsOk = (data) => {
      if (success) {
        success(data);
      }
    };
    window.goComWifiSSIDsFail = (er) => {
      if (error) {
        error(er);
      }
    };
    goCom.getWifiSSIDs('goComWifiSSIDsOk', 'goComWifiSSIDsFail');
  }
}
