import { AuthProvider } from './context/authContext';
import Signup from './components/Authentication/Signup';

function App() {
  return (
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
}

export default App;
