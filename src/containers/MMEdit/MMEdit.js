import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CommonActions from 'reducers/reduxCommon';
import { Utility, ApiInfo, ContentSplitLine } from 'components';
const comStyles = require('styles/Common.scss');
const styles = require('./scss/MMEdit.scss');

@connect((state) => ({
  Title: state.Common.Title,                                            // 标题
  UrlParams: state.Common.UrlParams,                                    // URL参数
  MMDetail: state.Common.MMDetail,                                      // 晨会详情
  YestadayListData: state.Common.YestadayListData,                      // 昨日晨会
}), { ...CommonActions })
export default class MMEdit extends Component {
  static propTypes = {
    Title: PropTypes.string,                                            // 标题
    UrlParams: PropTypes.object,                                        // url 参数
    MMDetail: PropTypes.object,                                         // 晨会详情
    YestadayListData: PropTypes.object,                                 // 昨日晨会
    onSetContent: PropTypes.func,                                       // save localStorage
    onUpdateRedux: PropTypes.func,                                      // update dedux
    onApiGet: PropTypes.func,                                           // get api
    onApiPost: PropTypes.func,                                          // post api
  }
  constructor(props) {
    super(props);
    this.state = { RefreshComplete: true, NextDataComplete: true, };
    const YestadayData = [];
    for (let i = 0; i < 10; i += 1) {
      YestadayData.push({ Title: '即信速记支持标签搜索即信速记支持标签搜索即信速记支持标签搜索即信速记支持标签搜' + i + '__条', });
    }
    this.state.YestadayData = YestadayData;
  }

  componentWillMount() {
    // 获取数据
    // this.__InitData();
  }

  componentDidMount() {
    this.state.isMount = true;
  }

  componentWillUnmount() {
    delete this.state.isMount;
  }


  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (this.state.isMount) {
      this.setState({ CURRENT_DATE: new Date().getTime() });
    }
  }

  /**
   * 初始化页面数据
   * @returns 
   * @memberof MMSetting
   */
  async __InitData() {
    const { onApiGet } = this.props;
    if (!Utility.$isFunction(onApiGet)) {
      return 'null';
    }
    const __Complete = () => {
      this.state.NextDataComplete = true;
      this.state.RefreshComplete = true;
      this.__UpdateRender();
    };
    const __self = this;
    try {
      const result = await onApiGet('MMsetting', ApiInfo.SaveMMSetting, {});
      if (!result) {
        console.log('没有查到数据。');
        return null;
      }
      __Complete();
      __self.__InitDataByResult();
      return '1';
    } catch (ex) {
      __Complete();
      console.log(ex);
    }
    return '1';
  }

  /**
   * 提交更新
   * @returns 
   * @memberof MMSetting
   */
  async __HandlerSubmitUpdate() {
    const { txtContent } = this.refs;
    const content = txtContent.value;
    const { onApiPost } = this.props;
    if (!Utility.$isFunction(onApiPost)) {
      return;
    }
    try {
      Utility.$loading();
      const result = await onApiPost('AddWorkContentPost', ApiInfo.SaveMMSetting, { data: { content } });
      console.log(result);
    } catch (ex) {
      Utility.$loadingHide();
      console.log(ex);
    }
  }

  __InitDataByResult() {
    const { YestadayListData } = this.props;
    const { Condition } = YestadayListData || {};
    const { IsExistsNextData } = Condition || {};
    this.state.IsNextData = IsExistsNextData;
  }

  __HandlerNextData() {
    const { YestadayListData } = this.props;
    const { Condition } = YestadayListData || {};
    const { IsExistsNextData } = Condition || {};
    if (!IsExistsNextData) {
      return;
    }
    this.state.NextDataComplete = false;
    this.__UpdateRender();
    this.__InitData(Condition, true);
  }

  __HandlerRefresh() {
    const { yestadayInfo } = this.refs;
    console.log(yestadayInfo.scrollTop);
    const params = Object.assign({});
    if (yestadayInfo) {
      if (yestadayInfo.scrollTop === 0) {
        this.state.RefreshComplete = false;
        this.__InitData(params, false);
      }
    }
    this.__UpdateRender();
  }

  /**
   * 昨日晨会列表HTML
   * 
   * @returns 
   * @memberof MMEdit
   */
  __YestadayListHtml() {
    const { YestadayData } = this.state;
    if (!Utility.isArray(YestadayData)) {
      return null;
    }
    return YestadayData.map((item, index) => {
      const { Title } = item || {};
      return (
        <div className={styles.itemCss} key={'yestaday_list_' + index}>{Title};</div>
      );
    });
  }

  render() {
    // const { RefreshComplete, NextDataComplete } = this.state;
    return (<div className={comStyles.navbar + ' ' + styles.mmEditCss}>
      <div className={styles.content}>
        <textarea ref="txtContent" placeholder="哈哈哈哈哈哈哈哈哈哈哈哈" ></textarea>
      </div>
      <ContentSplitLine Value="昨日任务" />

      {/* <Refresh Percentage={20} RefreshComplete={RefreshComplete} NextDataComplete={NextDataComplete}
        onRefresh={this.__HandlerRefresh.bind(this)} onNextData={this.__HandlerNextData.bind(this)}>
        <div className={styles.yestadayInfo} ref="yestadayInfo">
          {this.__YestadayListHtml()}
        </div>
      </Refresh> */}
      
      <div className={styles.yestadayInfo} ref="yestadayInfo">
        {this.__YestadayListHtml()}
      </div>

      <div className={styles.bottomBtn}>
        <div className={styles.btn} onClick={this.__HandlerSubmitUpdate.bind(this)}>更新</div>
      </div>
    </div >);
  }
}
