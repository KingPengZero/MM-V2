import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import pageComponent from 'containers';
const {
  App, MMCalendar, MMCalendarList, Default, AddWorkContent, WorkContentDetail, Home, MMSetting, MMEdit, MMList, ExecutivePeople
} = pageComponent;
const AppCfg = require('../config');
const { isProduction } = AppCfg;

import Bundle from './Bundle';
const Loading = () => {
  return <div>Loading...</div>;
};
const CreateComponent = (component) => () => (
  <Bundle load={component} isProduction={isProduction}>
    {(Component) => Component ?
      <Component /> : <Loading />}
  </Bundle>
);

const getRouters = () => (
  <Router basename={AppCfg.app.BaseName}>
    <App>
      <Route exact path="/mmlist" component={CreateComponent(MMList)} />
      <Route path="/home" component={CreateComponent(Home)} />
      <Route path="/default" component={CreateComponent(Default)} />
      <Route path="/addworkcontent" component={CreateComponent(AddWorkContent)} />
      <Route path="/workcontentdetail" component={CreateComponent(WorkContentDetail)} />
      <Route path="/mmcalendar" component={CreateComponent(MMCalendar)} />
      <Route path="/mmcalendarlist" component={CreateComponent(MMCalendarList)} />
      <Route path="/mmsetting" component={CreateComponent(MMSetting)} />
      <Route path="/mmedit" component={CreateComponent(MMEdit)} />
      <Route path="/mmlist" component={CreateComponent(MMList)} />
      <Route path="/executivepeople" component={CreateComponent(ExecutivePeople)} />
    </App>
  </Router>
);

export default getRouters;
