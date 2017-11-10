(() => {
  // flexible.css
  const cssText = `@charset \"utf-8\";
  html{color:#000;background:#f4f5f6;overflow-y:auto;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}
  html,body{font-family:sans-serif}
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,
  section{margin:0;padding:0}
  input,select,textarea{font-size:100%}
  table{border-collapse:collapse;border-spacing:0}
  fieldset,img{border:0}
  abbr,acronym{border:0;font-variant:normal}
  del{text-decoration:line-through}
  address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}
  ol,ul{list-style:none}
  caption,th{text-align:left}
  h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}
  q:before,q:after{content:''}
  sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}
  sup{top:-.5em}sub{bottom:-.25em}
  a:hover{text-decoration:underline}
  ins,a{text-decoration:none}`;
  // cssText end
  const styleEl = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleEl);
  if (styleEl.styleSheet) {
    if (!styleEl.styleSheet.disabled) {
      styleEl.styleSheet.cssText = cssText;
    }
  } else {
    try {
      styleEl.innerHTML = cssText;
    } catch (e) {
      styleEl.innerText = cssText;
    }
  }
})();


((win, lib) => {
  const doc = win.document;
  const docEl = doc.documentElement;
  let metaEl = doc.querySelector('meta[name="viewport"]');
  const flexibleEl = doc.querySelector('meta[name="flexible"]');
  let dpr = 0;
  let scale = 0;
  let tid;
  const flexible = lib.flexible || (lib.flexible = {});

  if (metaEl) {
    // console.warn('将根据已有的meta标签来设置缩放比例');
    const match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale, 0);
    }
  } else if (flexibleEl) {
    const content = flexibleEl.getAttribute('content');
    if (content) {
      const initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      const maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  if (!dpr && !scale) {
    const isAndroid = win.navigator.appVersion.match(/android/gi);
    console.log('isAndroid', isAndroid);
    const isIPhone = win.navigator.appVersion.match(/iphone/gi);
    const devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }

  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      const wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem() {
    let width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
      width = 540 * dpr;
    }
    const rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    win.rem = rem;
    flexible.rem = rem;
  }

  win.addEventListener('resize', () => {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = (12 * dpr) + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', () => {
      doc.body.style.fontSize = (12 * dpr) + 'px';
    }, false);
  }

  refreshRem();
  win.dpr = dpr;
  flexible.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = (d) => {
    let val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  };

  flexible.px2rem = (d) => {
    let val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  };
})(window, window.lib || (window.lib = {}));


((win, lib) => {
  const doc = win.document;
  const docEl = doc.documentElement;
  const gridEl = doc.querySelector('meta[name="grid"]');
  let styleEl;
  const flexible = lib.flexible || (lib.flexible = {});

  function makeGrid(params) {
    const designWidth = parseFloat(params.designWidth);
    const designUnit = parseFloat(params.designUnit);
    const columnCount = parseFloat(params.columnCount);
    const columnXUnit = parseFloat(params.columnXUnit);
    const gutterXUnit = parseFloat(params.gutterXUnit);
    const edgeXUnit = parseFloat(params.edgeXUnit);
    const className = params.className || 'grid';

    if (!(params.designWidth && params.designUnit && params.columnCount && params.columnXUnit && params.gutterXUnit && params.edgeXUnit)) {
      throw new Error('参数错误');
    }

    lib.flexible.gridParams = params;

    const ratio = (designUnit / designWidth) * 10;
    const columnWidth = columnXUnit * ratio;
    const gutterWidth = gutterXUnit * ratio;
    const edgeWidth = edgeXUnit * ratio;

    const cssText = [
      '.' + className + ' {',
      'box-sizing:content-box;',
      'padding-left: ' + edgeWidth + 'rem;',
      'padding-right: ' + edgeWidth + 'rem;',
      'margin-left: -' + gutterWidth + 'rem;',
      '}',

      '.' + className + ':before,',
      '.' + className + ':after{',
      'content: " ";',
      'display: table;',
      '}',

      '.' + className + ':after {',
      'clear: both;',
      '}',

      '.' + className + ' [class^="col-"] {',
      'margin-left: ' + gutterWidth + 'rem;',
      'float: left;',
      '}'
    ];

    for (let i = 1; i <= columnCount; i += 1) {
      const width = (columnWidth * i) + (gutterWidth * (i - 1));
      cssText.push('.' + className + ' .col-' + i + ' {width: ' + width + 'rem;}');
    }

    if (styleEl && styleEl.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
    styleEl = doc.createElement('style');
    styleEl.innerHTML = cssText.join('');
    const el = doc.querySelector('head') || docEl.firstElementChild || docEl;
    el.appendChild(styleEl);
  }

  const gridMode = {
    '750-12': { designWidth: 750, designUnit: 6, columnCount: 12, columnXUnit: 7, gutterXUnit: 3, edgeXUnit: 4 },
    '750-6': { designWidth: 750, designUnit: 6, columnCount: 6, columnXUnit: 17, gutterXUnit: 3, edgeXUnit: 4 },
    '640-12': { designWidth: 640, designUnit: 4, columnCount: 12, columnXUnit: 11, gutterXUnit: 2, edgeXUnit: 3 },
    '640-6': { designWidth: 640, designUnit: 4, columnCount: 6, columnXUnit: 24, gutterXUnit: 2, edgeXUnit: 3 }
  };

  function makeGridMode(modeName) {
    const mode = gridMode[modeName];
    if (mode) {
      makeGrid(mode);
    } else {
      throw new Error('不支持这个预设模式');
    }
  }

  if (gridEl) {
    const content = gridEl.getAttribute('content');
    if (content) {
      const reg = /([^=]+)=([\d\.\-]+)/g;
      let matched;
      const params = {};
      while (!!(matched = reg.exec(content))) {
        params[matched[1]] = matched[2];
      }

      if (params.modeName) {
        makeGridMode(params.modeName);
      } else {
        makeGrid(params);
      }
    }
  }

  flexible.makeGrid = makeGrid;
  flexible.makeGridMode = makeGridMode;
})(window, window.lib || (window.lib = {}));
