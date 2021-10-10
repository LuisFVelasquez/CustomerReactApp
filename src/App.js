import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login'
import User from './components/User/User';
import Reset from './components/Reset/Reset';
import Register from './components/Register/Register';
import PaginaNoEncontrada from './components/PaginaNoEncontrada/PaginaNoEncontrada';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {

  return (
    <BrowserRouter>
    <div>
      <Header />
      <hr />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/users" component={User} />
        <Route component={PaginaNoEncontrada} />
      </Switch>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
