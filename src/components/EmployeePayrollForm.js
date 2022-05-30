import React from "react";
import "./EmployeePayrollForm.css";
import EmployeePayrollService from "../service/EmployeePayrollService";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import Pic1 from "../assets/Eclipse-1.PNG";
import Pic2 from "../assets/Eclipse-2.PNG";
import Pic3 from "../assets/Eclipse-3.PNG";
import Pic4 from "../assets/Eclipse-4.PNG";


export default function EmployeePayrollForm(props) {
  const [nameRegexError, setNameRegexError] = useState("");
  const allDepartment = ["HR", "Sales", "Finance", "Engineer", "Others"];


  let [userDetails, setUserDetails] = useState({
    name: "",
    profile: "",
    gender: "",
    departments: [],
    salary: "",
    startDate: "",
    notes: "",
    empId: "",
    isUpdate: false,
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({ ...userDetails, [name]: value });
    console.log(userDetails);
  };

  const saveEmployee = (event) => {
    event.preventDefault();
    let employee = {
      employeeId: "",
      name: userDetails.name,
      salary: userDetails.salary,
      gender: userDetails.gender,
      startDate: userDetails.startDate,
      note: userDetails.notes,
      profilePic: userDetails.profile,
      departments: userDetails.departments,
    };

    if (userDetails.isUpdate) {
      EmployeePayrollService.updateEmployee(value, employee).then((response) => {
        console.log("updated" + response)
        props.history.push({
          pathname: "/home"
        })
      })
    } else {
      EmployeePayrollService.addEmployee(employee).then((response) => {
        console.log(response);
        props.history.push({
          pathname: "/home/",
        });
      });
    }
  };

  const reset = (event) => {
    event.preventDefault();
    setUserDetails({
      name: "",
      profile: "",
      gender: "",
      departments: [],
      salary: "",
      startDate: "",
      notes: "",
      empId: "",
    });
  };


  const onCheckChange = (name) => {
    let index = userDetails.departments.indexOf(name);

    let checkArray = [...userDetails.departments];

    if (index > -1) checkArray.splice(index, 1);
    else checkArray.push(name);

    setUserDetails({ ...userDetails, departments: checkArray });
  };

  const getChecked = (name) => {
    return (
      userDetails.departments &&
      userDetails.departments.includes(name)
    );
  };

  const value = props.location.state;
  useEffect(() => {
    if (value) {
      getDataById(value);
    }
  }, []);

  const getDataById = (id) => {
    console.log("method is calling")
    EmployeePayrollService.getEmployeeById(id).then((response) => {
      setUserDetails({
        ...userDetails,
        ...response,
        name: response.data.data.name,
        profile: response.data.data.profile,
        gender: response.data.data.gender,
        departments: response.data.data.departments,
        salary: response.data.data.salary,
        startDate: response.data.data.startDate,
        notes: response.data.data.note,
        isUpdate: true,
      });
    });
  };


  function nameValidationHandler(event) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(event.target.value)) {
      setNameRegexError("");
    } else {
      setNameRegexError("Name is incorrect");
    }
  }

  return (
    <div>

      {/* HEADER */}

      <header className="header-content header">
        <div className="logo-content">

          <img className="logo-content-img" src="/logo.PNG" alt="" />

          <div>
            <span className="emp-text">EMPLOYEE</span>
            <br />
            <span className="emp-text emp-payroll">PAYROLL</span>
          </div>
        </div>
      </header>

      <div id="formId" className="form-content">

        <form className="form" action="#" onSubmit={(event) => { saveEmployee(event); }} onReset={(event) => { reset(event); }} >

          <div className="form-head">Employee Payroll Form</div>

          {/* NAME */}

          <div className="row-content">
            <label className="label text" htmlFor="name"> Name{" "} </label>
            <input className="input" type="text" id="name" name="name" placeholder="Enter your name" required
              value={userDetails.name}
              onChange={(event) => {
                nameValidationHandler(event);
                handleInput(event);
              }}
            /> {nameRegexError}
            <error-output className="text-error" htmlFor="text" />
          </div>


          {/* PROFILE IMAGE */}

          <div className="row-content">
            <label className="label text" htmlFor="profile"> Profile image </label>

            <div className="profile-radio-content">
              <label>
                <input type="radio" id="profile1" name="profile" defaultValue={Pic1} required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img className="profile" id="image1" src={Pic1} alt="#" />
              </label>

              <label>
                <input type="radio" id="profile2" name="profile" defaultValue={Pic2} required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img className="profile" id="image2" src={Pic2} alt="#" />
              </label>

              <label>
                <input type="radio" id="profile3" name="profile" defaultValue={Pic3} required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img className="profile" id="image3" src={Pic3} alt="#" />
              </label>

              <label>
                <input type="radio" id="profile4" name="profile" defaultValue={Pic4} required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img className="profile" id="image4" src={Pic4} alt="#" />
              </label>
            </div>
          </div>



          {/* GENDER */}
          <div className="row-content">
            <label className="label text" htmlFor="gender"> Gender </label>

            <div>
              <input type="radio" id="male" name="gender" defaultValue="male"
                checked={userDetails.gender === "male"}
                onChange={(event) => {
                  handleInput(event);
                }}
              />
              <label className="text" htmlFor="male"> Male </label>

              <input type="radio" id="female" name="gender" defaultValue="female"
                checked={userDetails.gender === "female"}
                onChange={(event) => {
                  handleInput(event);
                }}
              />
              <label className="text" htmlFor="female"> Female </label>
            </div>

          </div>

          {/* DEPARTMENT */}

          <div className="row-content">
            <label className="label text" htmlFor="department"> Department</label>

            <div className="label">
              {allDepartment.map((item) => (
                <span key={item}>
                  <input className="checkbox" type="checkbox" name={item} checked={getChecked(item)} value={item}
                    onChange={() => onCheckChange(item)}
                  />
                  <label className="text" htmlFor={item}> {item} </label>
                </span>
              ))}
            </div>

          </div>

          {/* SALARY */}

          <div className="row-content">
            <label className="label text" htmlFor="salary"> Salary {" "} </label>
            <input className="input" id="salary" type="range" name="salary" min={300000} max={500000} step={100}
              defaultValue={userDetails.salary}
              onChange={(event) => {
                handleInput(event);
              }}
            />
            <output className="salary-output text" htmlFor="salary"> {userDetails.salary} </output>
          </div>

          {/* DATE */}

          <div className="row-content">
            <label className="text label" htmlFor="startDate"> Start Date </label>

            <input id="startDate" type="date" className="input" value={userDetails.startDate} name="startDate"
              onChange={(event) => {
                handleInput(event);
              }}
            />
          </div>

          {/* NOTE */}

          <div className="row-content">

            <label className="label text" htmlFor="notes"> Notes </label>

            <textarea id="notes" className="input" name="notes" placeholder="Add notes" style={{ height: "100px" }}
              defaultValue={userDetails.notes}
              onChange={(event) => {
                handleInput(event);
              }}
            />
          </div>

          {/* BUTTONS */}

          <div className="buttonParent">
            <Link to="/home" className="resetButton button cancelButton"> Cancel </Link>

            <div className="submit-reset">
              <button type="submit" className="button submitButton" id="submitButton" >
                {userDetails.isUpdate ? "Update" : "Submit"}
              </button>
              <button type="reset" className="button resetButton" id="resetButton" > Reset </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
