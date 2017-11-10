import Utility from '../../Common/Utility';
const __Base = 'GOCOM/REDUX/Common/';
const Load = __Base + 'Load';
const LoadSuccess = __Base + 'LoadSuccess';
const LoadFail = __Base + 'LoadFail';

const _BaseNBEditTitle = __Base + 'NavBar/';
const NbTitleEdit = _BaseNBEditTitle + 'Title_Edit';
const NbTitleInfo = _BaseNBEditTitle + 'Title_Info';

const __UpdateTime = __Base + '/__UpdateTime';
const __DeleteStateByFields = __Base + '/DeleteStateByFields';
// 清空信息
const ClearContentSuccess = __Base + '/ClearContentSuccess';

/**
 * 设置变量操作
 * @type {string}
 */
const OnSetContent = __Base + 'OnSetContent';
const UrlParamsEdit = __Base + 'UrlParamsEdit';

const __API = __Base + 'API/';
const __POST = __API + '/POST';               // POST方法处理
const __PUT = __API + '/PUT';                 // PUT方法处理
const __DELETE = __API + '/DELETE';           // DELETE方法处理
const __GET = __API + '/GET';                 // GET方法处理

let __TEMP_SERVICES_SYSTEM_TIEM;
const initialState = { loaded: false, __Times: 0, };

// function __ProcessConent(state, action) {
//   const { StateName, result, Condition } = action;
//   const { params } = Condition;
//   const { size, page } = params || {};
//   if (size > 0) {
//     let __Data = state[StateName];
//     if (!__Data) {
//       __Data = {};
//       state[StateName] = __Data;
//     }
//     if (!result) {
//       state[StateName].List = [];
//       state[StateName].Condition = Condition;
//     }

//     const { content } = result;
//     if (!Utility.isArray(content)) {
//       if (!Utility.isArray(state[StateName].List) || page === 0) {
//         state[StateName].List = [];
//       }
//       params.IsExistsNextData = false;
//       state[StateName].Condition = params;
//       return state;
//     }

//     const __pgCount = size || Utility.constItem.PageSize;
//     const __pgIndex = page || 0;
//     params.page = Number(__pgIndex) + 1;
//     params.size = __pgCount;
//     params.IsExistsNextData = content.length < __pgCount;
//     if (content) {
//       if (__pgIndex !== 0 && Utility.isArray(__Data.List)) {
//         __Data.List = __Data.List.concat(content);
//       } else {
//         __Data.List = content;
//       }
//     }
//     __Data.Condition = params;
//     __Data.CurrentIndex = page;
//     state[StateName] = __Data;
//   } else {
//     state[StateName] = result;
//   }
//   return state;
// }

function __ProcessGetArray(state, action) {
  const { StateName, Condition, result } = action;
  const { params } = Condition;
  const { pg_index, pg_count, index } = params;
  let __Result = state[StateName];
  if (!__Result) {
    __Result = {};
    state[StateName] = __Result;
  }
  if (!result) {
    state[StateName].List = [];
    state[StateName].Condition = Condition;
    return state;
  }
  const { content, elements, totalElements } = result || {};
  const _dataList = content || elements;
  if (!Utility.isArray(_dataList)) {
    if (!Utility.isArray(state[StateName].List) || pg_index === 0) {
      state[StateName].List = [];
    }
    params.IsExistsNextData = false;
    state[StateName].Condition = params;
    state[StateName].Total = totalElements;
    return state;
  }
  const __pgCount = pg_count || Utility.constItem.PageSize;
  const __pgIndex = pg_index || 0;
  params.pg_index = Number(__pgIndex) + 1;
  params.pg_count = __pgCount;
  params.IsExistsNextData = !(_dataList.length < __pgCount);
  if (_dataList) {
    if (__pgIndex !== 0 && Utility.isArray(__Result.List)) {
      __Result.List = __Result.List.concat(_dataList);
    } else {
      __Result.List = _dataList;
    }
  }
  __Result.Condition = params;
  __Result.Total = totalElements;
  __Result.CurrentIndex = pg_index || index;

  state[StateName] = __Result;
  return state;
}

function __ProcessRequestByGet(state, action) {
  const { StateName, result, Condition } = action;
  const { params } = Condition;
  if (params) {
    const { pg_index } = params || {};
    if (pg_index || pg_index >= 0) {
      // 说明返回的数组。
      return __ProcessGetArray(state, action);
    }
  }

  if (StateName) {
    state[StateName] = result;
  }
  return state;
}

