import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CommonActions from 'reducers/reduxCommon';
import { DefHref, Utility, Icon } from 'components';
const comStyles = require('styles/Common.scss');
const styles = require('./scss/Default.scss');

@connect((state) => ({
  MenuRight: state.Common[Utility.constItem.StoreName.NAVBAR_RIGHT_INFO],
  MenuLeft: state.Common[Utility.constItem.StoreName.NAVBAR_LEFT_INFO],
}), { ...CommonActions })
export default class Default extends Component {
  static propTypes = {
    onSetContent: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // const a = 123;
  }

  componentDidMount() {
    this.state.isMount = true;
    this.__HandlerNavbarRight(0);
  }

  __HandlerNavbarLeft() {
    const { onSetContent } = this.props;
    if (!Utility.$isFunction(onSetContent)) {
      return;
    }
    const __info = {
      MenuType: Utility.constItem.Navbar.TYPE_BUTTON,
      DataSource: { Text: '编辑', BgColor: 'red', FontColor: '#222' }
    };
    onSetContent(Utility.constItem.StoreName.NAVBAR_LEFT_INFO, __info);
  }

  __HandlerNavbarRight(type) {
    switch (type) {
      case 0:
        Utility.$navBarRightAddButton('编辑', () => {
          console.log('-------right click------');
        }, '#222', 'red');
        break;
      case 1:
        Utility.$navBarRightAddText('内容', () => {
          console.log('-------right click------');
        }, 'red');
        break;
      case 2:
        Utility.$navBarRightReset();
        break;
      case 3:
        Utility.$navBarRightAddIcon('iconMore', () => {
          console.log('-------navbar icon ----');
        });
        break;
      case 4:
        Utility.$navBarRightAddImage(require('../../components/Icon/img/icon-people@3x.png'), () => {
          console.log('-------navbar icon Image----');
        });
        break;

      default:
        Utility.$navBarRightReset();
        break;
    }
  }

  render() {
    return (
      <div className={comStyles.navbar + ' ' + styles.defaultCss}>
        <DefHref />
        常用功能
        <div className={styles.demo}>
          <div onClick={() => {
            Utility.$loading();
            setTimeout(() => {
              Utility.$loadingHide();
            }, 5000);
          }}>Loading</div>
          <div onClick={() => {
            Utility.$showDialog(<div >
              <div onClick={() => {
                Utility.$showDialogHide();
              }}>弹出来的信息</div>
            </div>, '标题', () => {
              Utility.$showDialogHide();
            }, () => {
              Utility.$showDialogHide();
            });
          }}>Show Dialog</div>
          <div onClick={() => {
            Utility.$showDialogConfirm('弹出确定和取消窗体来', () => {
            }, '弹窗', () => { });
          }}>Confirm Dialog</div>
          <div onClick={() => {
            Utility.$alert('alert信息', 'Alert');
          }}>Alert Msg</div>
          <div onClick={() => {
            Utility.$actionSheet('alert信息', 'Alert');
          }}>Action Sheet</div>
        </div>
        导航条
        <div className={styles.demo}>
          <div onClick={this.__HandlerNavbarRight.bind(this, 0)}>Right Btn</div>
          <div onClick={this.__HandlerNavbarRight.bind(this, 1)}>Right Text</div>
          <div onClick={this.__HandlerNavbarRight.bind(this, 2)}>Right Reset</div>
          <div onClick={this.__HandlerNavbarRight.bind(this, 3)}>Right Icon</div>
          <div onClick={this.__HandlerNavbarRight.bind(this, 4)}>Right Image</div>
        </div>
        图标列表
        <div className={styles.componentsDemo}>
          <Icon IconType="iconBgArrowRight" />
          <Icon IconType="iconBgArrowLeft" />
          <Icon IconType="iconArrowLeft" />
          <Icon IconType="iconSwitchOpen" />
          <Icon IconType="iconSwitchClose" />
          <Icon IconType="iconNextStep" />
        </div>
      </div>
    );
  }
}
