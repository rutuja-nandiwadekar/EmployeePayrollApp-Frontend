import './App.css';
import EmployeePayrollForm from './components/EmployeePayrollForm';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmployeePayrollHomePage from './components/EmployeePayrollHomePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/payroll-form' component={EmployeePayrollForm}></Route>
          <Route path='/' component={EmployeePayrollHomePage}></Route>
          <Route path='/home' component={EmployeePayrollHomePage}></Route>
          <Route exact path="/payroll-form/:id" component={EmployeePayrollForm}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
