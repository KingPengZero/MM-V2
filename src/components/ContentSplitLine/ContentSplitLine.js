import React, { Component } from 'react';
import PropTypes from 'prop-types';
const styles = require('./scss/ContentSplitLine.scss');

/**
 * 图标
 * <ContentSplitLine Value="这是分割线啦"/>
 */
export default class ContentSplitLine extends Component {
  static propTypes = {
    Value: PropTypes.string,                                     // 显示的内容
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { Value } = this.props;
    return (
      <div className={styles.contentSplitLineCss}>
        <div className={styles.splace} />
        <div className={styles.desc}>
          <div className={styles.line} />
          <div className={styles.name}>{Value || '分割线'}</div>
          <div className={styles.line} />
        </div>
        <div className={styles.splace} />
      </div>
    );
  }
}
