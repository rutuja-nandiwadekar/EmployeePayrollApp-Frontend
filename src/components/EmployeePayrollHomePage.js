import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./EmployeePayrollHomePage.css";
import EmployeePayrollService from "../service/EmployeePayrollService";

import img1 from "../assets/delete.svg";
import img2 from "../assets/edit.svg";

export default function EmployeePayrollHomePage(props) {
  let [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeeApi();
  });

  let fetchEmployeeApi = () => {
    EmployeePayrollService.getAllEmployee().then((response) => {
      const employee = response.data.data;
      setEmployees(employee);
    });
  };

  let deleteEmployee = (id) => {
    const value = parseInt(id);
    EmployeePayrollService.delete(value);
    fetchEmployeeApi();
  };

  let updateEmployee = (employeeId) => {
    props.history.push({
      pathname: "/payroll-form/",
      state: employeeId,
    });
    console.log(employeeId);
  };

  return (
    <div>
      <header className="header-content header">

        {/* HEADER */}

        <div className="logo-content">
          <img src="/logo.PNG" alt="myLogo" />
          <div>
            <span className="emp-text">EMPLOYEE</span>
            <br />
            <span className="emp-text emp-payroll">PAYROLL</span>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="header-content">
          <div className="emp-detail-text"> Employee Details <div className="emp-count"></div> </div>

          <Link to="/payroll-form" className="add-button"> {" "} +Add Emp </Link>
        </div>{" "}
      </div>

      <div className="table-main">
        <table id="table-display" className="table">
          <thead>
            <tr>
              <th>Emp Id</th>
              <th>Profile image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee.employeeId}>
                  <td>{employee.employeeId}</td>
                  <td>
                    <img src={employee.profilePic} alt="" />
                  </td>
                  <td>{employee.name} </td>
                  <td>{employee.gender} </td>
                  <td>
                    {employee.departments.map((dep) => (
                      <div className="dept-label">{dep}</div>
                    ))}
                  </td>
                  <td>{employee.salary} </td>
                  <td>{employee.startDate} </td>
                  <td>
                    <img
                      name={employee.employeeId}
                      src={img1}
                      alt="delete"
                      onClick={() => deleteEmployee(employee.employeeId)}
                    />
                    <img
                      name={employee.employeeId}
                      src={img2}
                      alt="edit"
                      onClick={() => updateEmployee(employee.employeeId)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
