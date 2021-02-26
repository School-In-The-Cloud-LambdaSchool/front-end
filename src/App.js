import { Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path='/login'>
          {/* <Login /> */}
        </Route>

        <Route path='/register'>
          {/* <Register /> */}
        </Route>

        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
