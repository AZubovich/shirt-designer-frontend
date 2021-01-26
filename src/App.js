import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Shirts from './pages/Shirts';
import Designer from './pages/Designer';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Shirts />
        </Route>
        <Route exact path="/designer">
          <Designer /> 
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
