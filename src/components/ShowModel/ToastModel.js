/**
 * Created by admin on 2016-08-24.
 */
import React, { Component, PropTypes } from 'react';
import { GxIcon } from 'components';
/**
 * 加载模型
 *
 * <ToastModel content = "删除成功" IconType = 'iconAllRight'/>
 */
export default class ToastModel extends Component {
  static propTypes = {
    content: PropTypes.string,
    IconType: PropTypes.string
  };

  /**
   * 关闭窗体
   * @private
   */
  __HandlerCloseButton() {
    // Utility.$emit(Utility.constItem.Events.ShowModel.OnLoadingHide);
  }

  /**
   * 此方法，是为了防止，底层DIV滚动用的。
   * @param ee
   * @private
   */
  __HandlerOnScroll(ee) {
    ee.stopPropagation();
    ee.preventDefault();
  }

  render() {
    const styles = require('./scss/ToastModel.scss');
    const { content, IconType } = this.props;

    return (
      <div className={styles.loadingModel} ref="goComLoadingModel">
        <div className={styles.background}></div>
        <div className={styles.leiLong} onTouchMove={this.__HandlerOnScroll.bind(this)}
          onClick={this.__HandlerCloseButton.bind(this)}>
          <div className={styles.subLeiLong}>
            <div className={styles.icon}>
              <GxIcon IconType={IconType} />
            </div>
            <div className={styles.template}>{content || ''}</div>
          </div>
        </div>
      </div>
    );
  }
}
