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
import Volunteers from './views/students/Volunteers';

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

        <PrivateRoute exact path='/admin/:volunteerId/students' component={AdminStudents} />
        <PrivateRoute exact path='/admin/add-task/:studentId/:volunteerId' component={TaskPage} />
        <PrivateRoute exact path='/admin' component={AdminDashboard} />
        <PrivateRoute exact path='/volunteer/:volunteerId' component={VolunteerDashboard} />
        <PrivateRoute exact path='/student/update-volunteer/:studentId' component={Volunteers} />
        <PrivateRoute exact path='/student/:studentId' component={StudentDashboard} />

        <Route exact path='/'>
          <Home />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
