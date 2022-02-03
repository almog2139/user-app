
import './assets/styles/styles.scss'
import { Switch, Route } from 'react-router-dom';
import {routes} from './routes.js'
import { UserApp } from './pages/UserApp';

import { UserDetails } from './pages/UserDetails';
import { UserEdit } from './pages/UserEdit';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/user/edit/:id?" component={ UserEdit } />
        <Route path="/user/:id" component={ UserDetails } />
        <Route path="/" component={ UserApp } />
      </Switch>

    </div>
  );
}

export default App;
