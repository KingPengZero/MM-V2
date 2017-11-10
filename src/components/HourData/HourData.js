import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HourData extends Component {
  static propTypes = {
    IconType: PropTypes.string,
    onComitdata: PropTypes.func,
    onClocse: PropTypes.func,
    dataSource: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const { dataSource } = props;
    const _Hour = dataSource > 0 ? new Date(dataSource).getHours() : dataSource;
    const _Minu = dataSource > 0 ? new Date(dataSource).getMinutes() : dataSource;
    this.state = {
      HourInfo: ['无', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
      ],
      MinuteInfo: ['无', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
        '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38',
        '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52',
        '53', '54', '55', '56', '57', '58', '59', '60'
      ],
      num: _Hour + 1,
      NumM: _Minu + 1,
    };
    this.state.Hour = this.state.HourInfo[this.state.num];
    this.state.Minute = this.state.MinuteInfo[this.state.NumM];
  }

  /**
   * 小时加
   * 
   * @param {any} type 
   * @returns 
   * @memberof HourData
   */
  addHour(type) {
    const { HourInfo, MinuteInfo } = this.state;
    if (type === 'add') {
      this.state.num += 1;
      if (this.state.num === 1) {
        if (this.state.NumM === 0) {
          this.setState({ NumM: 1, Minute: MinuteInfo[1] });
        }
      }
      if (this.state.num >= 26) {
        this.state.num = 25;
        return;
      }
    } else {
      this.state.num -= 1;
      if (this.state.num === 0) {
        this.setState({ NumM: 0, Minute: MinuteInfo[0] });
      }
      if (this.state.num <= -1) {
        this.state.num = 0;
        return;
      }
    }
    this.setState({ num: this.state.num, Hour: HourInfo[this.state.num] });
  }
  
  /**
   * 分钟加
   * 
   * @param {any} type 
   * @returns 
   * @memberof HourData
   */
  addMinute(type) {
    const { MinuteInfo, HourInfo } = this.state;
    if (type === 'add') {
      this.state.NumM += 1;
      if (this.state.NumM === 61) {
        this.setState({ num: this.state.num + 1, Hour: HourInfo[this.state.num + 1], NumM: 1, Minute: MinuteInfo[1] });
        return;
      }
      if (this.state.NumM === 1) {
        if (this.state.num === 0) {
          this.setState({ num: 19, Hour: HourInfo[19], NumM: 1, Minute: MinuteInfo[1] });
          return;
        }
      }
      if (this.state.NumM >= 62) {
        this.state.NumM = 61;
        return;
      }
    } else {
      this.state.NumM -= 1;
      if (this.state.NumM === 0) {
        this.setState({ num: 0, Hour: HourInfo[0] });
      }
      if (this.state.NumM <= -1) {
        this.state.NumM = 0;
        return;
      }
    }
    this.setState({ NumM: this.state.NumM, Minute: MinuteInfo[this.state.NumM] });
  }
  
  /**
   * 确定
   * 
   * @memberof HourData
   */
  comitdata() {
    const { onComitdata } = this.props;
    const { Hour, Minute } = this.state;
    const _Date = new Date();
    const _Y = _Date.getFullYear();
    const _M = _Date.getMonth();
    const _D = _Date.getDate();
    let data = null;
    if (Hour === '无' || Minute === '无') {
      data = -1;
    } else {
      data = new Date(_Y, _M, _D, Number(Hour), Number(Minute)).getTime();
    }
    onComitdata(data);
  }
  
  /**
   * 关闭
   * 
   * @memberof HourData
   */
  closeData() {
    const { onClocse } = this.props;
    onClocse();
  }
  render() {
    const styles = require('./scss/HourData.scss');
    const upimg = require('./img/up.png');
    const downimg = require('./img/down.png');
    const { Hour, Minute } = this.state;
    return (
      <div className={styles.Data}>
        <div className={styles.bg} onClick={this.closeData.bind(this)}></div>
        <div className={styles.outer}>
          <div className={styles.contant}>
            <div className={styles.title}>
              <div className={styles.tleft}>时</div>
              <div className={styles.tleft}>分</div>
            </div>
            <div className={styles.number}>
              <div className={styles.nleft}>
                <div className={styles.imgup} onClick={this.addHour.bind(this, 'low')}>
                  <img src={upimg} alt="" />
                </div>
                <div className={styles.numbercent}>{Hour}</div>
                <div className={styles.imgup} onClick={this.addHour.bind(this, 'add')}>
                  <img src={downimg} alt="" />
                </div>
              </div>
              <div className={styles.nleft}>
                <div className={styles.imgup} onClick={this.addMinute.bind(this, 'low')}>
                  <img src={upimg} alt="" />
                </div>
                <div className={styles.numbercent}>{Minute}</div>
                <div className={styles.imgup} onClick={this.addMinute.bind(this, 'add')}>
                  <img src={downimg} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.button}>
              <button className={styles.left} onClick={this.closeData.bind(this)}>取消</button>
              <button className={styles.right} onClick={this.comitdata.bind(this)}>确定</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
