import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Utility, ApiInfo } from 'components';
import { connect } from 'react-redux';
import * as CommonActions from 'reducers/reduxCommon';
const styles = require('./scss/PeopleTaskList.scss');

@connect((state) => ({
  Title: state.Common.Title,                                             // 标题
  UrlParams: state.Common.UrlParams,                                     // URL参数
}), { ...CommonActions })

export default class PeopleTaskList extends Component {
  static propTypes = {
    Title: PropTypes.string,                                            // 标题
    UrlParams: PropTypes.object,                                        // url 参数
    PeopleTaskList1: PropTypes.array,
    onItemClick: PropTypes.func,
    IsShowLoadingComplete: PropTypes.bool,
    aboutUrl: PropTypes.func,
    aboutNextPage: PropTypes.func,
    onApiPost: PropTypes.func,
    onApiPut: PropTypes.func,
    onApiDelete: PropTypes.func,
    onSetContent: PropTypes.func,
    onUpdatePeople: PropTypes.func,
    onUpdateRedux: PropTypes.func,
    dataSource: PropTypes.bool,                                         // 是否可选择
    type: PropTypes.string,
    explan: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      PeopleList: [],
      delepeo: {},
      isAuth: false,
      delesenpeo: {},
    };
  }

  componentDidMount() {
    this.state.IsMount = true;
  }

  componentWillReceiveProps(nextProps) {
    delete this.state.IsMount;
    const { PeopleTaskList1, dataSource, type } = nextProps;
    if (!!dataSource) {
      this.setState({ isAuth: true });
    } else {
      this.setState({ isAuth: false });
    }
    this.state.PeopleInfo = {};
    if (Utility.isArray(PeopleTaskList1)) {
      PeopleTaskList1.forEach((people) => {
        if (type === 'type') {
          const { userId } = people;
          this.state.PeopleInfo[userId] = people;
        } else {
          const { userId } = people;
          this.state.PeopleInfo[userId] = people;
        }
      });
    }
    this.setState({ PeopleList: PeopleTaskList1 });
  }

  componentWillUnmount() {
    const { onSetContent } = this.props;
    onSetContent('senderPeo', this.state.PeopleList);
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ __CurrentTempDate: new Date().getTime() });
    }
  }

  __GetArticalList() {
    let dataArr = [];
    const { type } = this.props;
    const { PeopleList, delepeo, isAuth, delesenpeo } = this.state;
    if (PeopleList) {
      dataArr = PeopleList;
    }
    if (!Utility.isArray(dataArr)) {
      return null;
    }
    return dataArr.map((item, index) => {
      const _checked = type === 'type' ? (delesenpeo[item.userId] ? true : false) : (delepeo[item.userId] ? true : false);
      const { userName } = item || {};
      return (
        <div className={styles.peopleContent} key={index}>
          <div className={styles.people}>
            {isAuth && <div className={styles.inputc}>
              <input type="checkbox" checked={_checked} ref="Inputs" onClick={this.checkpeo.bind(this, item)} />
            </div>}
            <div className={styles.icon} />
            <div className={styles.name}>{userName}</div>
          </div>
        </div>
      );
    });
  }

  __HandlerSelectPeople() {
    const { PeopleList, PeopleInfo } = this.state;
    const { onUpdatePeople, type, onApiPut, onUpdateRedux } = this.props;
    const urlInfo = Utility.getContent(Utility.constItem.KeyTokenGroupId);
    const { groupId, token } = urlInfo || {};
    if (!groupId) {
      return;
    }
    let pIdList = [];
    if (Utility.isArray(PeopleList)) {
      pIdList = PeopleList.map((item) => item.userId);
    }
    Utility.$platformApi.$selectUser(pIdList, true, (data) => {
      const { users } = data || {};
      if (type === 'type') {
        users.forEach((userse) => {
          const { userId, username } = userse;
          const _objsen = { userName: username, userId };
          if (!PeopleInfo[userId]) {
            PeopleInfo[userId] = _objsen;
          }
        });
        const newDatasen = Object.values(PeopleInfo);
        onApiPut('SavesenInfo', ApiInfo.NotifiterList, { params: { groupId, token, active: 'add' }, data: newDatasen }).then(() => {
          onUpdateRedux();
          this.setState({ PeopleList: newDatasen });
          if (onUpdatePeople) {
            onUpdatePeople(this.state.PeopleList);
          }
        }, (err) => {
          Utility.$alert(JSON.stringify(err));
          Utility.$loadingHide();
        });
      } else {
        const __NewAddUserList = [];
        users.forEach((user) => {
          const { userId, username } = user;
          const _obj = { userName: username, userId };
          if (!PeopleInfo[userId]) {
            // PeopleInfo[userId] = Object.assign(user, {taskUserName: username,
            //        userId: userId});
            PeopleInfo[userId] = _obj;
            __NewAddUserList.push(PeopleInfo[userId]);
          }
        });
        const newData = Object.values(PeopleInfo);
        if (__NewAddUserList.length > 0) {
          onApiPut('SavepeoInfo', ApiInfo.PartakerList, { params: { groupId, token, active: 'add' }, data: __NewAddUserList }).then(() => {
            onUpdateRedux();
            this.setState({ PeopleList: newData });
            if (onUpdatePeople) {
              onUpdatePeople(this.state.PeopleList);
            }
          }, (err) => {
            Utility.$alert(JSON.stringify(err));
            Utility.$loadingHide();
          });
        }
      }
    }, (err) => {
      Utility.$alert(JSON.stringify(err));
    });
  }

  /**
   * 删除人
   * @returns 
   * @memberof PeopleTaskList
   */
  dele() {
    const { onUpdatePeople, type, onApiPut, onUpdateRedux } = this.props;
    const { delepeo, PeopleInfo, delesenpeo } = this.state;
    const urlInfo = Utility.getContent(Utility.constItem.KeyTokenGroupId);
    const { groupId, token } = urlInfo || {};
    if (!groupId) {
      return;
    }
    const newDatas = Object.values(delepeo);
    const __newData = Object.values(PeopleInfo);
    const newSendPeo = Object.values(delesenpeo);
    if (type === 'type') {
      if (newSendPeo.length === __newData.length) {
        Utility.$alert('不可全部删除');
        return;
      }
      if (newSendPeo.length > 0) {
        newSendPeo.forEach((item) => {
          if (PeopleInfo[item.userId]) {
            delete PeopleInfo[item.userId];
          }
        });
      }
      const newDatasen = Object.values(PeopleInfo);
      // Utility.$alert(JSON.stringify(newSendPeo));
      const __Delesen = () => {
        if (newDatasen.length > 0) {
          onApiPut('SavesenInfo', ApiInfo.NotifiterList, { params: { groupId, token, active: 'del' }, data: newSendPeo }).then(() => {
            onUpdateRedux();
            this.setState({ PeopleList: newDatasen, delesenpeo: {}, PeopleInfo: this.state.PeopleInfo, bool: false });
            if (onUpdatePeople) {
              onUpdatePeople(this.state.PeopleList);
            }
          }, (err) => {
            Utility.$alert(JSON.stringify(err));
            Utility.$loadingHide();
          });
        }
      };
      Utility.$actionSheetBtns([{
        Title: '删除', onClick: () => {
          Utility.$actionSheetHide();
          setTimeout(() => {
            __Delesen();
          }, 200);
        }
      }]);
    } else {
      if (newDatas.length === __newData.length) {
        Utility.$alert('不可全部删除');
        return;
      }
      if (newDatas.length > 0) {
        newDatas.forEach((item) => {
          if (PeopleInfo[item.userId]) {
            delete PeopleInfo[item.userId];
          }
        });
      }
      // Utility.$alert(JSON.stringify(newDatas));
      const __dele = () => {
        if (newDatas.length > 0) {
          onApiPut('SavepeoInfo', ApiInfo.PartakerList, { params: { groupId, token, active: 'del' }, data: newDatas }).then(() => {
            onUpdateRedux();
            this.setState({ PeopleList: Object.values(PeopleInfo), delepeo: {}, PeopleInfo: this.state.PeopleInfo, bool: false });
            if (onUpdatePeople) {
              onUpdatePeople(this.state.PeopleList);
            }
          }, (err) => {
            Utility.$alert(JSON.stringify(err));
            Utility.$loadingHide();
          });
        }
      };
      Utility.$actionSheetBtns([{
        Title: '删除', onClick: () => {
          Utility.$actionSheetHide();
          setTimeout(() => {
            __dele();
          }, 200);
        }
      }]);
    }
  }

  /**
   * 删除人数组
   * 
   * @param {any} item 
   * @memberof PeopleTaskList
   */
  checkpeo(item) {
    const { type } = this.props;
    const { delepeo, delesenpeo } = this.state;
    if (type === 'type') {
      if (delesenpeo[item.userId]) {
        delete delesenpeo[item.userId];
      } else {
        delesenpeo[item.userId] = item;
      }
      this.setState({ delesenpeo });
    } else {
      if (delepeo[item.userId]) {
        delete delepeo[item.userId];
      } else {
        delepeo[item.userId] = item;
      }
      this.setState({ delepeo });
    }
  }

  render() {
    const { PeopleTaskList1 } = this.props;
    const { isAuth } = this.state;
    return (
      <div className={styles.content} ref="content">
        <div className={styles.addpeo}>
          <div className={styles.centera} onClick={this.__HandlerSelectPeople.bind(this)}>+添加</div>
        </div>
        <div className={styles.peopleListCss}>
          {this.__GetArticalList()}
        </div>
        {!Utility.isArray(PeopleTaskList1) && <div className={styles.complateInfo}>暂无人员列表，请选择人员</div>}
        {!!isAuth && <div className={styles.filter}>
          <div className={styles.deleteb} onClick={this.dele.bind(this)}>删除</div>
        </div>}
      </div>
    );
  }
}
