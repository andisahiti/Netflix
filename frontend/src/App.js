import * as actions from './store/action/index'
import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
const Login = React.lazy(() => import('./containers/Login/Login'))
const Main = React.lazy(() => import('./containers/MainPage/MainPage'))

const App = props => {


  const { autoLogin } = props

  useEffect(() => {
    autoLogin();

  }, [autoLogin])



  let authRedirect = <Route path='/' render={() => {
    return (<Suspense fallback={<div>...Loading</div>}>
      <Login></Login>
    </Suspense>)
  }}></Route>;
  if (props.isAuthenticated) {
    authRedirect = <Switch>
      <Route path='/main' exact render={() => {
        return (<Suspense fallback={<div>...Loading</div>}>
          <Main></Main>
        </Suspense>)
      }}></Route>

      <Route exact path='/' render={() => {
        return (<Suspense fallback={<div>...Loading</div>}>
          <Login></Login>
        </Suspense>)
      }}></Route>
      <Route exact render={() => <h1>Error:404 Page Not Found</h1>}></Route>
    </Switch>
  }

  return (
    <div>

      {authRedirect}

    </div>
  );

}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.login.token !== null

  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
