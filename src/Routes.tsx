import React, {
  ReactElement,
} from 'react';
import {
  Route,
  Switch,
} from 'react-router-native';
import Album from './screens/Album';
import Landing from './screens/Landing';

const Routes = (): ReactElement => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/album" component={Album} />
  </Switch>
);

export default Routes;
