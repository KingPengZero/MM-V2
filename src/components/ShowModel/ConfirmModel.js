import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Utility, Icon } from 'components';
const styles = require('./scss/ConfirmModel.scss');
/**
 * 确定--取消
 *
 *  <ConfirmModel
 *      Title="订单管理"
 *      Content = "真的删除订单吗？"
 *      okButton = {this.handler.bind(this)}
 *      cancelButton = {this.handler.bind(this)}   --> 如果没有传此方法的时候，就是
 *      okButtonTitle = "确定" --> 不填写时：默认为 “确定”
 *      cancelButtonTitle = "取消"  --> 不填写时：默认为“取消”
 *      />
 *
 */
export default class ConfirmModel extends Component {
  static propTypes = {
    children: PropTypes.object,                                     // 子项
    Content: PropTypes.string,                                      // 内容
    Title: PropTypes.string,                                        // 标题
    Options: PropTypes.object,                                      // 选项
    DialogIndex: PropTypes.number,                                  // 隐藏动画
    okButtonTitle: PropTypes.string,                                // 确定 button标题
    cancelButtonTitle: PropTypes.string,                            // 取消 button 标题
    okButton: PropTypes.func,                                       // 确定 button 事件
    cancelButton: PropTypes.func,                                   // 取消 button 事件
  };

  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    const __self = this;
    setTimeout(() => {
      __self.setState({ isShowAction: true });
    }, 50);
    const { DialogIndex } = this.props;
    if (Number(DialogIndex)) {
      Utility.$on(Utility.constItem.Events.ShowModel.OnShowDialogClose + '_' + DialogIndex, () => {
        __self.__HandlerCancelButton(false);
      });
    }
  }

  componentWillUnmount() {
    this.state.IsUnmount = true;
  }

  /**
   * 关闭窗体
   * @private
   */
  __HandlerCancelButton(isCallCancel) {
    const { cancelButton, DialogIndex } = this.props;
    if (!!this.state.IsUnmount) {
      return;
    }
    this.setState({ isShowAction: false });
    setTimeout(() => {
      Utility.$emit(Utility.constItem.Events.ShowModel.OnConfirmHide);
      if (Number(DialogIndex)) {
        Utility.$showDialogHide(Number(DialogIndex));
      }
      if (!Utility.$isFunction(cancelButton)) {
        return;
      }
      if (!!isCallCancel) {
        cancelButton();
      }
    }, 200);
  }

  /**
   * 点击确定按钮后，关闭当前窗体。
   * @private
   */
  __HandlerOkButton() {
    this.__HandlerCancelButton(false);
    if (Utility.$isFunction(this.props.okButton)) {
      setTimeout(() => {
        this.props.okButton();
      }, 200);
    }
  }

  __JudgeIsTextAreaBottom(target, isDown) {
    const { scrollTop, clientHeight, scrollHeight } = target || {};
    const __Min = scrollTop + clientHeight;
    const __Max = __Min + 12;
    if (isDown === false && ((__Min <= scrollHeight) || (__Max >= scrollHeight))) {
      return true;
    }
    return false;
  }

  __CheckIsCloseButton(target) {
    const { divClose, divCloseIcon } = this.refs;
    const pEle = target.parentElement || {};
    const ppEle = pEle.parentElement || {};
    if (target === divClose || divCloseIcon === target ||
      pEle === divClose || pEle === target ||
      ppEle === divClose || ppEle === target
    ) {
      this.__HandlerCancelButton(true);
    }
  }

  __BuildChildrenEvent(parent) {
    if (!parent) {
      return null;
    }
    if (!parent.length) {
      // 获取子
      if (parent.props) {
        const { children } = parent.props;
        if (children && children.constructor.name === 'Array') {
          return this.__BuildChildrenEvent(children);
        }

        this.state.index = this.state.index + 1;
        return React.cloneElement(parent, { ...parent.props, key: 'cfm_' + this.state.index });
      }
    }
    if (parent.constructor.name !== 'Array') {
      return null;
    }
    const Result = parent.map((sub) => {
      const __ChildResult = this.__BuildChildrenEvent(sub);
      // const __children = sub.props.children;
      this.state.index = this.state.index + 1;
      return React.cloneElement(<div>{__ChildResult}</div>, { ...sub.props, key: 'cfm_' + this.state.index });
      // return __ChildResult;
    });
    return Result;
  }

  __BuildChildren(children) {
    const html = this.__BuildChildrenEvent(children);
    if (Utility.isArray(children)) {
      return html;
    }
    const { className } = children.props;
    return <div className={className || ''}>{html}</div>;
  }

  render() {
    const { Title, Content, okButtonTitle, Options, children, DialogIndex, cancelButtonTitle } = this.props;
    const { isShowAction } = this.state;
    const { IsBgc, IsHideCancel, IsHidePadding, IsHideOk, IsMaxWidth, ChildrenIsComponent, StyleName, cancelBtnTitle, onBtnTitle } = Options || {};
    return (
      <div className={styles.content} ref="goComConfirmModel">
        <div className={styles.background}></div>
        <div ref="divContent" className={styles.leilong}>
          <div className={styles.subLeiLong + ' ' + (!!isShowAction ? styles.showAction : '') + ' '
            + (!!IsMaxWidth ? styles.isMaxWidth : '') + ' ' + styles[StyleName] + ' ' + (!!IsBgc ? styles.bgcCss1 : '')}>
            {
              DialogIndex && Number(DialogIndex) >= 0 && !!IsHideOk && IsHideCancel &&
              <div className={styles.closeIcon} ref="divClose" >
                <Icon ref="divCloseIcon" IconType="iconDelete10" onClick={this.__HandlerCancelButton.bind(this, true)} />
              </div>
            }

            <div className={styles.title + ' ' + (!!IsBgc ? styles.bgcCss2 : '')}>{Title || '提示'}</div>

            <div ref="divTemplate" className={styles.template + ' ' + (!!IsHidePadding ? styles.hidePadding : '') + ' ' + (!!IsBgc ? styles.bgcCss3 : '')}>{
              !!ChildrenIsComponent ? children : Content || this.__BuildChildren(children)
            }</div>
            <div className={styles.buttonInfo + ' ' + (!!IsHideOk && IsHideCancel ? styles.none : '')}>
              {
                !IsHideCancel &&
                <div ref="divBtnCancel" className={styles.cancelButton}
                  onClick={this.__HandlerCancelButton.bind(this, true)}>{cancelButtonTitle || cancelBtnTitle || '知道了'}</div>
              }
              {
                !IsHideOk &&
                <div ref="divBtnOk" className={styles.okButton}
                  onClick={this.__HandlerOkButton.bind(this)}>{okButtonTitle || onBtnTitle || '确定'}</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
