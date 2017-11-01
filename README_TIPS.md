## mm_v2.0
morningmeeting v2.0 version upgrade transform

## 一.项目打包的dist目录需要注意
1、APP.js 文件需要修改 serverApi为正式环境  
2、config文件中的 BaseName和BuildPath要保持一致  
```
app: {
BaseName: '/moriningmeeting/',
BuildPath: '/dist/moriningmeeting',
}
```
3、index.html 文件中的gocom.js文件引入需要修改  
```
< script src= "http://172.20.95.91:9910/js/gocom.js" ></script >
<script src="moriningmeeting/gocom.js"></script>
```
4、一个页面就会打包成一个js文件，缩小了打包后的文件的大小    
5、  

## 二、组件要扩展
1.比如弹窗或者提示组件的扩展，可以在Utility里面添加参数 options  
2.组件的写法没变  

## 三、容器组件
1、index中的要注意：一个文件夹下面一个容器（页面），名字尽量和文件夹保持一致    
```
import MMList from 'containers/MMList/MMList';  
```
2、生产环境下使用懒加载方法  
3、在App.js里面可以设置页面的滚动位置的初始化（给div监听事件来设置页面的位置）  
```
const { divApp } = this.refs;
divApp.addEventListener('scroll', this.handleScroll.bind(this));
```
页面离开时再移除监听事件    
```
divApp.removeEventListener('scroll', this.handleScroll.bind(this));
```
例如：在MMCalendarList列表页面跳转到MMCalendar页面，在componentDidMount生命周期里面要清除位置  
```
Utility.$onClearPagePosition([MMCalendar]);  
```
4、app.js文件里面要设置标志位IsSwitchOpen  
```
self.state.IsSwitchOpen = false;
setTimeout(() => {
self.state.IsSwitchOpen = true;
self.UpdatePagePosition();
}, 1000);
```
5.CSSTransitionGroup 组织页面的过渡切换  
6.以前Navbar里面做的事件监听还有弹框提示，统一在app.js里面处理了  

## 四、ApiClient.js
1、在config文件里面同意配置了请求路径（meeting）： serverApi: 'http://172.20.95.41:11504/meeting',  
2、在API里面初始化接口路径的时候这样写 / meeting / contents => MeetingList: '/contents',  
3、在这里面统一处理后台url的参数 request.query(_p);  
4、错误提示： __ProcessError 成功提示： __SendRequest  

## 五、redux
1、中间件： action操作的promise请求处理 types 根据结果来响应reduxCommon的action.type  
2、reduxCommon里面是管理reducer，封装了get，post等请求 最后处理props是List还是content  

## 六、路由
1、Bundle来监听页面有没有找到  
2、router4 中心的组织方式  
```
< Route exact path= "/" component= { CreateComponent(MMList) } /> -设置首页
< Route path= "/home" component= { CreateComponent(Home) } />
<Route path="/default" component={CreateComponent(Default)} /> - 设置默认页面
```

## 七、flexible
1、flexible实现了不同屏幕的适配问题  
2、栅格布局暂时不用  

## 八、项目入口文件index.html index.js  
1、gocomjs的引入，如果正式环境部署需要修改路径 < script src= "http://172.20.95.91:9910/js/gocom.js" ></script >  
2.index.js实现热更新和路由的配置 document.getElementById('app')  

## 九、webpack3
1、公共的处理在conmon里面 rules test: /\.js|jsx$/, 尽量写js jsx有问题  
2、alias 修改文件的引入别名，解决引入过多的层级  
styles: path.join(APP_PATH, 'src/styles'),  
3、plugins 插件，有特别注意的地方  
```
plugins: [
new HtmlWebpackPlugin({
filename: 'index.html', // 文件名字
template: path.join(APP_PATH, 'src/index.html') // 模板
}),
new webpack.HashedModuleIdsPlugin(),
new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', }),
new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }), // runtime以及vendor的顺序关系很重要要。
],
```
4、dev文件中设置端口可host，还有mergeCfg 合并公共部分和开发部分（CommCfg, devConfig）  
```
devServer: {
port: AppCfg.port || 20000,
historyApiFallback: { index: AppCfg.app.BaseName },
host: '0.0.0.0'
},
```

## 十、babel
```
{
"presets": [
"react",
"es2015",
"stage-0"
],
"plugins": [
"react-hot-loader/babel",
"transform-decorators-legacy",
"transform-runtime"
]
}
```

## 十一、eslint
1、添加一些非法报错  
```
"no-var": "error", // 禁用var变量
"no-lonely-if": 0
```

## 十二、。ignore
```
.history /
dist /
node_modules /
```

## 十三、package.json
1.npm 命令 生产环境和开发环境
```
"betterScripts": {
"start-dev": {
"command": "webpack-dev-server --config webpack/dev.config.js --color --progress --hot",
"env": {
"NODE_ENV": "development"
}
},
"start-prod": {
"command": "webpack --config webpack/prod.config.js",
"env": {
"NODE_ENV": "production"
}
}
```

## 十四 READE.me

### 安装
``` bash
npm install
或者
yarn install // 安装npm包尽量用这个
```

### 运行开发环境
``` base
npm run dev
```

起来在浏览器上输入：http://127.0.0.1:20000/react； /react这个是可以在config.js里进行配置，这个就是route basename。

### 项目打包
``` base
npm run build
```

项目打包后，会在项目根目录里生成 dist/ www目录，拿到这个就可以进行部署了。
