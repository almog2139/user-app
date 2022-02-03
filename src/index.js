
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { HashRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';



window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event has fired')
  e.prompt()
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
    <Router>
            <App />
        </Router>
  
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.register();



