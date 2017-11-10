import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Utility } from 'components';

/**
 * 图标
 * <Icon IconType="iconDefault" IsHidePadding IsSelect onClick = {this.__HandlerClick.bind(this)} />
 */

export default class Icon extends Component {
  static propTypes = {
    IconType: PropTypes.string,                                     // Icon类型
    DefaultIcon: PropTypes.string,                                  // 默认图标
    IsHidePadding: PropTypes.bool,                                  // 是否隐藏padding
    IsSelect: PropTypes.bool,                                       // 是否选中
    onClick: PropTypes.func,                                        // 点击事件 
  };

  /**
   * 点击事件
   * 
   * @param {any} ee 
   * @returns 
   * @memberof Icon
   */
  __HandlerClick(ee) {
    const { onClick } = this.props;
    if (!Utility.$isFunction(onClick)) {
      return;
    }
    onClick(ee);
  }

  /**
   * 背景样式
   * 
   * @param {any} styles 
   * @returns 
   * @memberof Icon
   */
  __GetStyle(styles) {
    const { IconType } = this.props;
    if (!IconType) {
      return {};
    }
    const __style = {};
    let __IconImg = '';
    if (IconType) {
      __IconImg = styles[IconType];
    }
    if (!__IconImg) {
      __style.backgroundImage = 'url(' + IconType + ')';
      __style.backgroundSize = '100%';
      __style.borderRadius = '100%';
    }
    return __style;
  }

  render() {
    const styles = require('./scss/Icon.scss');
    const {
      IconType, IsSelect, IsHidePadding, DefaultIcon
    } = this.props;
    const __IconImg = styles[IconType] ? styles[IconType] : styles.iconDefault;
    const __Default = styles[DefaultIcon] ? styles[DefaultIcon] : ' ';
    return (
      <div
        className={styles.iconCss + ' ' + __IconImg + ' ' + __Default + ' ' + (!!IsHidePadding ? styles.hidePadding : '') +
          ' ' + (!!IsSelect ? styles.select : '')}
        onClick={this.__HandlerClick.bind(this)}>
        <div style={this.__GetStyle(styles)} />
      </div>
    );
  }
}
