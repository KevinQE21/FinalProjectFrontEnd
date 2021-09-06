import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { AuthProvider } from './context/authContext';

import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Dashboard from './components/DashBoard/DashBoard';
import Profile from './components/Profile/Profile';
import PrivateRoute from './context/PrivateRoute';
import UpdateEmail from './components/Profile/UpdateEmail';
import UpdatePassword from './components/Profile/UpdatePassword';

function App() {

  return ( 
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Dashboard } />
          <PrivateRoute exact path="/profile" component={ Profile } />
          <PrivateRoute exact path="/update-email" component={ UpdateEmail } />  
          <PrivateRoute exact path="/update-password" component={ UpdatePassword } />                    
          <Route path="/signup" component={ Signup } />
          <Route exact path="/login" component={ Login } />
          <Route path="/forgot-password" component={ ForgotPassword } />
        </Switch>                  
      </Router>      
    </AuthProvider>    
  );
}

export default App;
