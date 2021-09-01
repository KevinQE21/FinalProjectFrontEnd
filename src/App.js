import { AuthProvider } from './context/authContext';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import ForgotPassword from './components/Authentication/ForgotPassword'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/DashBoard/DashBoard';

function App() {
  return ( 
    <AuthProvider>
      <Router>
        <Route path="/" component={ Dashboard } />
        <Route path="/signup" component={ Signup } />
        <Route path="/login" component={ Login } />
        <Route path="/forgot-password" component={ ForgotPassword } />
      </Router>      
    </AuthProvider>    
  );
}

export default App;
