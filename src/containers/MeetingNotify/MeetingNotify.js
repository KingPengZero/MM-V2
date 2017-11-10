import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from 'components';
import * as CommonActions from 'reducers/reduxCommon';
const comStyles = require('styles/Common.scss');
const styles = require('./scss/MeetingNotify.scss');

@connect((state) => ({
  Title: state.Common.Title,                                            // 标题
  UrlParams: state.Common.UrlParams,                                    // URL参数
}), { ...CommonActions })
export default class MeetingNotify extends Component {
  static propTypes = {
    Title: PropTypes.string,                                            // 标题
    UrlParams: PropTypes.object,                                        // url 参数
  }

  constructor(props) {
    super(props);
    this.state = { RefreshComplete: true, NextDataComplete: true };
    this.state.ScrollData = [];
  }

  componentDidMount() {
    this.state.IsMount = true;
  }

  componentWillUnmount() {
    delete this.state.IsMount;
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ __CurrentTempDate: new Date().getTime() });
    }
  }

  render() {
    return (
      <div className={comStyles.navbar + ' ' + styles.meetingNotifyCss}>
        MeetingList Notify
      </div>
    );
  }
}

