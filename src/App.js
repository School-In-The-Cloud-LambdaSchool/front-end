import { Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './views/login/Login';
import Register from './views/register/Register';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>

        <Route exact path='/login'>
          <Login />
        </Route>

        <Route path='/register'>
          <Register />
        </Route>

        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
