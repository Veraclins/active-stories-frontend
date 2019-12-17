import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalStyles from 'styles/globals';
import { themes } from 'styles';
import Loader from 'components/Loader';
import Navbar from 'components/Navbar';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const CreateStory = lazy(() => import('pages/CreateStory'));

const routes = (
  <React.Fragment>
    <GlobalStyles />
    <Navbar theme={themes.default} />
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/create-story" exact={true}>
          <CreateStory />
        </Route>
      </Switch>
    </Suspense>
  </React.Fragment>
);

export default routes;
