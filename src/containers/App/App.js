import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Switch } from 'react-router-dom';
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
import { Utility, LoadingModel, ActionSheetModel, ConfirmModel } from 'components';
const styles = require('./scss/App.scss');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,                                // 子项
    Title: PropTypes.string,
    onSetContent: PropTypes.func,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { DialogList: [], AppPagePostionInfo: {} };
  }

  componentWillMount() {
    this.initTokenAndGroupId();
    const __key = Utility.constItem.KeyHistory;
    if (!Utility.getContent(__key)) {
      Utility.setContent(__key, this.context.router.history);
      const __IsGoBackKey = Utility.constItem.KeyGoBack;
      const { location: Location } = this.context.router.route;
      const self = this;
      const { UrlTitle } = Utility.constItem;
      const __SetTitle = (location) => {
        const { pathname } = location;
        if (UrlTitle && UrlTitle[pathname]) {
          self.state.UrlTitle = UrlTitle[pathname];
          Utility.setContent('__URL_TITLE_INFO_', UrlTitle[pathname]);
          self.onUpdateUrlParams(location);
        }
      };
      __SetTitle(Location);
      this.context.router.history.listen((location, action) => {
        Utility.setContent(__IsGoBackKey, action === 'POP');
        __SetTitle(location);
        self.state.IsSwitchOpen = false;
        setTimeout(() => {
          self.state.IsSwitchOpen = true;
          self.UpdatePagePosition();
        }, 1000);
      });
    }
    // 设置事件
    Utility.setContent(Utility.constItem.Event, event);
  }

  componentDidMount() {
    this.state.isMount = true;
    this.__InitEmit();
    this.onUpdateUrlParams();
    const { divApp } = this.refs;
    divApp.addEventListener('scroll', this.handleScroll.bind(this));
    this.__SetMaxWindow();
  }

  componentWillUnmount() {
    const { divApp } = this.refs;
    divApp.removeEventListener('scroll', this.handleScroll.bind(this));
    clearInterval(this.state.MaxWindowInterval);
    clearInterval(this.state.MaxWindowInterval);
  }
  
  /**
   * 判断入口，如果是消息推送进来的入口，点击返回的时候要关闭页面
   * 那么就要根据out_entry参数来让对应页面的isClose变为true。
   * @param {any} location 
   * @memberof App
   */
  onUpdateUrlParams(location) {
    const { search } = location || this.context.router.history.location;
    const params = Utility.$convertUrlParamToObj(search);
    const history = Utility.getContent(Utility.constItem.KeyHistory);
    const { pathname } = history.location;
    const { UrlTitle } = Utility.constItem;
    const { out_entry } = params || {};
    const _obj = UrlTitle[pathname] || {};
    if (out_entry === 'true') {
      _obj.isClose = true;
    }
    Utility.$onSetContent('UrlParams', params);
  }

  getTransitionsName() {
    const __IsGoback = Utility.getContent(Utility.constItem.KeyGoBack);
    const __tranName = {};
    if (!!__IsGoback) {
      __tranName.enter = styles.spEnterReturn;
      __tranName.enterActive = styles.spEnterActiveReturn;
      __tranName.leave = styles.spLeaveReturn;
      __tranName.leaveActive = styles.spLeaveActiveReturn;
      __tranName.appear = styles.spAppearReturn;
      __tranName.appearActive = styles.spAppearActiveReturn;
    } else {
      __tranName.enter = styles.spEnter;
      __tranName.enterActive = styles.spEnterActive;
      __tranName.leave = styles.spLeave;
      __tranName.leaveActive = styles.spLeaveActive;
      __tranName.appear = styles.spAppear;
      __tranName.appearActive = styles.spAppearActive;
    }
    return __tranName;
  }

  initTokenAndGroupId() {
    const { search } = this.context.router.history.location;
    const params = Utility.$convertUrlParamToObj(search);
    const { token, groupId } = params || {};
    Utility.setContent(Utility.constItem.KeyTokenGroupId, { token, groupId }, true);
  }

  handleScroll(e) {
    const { scrollTop } = e.currentTarget;
    const { pathname } = this.context.router.history.location;
    const { IsSwitchOpen, AppPagePostionInfo } = this.state;
    if (!IsSwitchOpen) {
      return;
    }
    AppPagePostionInfo[pathname] = scrollTop;
  }

  UpdatePagePosition() {
    const { pathname } = this.context.router.history.location;
    const { AppPagePostionInfo } = this.state;
    if (!AppPagePostionInfo[pathname]) {
      return;
    }
    const { divApp } = this.refs;
    if (!divApp) {
      return;
    }
    const scrollTop = Number.parseInt(AppPagePostionInfo[pathname], 0);
    divApp.scrollTop = scrollTop;
  }

  __CloseWebView() {
    const { GoCom } = window || {};
    const { closeWindow } = GoCom || {};
    if (closeWindow) {
      console.log('关闭窗体。');
      closeWindow();
    }
  }

  __InitEmit() {
    const __this = this;
    const { HttpStatus, OnNoResources, OnGoBack, ShowModel, OnPagePositionClear } = Utility.constItem.Events;
    Utility.$on(OnPagePositionClear, (args) => {
      __this.__ClearPagePosition(args);
    });
    Utility.$on(OnGoBack, () => {
      __this.__HandlerGoBack();
    });
    Utility.$on(HttpStatus[1], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(HttpStatus[400], (err, body) => {
      Utility.$actionSheet(body ? body.message : (err ? err.message : ''));
    });
    Utility.$on(HttpStatus[401], (err, body) => {
      if (body && body.code === 804) {
        console.log(err, body);
      } else {
        let msg = '服务器处理错误，请重试！';
        if (body && body.message) {
          msg = body.message;
        }
        Utility.$actionSheet(msg);
      }
    });
    Utility.$on(HttpStatus[403], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(HttpStatus[404], (err, body) => {
      if (body && body.message) {
        // Utility.$showNoResource();
        Utility.$actionSheet(body.message);
        return;
      }
      Utility.$actionSheet('接口[' + body.path + ']方法未找到');
    });
    Utility.$on(HttpStatus[411], (err, body) => {
      Utility.$emit(Utility.constItem.Events.ShowModel.OnActionSheet, {
        Title: __this.props.Title,
        Content: { Content: body.message || '用户登录过期' }
      });
    });
    Utility.$on(HttpStatus[500], (err, body) => {
      const { msg } = body || {};
      Utility.$actionSheet('服务器处理错误' + (msg ? '[' + msg + ']' : ''));
    });
    Utility.$on(HttpStatus[501], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(HttpStatus[502], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(HttpStatus[503], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(OnNoResources, (isNoResources) => {
      __this.state.IsNoResources = isNoResources;
    });

    const { OnNavBarClear,
      OnActionSheet, OnConfirm, OnLoading, OnLoadingHide, OnActionSheetHide, OnConfirmHide, OnShowDialog, OnShowDialogClose, OnShowDialogHide, OnShowActions, OnActionsHide
    } = ShowModel;

    Utility.$on(OnNavBarClear, () => {
      delete __this.state.nMenuItem;
      delete __this.state.RightType;
      delete __this.state.LeftType;
      __this.state.DialogList = [];
      __this.state.ShowModelConfirm = '';
      __this.__UpdateRender();
    });

    /**
     * 弹出消息窗体
     */
    Utility.$on(OnActionSheet, (args) => {
      __this.state = Object.assign(__this.state || {}, {
        ShowModelActionSheet: Utility.constItem.ShowModel.ActionSheet,
        asContent: args.ContentInfo,
        asTitle: args.Title || __this.props.Title,
        asButtons: args.Buttons,
        asOptions: args.Options,
        asToPage: args.ToPage || {}
      });
      __this.__UpdateRender();
    });

    /**
     * 关闭弹出消息窗体
     */
    Utility.$on(OnActionSheetHide, (args) => {
      const { goComActionSheet } = __this.refs;
      if (!goComActionSheet) {
        return;
      }
      goComActionSheet.__HandlerClose();
      setTimeout(() => {
        __this.state.ShowModelActionSheet = '';
        __this.__UpdateRender();
        const { callBack } = args || {};
        if (callBack) {
          callBack();
        }
      }, 200);
    });

    /**
     * 弹出确认--取消窗体
     */
    Utility.$on(OnConfirm, (args) => {
      __this.state = Object.assign(__this.state || {}, {
        ShowModelConfirm: Utility.constItem.ShowModel.Confirm,
        cmTitle: args.Title || __this.props.Title,
        cmContent: args.Content,
        cmOkButton: args.okButton,
        cmCancelButton: args.cancelButton,
        cmOptions: args.Options,
      });
      __this.__UpdateRender();
    });

    /**
    * 弹出删除等动作确认窗体
    */
    Utility.$on(OnShowActions, (args) => {
      __this.state = Object.assign(__this.state || {}, {
        ShowModelActions: Utility.constItem.ShowModel.Actions,
        ActionsTitle: args.ActionsTitle,
        ActionsButtons: args.ActionsButtons,
      });
      __this.__UpdateRender();
    });

    /**
    * 关闭删除等动作确认窗体
    */
    Utility.$on(OnActionsHide, (args) => {
      const times = parseInt(args || 0, 0);
      setTimeout(() => {
        if (__this.state.ShowModelToast === '') {
          return;
        }
        __this.state.ShowModelToast = '';
        __this.__UpdateRender();
      }, times === 0 ? 10 : times);
    });

    /**
     * 弹出加载窗体
     */
    Utility.$on(OnLoading, () => {
      __this.state = Object.assign(__this.state || {}, { ShowModelLoading: Utility.constItem.ShowModel.Loading, lmContent: '正在处理...' });
      __this.__UpdateRender();
    });

    /**
     * 关闭弹出的确认--取消窗体
     */
    Utility.$on(OnLoadingHide, (args) => {
      if (__this.state.ShowModelLoading === '') {
        return;
      }
      const times = parseInt(args || 0, 0);
      setTimeout(() => {
        if (__this.state.ShowModelLoading === '') {
          return;
        }
        __this.state.ShowModelLoading = '';
        __this.__UpdateRender();
      }, times === 0 ? 10 : times);
    });

    /**
     * 关闭弹出确认窗体
     */
    Utility.$on(OnConfirmHide, () => {
      __this.state.ShowModelConfirm = '';
      __this.__UpdateRender();
    });

    /**
     * 打开弹出窗体
     */
    Utility.$on(OnShowDialog, (args) => {
      const { DialogList } = __this.state;
      DialogList.push(Object.assign(args || {}, { DialogIndex: DialogList.length + 1 }));
      __this.state.DialogList = DialogList;
      __this.__UpdateRender();
    });


    /**
     * 关闭弹出窗体
     *
     * times 判断当前关闭窗体的 索引号，是否和 DialogList 里的DialogIndex一致。不一致的话，就不关闭窗体。
     * 如果times为  undefined 说是主动关闭的，直接关闭窗体了。
     */
    Utility.$on(OnShowDialogHide, (times) => {
      const { DialogList } = __this.state;
      if (DialogList.length === 0) {
        return;
      }

      const __index = DialogList[DialogList.length - 1].DialogIndex;
      if (!times || Number(times) === __index) {
        Utility.$emit(OnShowDialogClose + '_' + __index);
      }
      setTimeout(() => {
        if (!times || (Number(times) === __index)) {
          DialogList.pop();
          __this.state.DialogList = DialogList;
          __this.__UpdateRender();
        }
      }, times || 200);
    });

    /**
     * 修改导航条右边
     */
    Utility.$on(Utility.constItem.Events.OnEditNavBarRight, (nbDirection, nbType, options) => {
      const { NBButton, NBIcon, NBMenu, NBDefault, NBIconList } = Utility.constItem.NavBarType;
      __this.state[nbDirection] = { nbDirection, nbType, options };
      let __Content = {};
      switch (nbType) {
        case NBButton:
          __Content = { nBtnColor: options.Color, nBtnGbColor: options.BgColor, nBtnText: options.Text, nBtnClick: options.onClick, IsShowMenu: false };
          __this.state = Object.assign(__this.state || {}, __Content);
          break;
        case NBIconList:
          __this.state.nIconList = options;
          break;
        case NBIcon: // 显示图标 (添加，搜索图标)
          __this.state = Object.assign(__this.state || {}, { nIcon: options.Icon, nIconClick: options.onClick, IsShowMenu: false }); break;
        case NBMenu: // 显示菜单
          __this.state = Object.assign(__this.state || {}, { nMenuItem: options, IsShowMenu: false });
          break;
        case NBDefault: // 默认
          __this.state[nbDirection] = NBDefault;
          __this.state.IsShowMenu = false;
          break;
        default:
          __this.state[nbDirection] = NBDefault;
          __this.state.IsShowMenu = false;
      }
      __this.__UpdateRender();
    });

    /**
     * 打开日期控件
     */
    Utility.$on(Utility.constItem.Events.OnOpenDatePicker, (date, IsShowTime, onConfirm, onCancel) => {
      __this.state = Object.assign(__this.state || {}, {
        IsOpenDate: true,
        CurrentSelectDate: Utility.$isDate(date) ? Utility.$convertToDateByString(date) : new Date(),
        IsShowTime,
        onDatePickerConfirm: onConfirm,
        onDatePickerCancel: onCancel
      });
      __this.__UpdateRender();
    });
  }

  /**
   * 更新页面信息
   *
   * @memberOf NavBar
   */
  __UpdateRender() {
    if (!!this.state.isMount) {
      this.setState({ __Index: new Date().getTime() });
    }
  }

  /**
   * 清空页面位置
   * 
   * @param {any} args  
   * @returns 
   * @memberof App
   */
  __ClearPagePosition(args) {
    const { IsClearAll, Pages } = args;
    if (!!IsClearAll) {
      this.state.AppPagePostionInfo = {};
      return;
    }
    if (!Utility.isArray(Pages)) {
      return;
    }
    const { AppPagePostionInfo } = this.state;
    Pages.forEach((page) => {
      delete AppPagePostionInfo['/' + page];
    });
  }

  /**
   * 页面加载
   * @returns {*}
   * @private
   */
  __ShowLoading() {
    const isShow = this.state.ShowModelLoading;
    return isShow && isShow !== '' ? (<LoadingModel Content={this.state.lmContent || '正在载'} />) : null;
  }

  /**
   * 确定，取消
   * @returns {*}
   * @private
   */
  __ShowConfirm() {
    const { cmContent, cmOkButton, cmCancelButtonTitle, cmCancelButton, cmOkButtonTitle, cmOptions, cmTitle } = this.state;
    const isShow = this.state.ShowModelConfirm;
    return isShow && isShow !== '' ? (<ConfirmModel
      Title={cmTitle || ''}
      Content={cmContent || ''}
      Options={cmOptions}
      okButtonTitle={cmOkButtonTitle}
      cancelButtonTitle={cmCancelButtonTitle}
      okButton={cmOkButton}
      cancelButton={cmCancelButton}
    />) : null;
  }

  /**
   * 从下面弹出信息来
   * @returns {*}
   * @private
   */
  __ShowActionSheet() {
    const isShow = this.state.ShowModelActionSheet;
    if (!isShow) {
      return null;
    }
    return (<ActionSheetModel ref="goComActionSheet"
      ContentInfo={this.state.asContent || {}} Title={this.state.asTitle}
      onClose={() => {
        Utility.$emit(Utility.constItem.Events.ShowModel.OnActionSheetHide);
      }}
      Buttons={this.state.asButtons}
      Options={this.state.asOptions}
      ToPage={this.state.asToPage}
    />);
  }

  __BuildDialogHTML() {
    const { DialogList } = this.state;
    if (!Utility.isArray(DialogList)) {
      return null;
    }
    return DialogList.map((item, index) => {
      // const {Title, Html, okButton, onCancel} = item;
      return (<ConfirmModel key={'dialog_' + index}
        {...item}
      >{item.Html}</ConfirmModel>);
    });
  }

  __SetMaxWindow() {
    const MaxWindowInterval = setInterval(() => {
      const { GoCom } = window;
      if (GoCom) {
        clearInterval(MaxWindowInterval);
        clearInterval(MaxWindowInterval);
        Utility.$platformApi.$maxWindow();
      }
    }, 500);

    this.state.MaxWindowInterval = MaxWindowInterval;
  }

  render() {
    const __timeout = 500;
    const { context } = this;
    const { router } = context || {};
    const { route } = router || {};
    const { location } = route || {};
    const { key } = location || {};

    return (
      <div className={styles.appContent} ref="divApp">
        <CSSTransitionGroup
          component="div"
          transitionName={this.getTransitionsName()}
          transitionAppear
          transitionAppearTimeout={__timeout}
          transitionEnterTimeout={__timeout}
          transitionLeaveTimeout={__timeout}>
          <Switch key={key} location={location}>
            {this.props.children}
          </Switch>
        </CSSTransitionGroup>
        <div>
          {this.__ShowConfirm()}
          {this.__ShowLoading()}
          {this.__ShowActionSheet()}
          {this.__BuildDialogHTML()}
        </div>
      </div>
    );
  }
}
