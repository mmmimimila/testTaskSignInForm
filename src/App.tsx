import React from 'react';
import SignIn from './components/SignIn';
import DevicesList from './components/DevicesList';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login"/>
        <Route exact path="/login" component={() => <SignIn/>}/>
        <Route exact path="/devicesList" component={() => <DevicesList/>}/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