export default function reducer(state = initialState, action = {}) {
  let __Result = { ...state };
  if (action.result) {      // 这里就是请求完成了
    Object.assign(__Result, { loading: false, loaded: true });
    __Result.Result = action.result;
  }
  if (action.error) {     // 请求完了之后出错信息
    Object.assign(__Result, { loading: false, loaded: false });
    __Result.Error = action.error;
  }

  const { StateName, result } = action;
  const { __CurrentSystemTimes } = result || {};
  if (__CurrentSystemTimes) {
    __TEMP_SERVICES_SYSTEM_TIEM = __CurrentSystemTimes;
  }
  __Result.CurrentSystemTimes = __TEMP_SERVICES_SYSTEM_TIEM;
  __Result.SystemTimes = __TEMP_SERVICES_SYSTEM_TIEM;
  switch (action.type) {
    case OnSetContent:
      __Result[action.Key] = action.Value;
      break;
    case Load:                                                                         // 加载
      __Result.loading = true;
      break;
    case LoadSuccess:                                                                 // 加载成功
      __Result.data = action.result;
      break;
    case NbTitleInfo:                                                                     // 修改标题,是否显示返回按键
      __Result.Title = action.Title || '默认标题';
      __Result.IsShowBackArrow = action.IsShowBackArrow ? action.IsShowBackArrow : false;
      break;
    case NbTitleEdit:                                                                    // 修改标题
      __Result.Title = action.Title || '默认标题';
      break;
    case UrlParamsEdit:                                                                  // url 参数
      __Result.UrlParams = action.query;
      break;
    case LoadFail:                                                                       // 加载失败
      break;
    case __DELETE:
      break;
    case __POST:
    case __PUT:
      if (StateName) {
        __Result[StateName] = result;
      }
      break;
    case __GET:
      // __Result[StateName || 'GetResult'] = result;
      __Result = __ProcessRequestByGet(state, action);
      break;
    case __UpdateTime:
      __Result.__Times += 1;
      break;
    case ClearContentSuccess:
      __Result[action.Key] = null;                                               // 清空信息
      break;
    default:
  }
  return __Result;
}

function __RequestProcess(method, StateName, api, args) {
  const __Method = {
    get: __GET, post: __POST, put: __PUT, del: __DELETE
  };
  return {
    types: [Load, __Method[method] || __GET, LoadFail],
    promise: (client) => client[method || 'get'](api, args),
    Condition: args,
    StateName
  };
}

/**
 * post保存接口调用方法。
 *
 * @export
 * @param {any} StateName
 * @param {any} Api
 * @param {any} Args {params:{}:data:{}}
 * @returns
 */
export function onApiPost(StateName, Api, Args) {
  return __RequestProcess('post', StateName, Api, Args);
}

/**
 * put方法，修改方法操作。
 * @export
 * @param {any} StateName
 * @param {any} Api
 * @param {any} Args
 * @returns
 */
export function onApiPut(StateName, Api, Args) {
  return __RequestProcess('put', StateName, Api, Args);
}

/**
 * 删除
 *
 * @export
 * @param {any} Api
 * @param {any} Args
 * @returns
 */
export function onApiDelete(Api, Args) {
  return __RequestProcess('del', null, Api, Args);
}

/**
 * 获取
 *
 * @export
 * @param {any} StateName
 * @param {any} Api
 * @param {any} Args
 * @returns
 */
export function onApiGet(StateName, Api, Args) {
  return __RequestProcess('get', StateName, Api, Args);
}

/**
 * 删除List的数据.
 *
 * @export
 * @param {any} StateName
 * @param {any} Fields [{Key:'SourceId',Value:123},...] or {Key:'SourceId',Value:123}
 * @returns
 */
export function onDeleteByFields(StateName, Fields) {
  return { type: __DeleteStateByFields, StateName, Fields };
}

/**
 * 清空信息
 * @param {key} string
 * @param value
 * @returns
 */
export function onClearContent(key) {
  return { type: ClearContentSuccess, Key: key };
}

export function onUpdateRedux() {
  return { type: __UpdateTime };
}

/**
 * 保存信息到 store里面去。
 * @param key
 * @param value
 * @returns {{type: string, Key: *, Value: *}}
 */
export function onSetContent(key, value) {
  return { type: OnSetContent, Key: key, Value: value };
}
