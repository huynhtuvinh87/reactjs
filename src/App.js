import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from './components/About';
import CategoryList from './components/category/CategoryList';
import CategoryCreate from './components/category/CategoryCreate';
import CategoryUpdate from './components/category/CategoryUpdate';
import Contact from './components/Contact';
import EmployeeUpdate from './components/employee/EmployeeUpdate';
import Home from './components/Home';
import Menu from './components/Menu';
import UserCreate from './components/user/UserCreate';
import UserList from './components/user/UserList';
import UserUpdate from './components/user/UserUpdate';
import UserView from './components/user/UserView';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu></Menu>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path={`/page/:page`} component={Home} />
            <Route exact path='/users' component={UserList} />
            <Route exact path='/users/page/:page' component={UserList} />
            <Route exact path={`/user/create`} component={UserCreate} />
            <Route exact path='/user/:id' component={UserView} />

            <Route exact path={`/user/update/:id`} component={UserUpdate} />
            <Route
              exact
              path={`/employee/update/:id`}
              component={EmployeeUpdate}
            />
            <Route exact path='/categories' component={CategoryList} />
            <Route exact path='/category/create' component={CategoryCreate} />
            <Route exact path={`/category/update/:id`} component={CategoryUpdate} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
