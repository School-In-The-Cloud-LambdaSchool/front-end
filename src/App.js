import { Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';

// Components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './views/login/Login';
import Register from './views/register/Register';
import AdminDashboard from './views/admin/AdminDashboard';
import VolunteerDashboard from './views/volunteers/VolunteerDashboard';
import StudentDashboard from './views/students/StudentDashboard';
import AdminStudents from './views/admin/AdminStudents';
import TaskPage from './views/admin/TaskPage';

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

        <PrivateRoute path='/admin/:volunteerId/students' component={AdminStudents} />
        <PrivateRoute path='/admin/add-task/:studentId' component={TaskPage} />
        <PrivateRoute path='/admin' component={AdminDashboard} />
        <PrivateRoute path='/volunteer/:volunteerId' component={VolunteerDashboard} />
        <PrivateRoute path='/student/:studentId' component={StudentDashboard} />

        <Route exact path='/'>
          <Home />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
