import React from 'react';
import SignIn from './components/SignIn';
import DevicesList from './components/DevicesList';
import {BrowserRouter, Switch, Route} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={() => <SignIn/>}/>
        <Route path="/devicesList" component={() => <DevicesList/>}/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
