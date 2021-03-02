import { Route, Switch } from 'react-router-dom';
import './App.css';
// import PrivateRoute from './utils/PrivateRoute';

// Components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './views/login/Login';
import Register from './views/register/Register';
// import AdminDashboard from './views/admin/AdminDashboard';
// import AdminAddTask from './views/admin/AdminAddTask';
// import AdminEditTask from './views/admin/AdminEditTask';
// import VolunteerDashboard from './views/volunteers/VolunteerDashboard';
// import StudentDashboard from './views/students/StudentDashboard';
// import AdminStudents from './views/admin/AdminStudents';

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

        {/* <PrivateRoute path='/admin/create-task' component={AdminAddTask} />
        <PrivateRoute path='/admin/edit-task' component={AdminEditTask} />
        <PrivateRoute path='/admin/students' component={AdminStudents} />
        <PrivateRoute path='/admin/' component={AdminDashboard} />
        <PrivateRoute path='/volunteer/:volunteerId' component={VolunteerDashboard} />
        <PrivateRoute path='/student/:studentId' component={StudentDashboard} /> */}

        <Route exact path='/'>
          <Home />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
