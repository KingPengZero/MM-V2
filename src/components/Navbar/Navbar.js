import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CommonActions from 'reducers/reduxCommon';
import { Utility, Icon } from 'components';
const styles = require('./scss/Navbar.scss');

@connect((state) => ({
  MenuRight: state.Common.MenuRight,
  MenuLeft: state.Common.MenuLeft,
}), { ...CommonActions })
export default class Navbar extends Component {
  static propTypes = {
    Title: PropTypes.string,
    MenuRight: PropTypes.object,           // {MenuType:'default, button ,menu',DataSource:''}
    MenuLeft: PropTypes.object,            // {MenuType:'default, button ,menu',DataSource:''}
    onSetContent: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { MenuInfo: {} };
    this.__HandlerOnClickLeft = this.__HandlerOnClickLeft.bind(this);
    this.__ListenerNavBar = this.__ListenerNavBar.bind(this);
    this.__UpdateNavbarTitle = this.__UpdateNavbarTitle.bind(this);
    Utility.setContent(Utility.constItem.KeySetContent, this.props.onSetContent);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.state.isMount = true;
    this.__InitEmit(this);
  }

  componentWillUnmount() {
    delete this.state.isMount;
    // delete 事件 
    Utility.$removeEvent(Utility.constItem.Events.OnEditNavBar, this.__ListenerNavBar);
    Utility.$removeEvent(Utility.constItem.Events.OnUpdateNavbarTitle, this.__UpdateNavbarTitle);
  }

  __UpdateRender() {
    if (this.state.isMount) {
      this.setState({ CURRENT_DATE: new Date().getTime() });
    }
  }

  __InitEmit() {
    Utility.$on(Utility.constItem.Events.OnEditNavBar, this.__ListenerNavBar);
    Utility.$on(Utility.constItem.Events.OnUpdateNavbarTitle, this.__UpdateNavbarTitle);
  }

  __UpdateNavbarTitle(Title) {
    Utility.setContent('__URL_TITLE_INFO_', Title);
    this.__UpdateRender();
  }

  __ListenerNavBar(type, menuInfo) {
    // 由于页面切换有过渡时间
    setTimeout(() => {
      this.state.MenuInfo[type] = menuInfo;
      this.__UpdateRender();
    }, 450);
  }
  
  /**
   * 导航条返回 设置isClose参数来判断页面是否是关闭还是goback
   * 
   * @returns 
   * @memberof Navbar
   */
  __HandlerOnClickLeft() {
    const history = Utility.getContent(Utility.constItem.KeyHistory);
    const { pathname } = history.location;
    const { UrlTitle } = Utility.constItem;
    const { isClose } = UrlTitle[pathname] || {};
    if (!!isClose) {
      this.__CloseWebView();
      return;
    }
    // console.log(history);
    Utility.$goBack();
  }
  
  /**
   * 调用gocom的关闭页面方法
   * 
   * @memberof Navbar
   */
  __CloseWebView() {
    const { GoCom } = window || {};
    const { closeWindow } = GoCom || {};
    if (closeWindow) {
      console.log('关闭窗体。');
      closeWindow();
    }
  }

  __BuildMenuRight() {
    const MenuRight = this.state.MenuInfo[Utility.constItem.Navbar.RIGHT_INFO];
    if (!MenuRight) {
      return null;
    }
    const { MenuType, DataSource } = MenuRight;
    const { TYPE_DEFAULT, TYPE_MENU, TYPE_BUTTON, TYPE_ICON, TYPE_TEXT } = Utility.constItem.Navbar;
    const { Text, BgColor, FontColor, onBtnClick, onIconClick, IconName, IconImage } = DataSource;
    const btnStyle = () => {
      const _style = {};
      if (BgColor) {
        _style.background = BgColor;
      }
      if (FontColor) {
        _style.color = FontColor;
      }
      return _style;
    };
    let MenuInfo;
    switch (MenuType) {
      case TYPE_ICON:
        MenuInfo = (
          <div onClick={() => onIconClick && onIconClick()}>
            {
              IconName ? <Icon IsHidePadding IconType={IconName} />
                : IconImage && <div className={styles.iconImage}><div style={{ backgroundImage: 'url(' + IconImage + ')' }} /></div>
            }
          </div>
        );
        break;
      case TYPE_TEXT:
        MenuInfo = (
          <div className={styles.text} style={btnStyle()} onClick={() => onBtnClick && onBtnClick()}>
            {Text}
          </div>
        );
        break;
      case TYPE_BUTTON:
        MenuInfo = (
          <div className={styles.btn} style={btnStyle()} onClick={() => onBtnClick && onBtnClick()}>
            {Text}
          </div>
        );
        break;
      case TYPE_MENU:
        MenuInfo = (<div />);
        break;
      case TYPE_DEFAULT:
        break;
      default:
        break;
    }

    return MenuInfo || null;
  }

  __GetTitle() {
    const title = Utility.getContent('__URL_TITLE_INFO_');
    if (title) {
      window.document.title = title.Title;
      return title.Title;
    }
    return '默认标题';
  }
  // <div onClick={this.__HandlerOnClickLeft} />
  render() {
    return (
      <div className={styles.navbarCss}>
        <div className={styles.left}>
          <Icon IsHidePadding IconType="iconArrowLeft" onClick={this.__HandlerOnClickLeft} />
        </div>
        <div className={styles.center}>{this.__GetTitle()}</div>
        <div className={styles.right} >
          {
            this.__BuildMenuRight()
          }
        </div>
      </div>
    );
  }
}
