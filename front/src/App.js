import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Vehicles from './Vehicles';

const App = () => {
  return (
    <div className='app-routes'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/vehicles' component={Vehicles} />
          <Route render={() => <h1>404 Pagina não encontrada</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
