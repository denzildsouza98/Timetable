import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import myData from "../data.json";

class Input extends Component {
  constructor(props) {
    super();
    this.state = myData;
    this.state.showModal = false;
    this.onDaysHandler = this.onDaysHandler.bind(this);
    this.onHoursHandler = this.onHoursHandler.bind(this);
    this.onRoomsHandler = this.onRoomsHandler.bind(this);
    this.onCoursesHandler = this.onCoursesHandler.bind(this);
    this.onStudentGroupsHandler = this.onStudentGroupsHandler.bind(this);
    this.onLecturersHandler = this.onLecturersHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onDaysHandler(event) {
    console.log(event.target);
    if (event.target.id == "add") {
      let temp_days = this.state.days;
      temp_days[temp_days.length] = "";
      this.setState({
        days: temp_days,
      });
    } else if (event.target.className == "day") {
      let temp_days = this.state.days;
      for (let i = 0; i < temp_days.length; i++) {
        console.log(i == event.target.id);
        if (i == event.target.id) {
          console.log("Here");
          temp_days[i] = event.target.value;
          break;
        }
      }
      this.setState({
        day: temp_days,
      });
    } else if (event.target.id == "del") {
      this.setState({
        days: this.state.days.slice(0, this.state.days.length - 1),
      });
    }
  }
  onHoursHandler(event) {
    console.log(event.target);
    if (event.target.id == "add") {
      let temp_hours = this.state.hours;
      temp_hours[temp_hours.length] = { name: "", status: true };
      this.setState({
        hours: temp_hours,
      });
    } else if (event.target.className == "hour") {
      let temp_hours = this.state.hours;
      for (let i = 0; i < temp_hours.length; i++) {
        console.log(i == event.target.id);
        if (i == event.target.id) {
          console.log("Here");
          temp_hours[i].name = event.target.value;
          break;
        }
      }
      this.setState({
        hours: temp_hours,
      });
    } else if (event.target.className == "checkbox") {
      let temp_hours = this.state.hours;
      for (let i = 0; i < temp_hours.length; i++) {
        console.log(i == event.target.id);
        if (i == event.target.id) {
          console.log("Here");
          temp_hours[i].status = !temp_hours[i].status;
          break;
        }
      }
      this.setState({
        hours: temp_hours,
      });
    } else if (event.target.id == "del") {
      this.setState({
        hours: this.state.hours.slice(0, this.state.hours.length - 1),
      });
    }
  }
  onRoomsHandler(event) {
    console.log(event.target);
    if (event.target.id == "add") {
      let temp_rooms = this.state.rooms;
      temp_rooms[temp_rooms.length] = "";
      this.setState({
        rooms: temp_rooms,
      });
    } else if (event.target.className == "room") {
      let temp_rooms = this.state.rooms;
      for (let i = 0; i < temp_rooms.length; i++) {
        console.log(i == event.target.id);
        if (i == event.target.id) {
          console.log("Here");
          temp_rooms[i] = event.target.value;
          break;
        }
      }
      this.setState({
        rooms: temp_rooms,
      });
    } else if (event.target.id == "del") {
      this.setState({
        rooms: this.state.rooms.slice(0, this.state.rooms.length - 1),
      });
    }
  }
  onStudentGroupsHandler(event) {
    console.log(event.target);
    if (event.target.id == "add") {
      let temp_student_groups = this.state.student_groups;
      temp_student_groups[temp_student_groups.length] = {
        name: "",
        courses: [""],
      };
      this.setState({
        student_groups: temp_student_groups,
      });
    } else if (event.target.id == "del") {
      this.setState({
        student_groups: this.state.student_groups.slice(
          0,
          this.state.student_groups.length - 1
        ),
      });
    } else if (event.target.id.split(" ")[0] === "add") {
      let temp_student_groups = this.state.student_groups;
      for (let i = 0; i < temp_student_groups.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          console.log("Here");
          temp_student_groups[i]["courses"][
            temp_student_groups[i]["courses"].length
          ] = "";
          break;
        }
      }
      this.setState({
        student_groups: temp_student_groups,
      });
    }
    //Delete Last room of Course
    else if (event.target.id.split(" ")[0] === "del") {
      let temp_student_groups = this.state.student_groups;
      for (let i = 0; i < temp_student_groups.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          temp_student_groups[i]["courses"] = temp_student_groups[i][
            "courses"
          ].slice(0, temp_student_groups[i]["courses"].length - 1);
          break;
        }
      }
      this.setState({
        student_groups: temp_student_groups,
      });
    } else if (event.target.className == "student_grp") {
      let temp_student_groups = this.state.student_groups;
      for (let i = 0; i < temp_student_groups.length; i++) {
        if (i == event.target.id) {
          temp_student_groups[i]["name"] = event.target.value;
          break;
        }
      }
      this.setState({
        student_groups: temp_student_groups,
      });
    } else if (event.target.id.split(" ")[0] === "student_grp") {
      let temp_student_groups = this.state.student_groups;
      for (let i = 0; i < temp_student_groups.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          for (let j = 0; j < temp_student_groups[i]["courses"].length; j++) {
            if (j == event.target.id.split(" ")[2]) {
              temp_student_groups[i]["courses"][j] = event.target.value;
              break;
            }
          }
          break;
        }
      }
      this.setState({
        student_groups: temp_student_groups,
      });
    }
  }
  onCoursesHandler(event) {
    console.log(event.target);
    // Add new Course
    if (event.target.id == "add") {
      let temp_courses = this.state.courses;
      temp_courses[temp_courses.length] = {
        course_id: "",
        course_name: "",
        no_of_hours_to_schedule_when_assigning: "",
        max_no_hours_per_day: "",
        no_hours_per_week: "",
        max_consecutive_hours_per_day: "",
        valid_rooms: [""],
      };
      this.setState({
        courses: temp_courses,
      });
    }
    // Delete Last Course
    else if (event.target.id == "del") {
      this.setState({
        courses: this.state.courses.slice(0, this.state.courses.length - 1),
      });
    }
    //Add New rooms to Course
    else if (event.target.id.split(" ")[0] === "add") {
      let temp_courses = this.state.courses;
      for (let i = 0; i < temp_courses.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          console.log("Here");
          temp_courses[i]["valid_rooms"][
            temp_courses[i]["valid_rooms"].length
          ] = "";
          break;
        }
      }
      this.setState({
        courses: temp_courses,
      });
    }
    //Delete Last room of Course
    else if (event.target.id.split(" ")[0] === "del") {
      let temp_courses = this.state.courses;
      for (let i = 0; i < temp_courses.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          temp_courses[i]["valid_rooms"] = temp_courses[i]["valid_rooms"].slice(
            0,
            temp_courses[i]["valid_rooms"].length - 1
          );
          break;
        }
      }
      this.setState({
        courses: temp_courses,
      });
    }
    // Edit Valid Room Details
    else if (event.target.id.split(" ")[0] === "room") {
      let temp_courses = this.state.courses;
      for (let i = 0; i < temp_courses.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          for (let j = 0; j < temp_courses[i]["valid_rooms"].length; j++) {
            if (j == event.target.id.split(" ")[2]) {
              temp_courses[i]["valid_rooms"][j] = event.target.value;
              break;
            }
          }
          break;
        }
      }
      this.setState({
        courses: temp_courses,
      });
    }
    // Edit other properties
    else {
      let temp_courses = this.state.courses;
      for (let i = 0; i < temp_courses.length; i++) {
        if (i == event.target.id) {
          temp_courses[i][event.target.className] = event.target.value;
          break;
        }
      }
      this.setState({
        courses: temp_courses,
      });
    }
  }
  onLecturersHandler(event) {
    console.log(event.target);
    // Add new Lecturer
    if (event.target.id == "add") {
      let temp_lecturers = this.state.lecturers;
      temp_lecturers[temp_lecturers.length] = {
        name: "",
        department: "",
        max_no_hours_per_day: "",
        max_no_hours_per_week: "",
        max_consecutive_hours: "",
        rank: "",
        Availabilty_slots: "",
        courses: [""],
      };
      this.setState({
        lecturers: temp_lecturers,
      });
    }
    // Delete Last Lecturer
    else if (event.target.id == "del") {
      this.setState({
        lecturers: this.state.lecturers.slice(
          0,
          this.state.lecturers.length - 1
        ),
      });
    }
    //Add New Course to Leturer
    else if (event.target.id.split(" ")[0] === "add") {
      let temp_lecturers = this.state.lecturers;
      for (let i = 0; i < temp_lecturers.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          console.log("Here");
          temp_lecturers[i]["courses"][temp_lecturers[i]["courses"].length] =
            "";
          break;
        }
      }
      this.setState({
        lecturers: temp_lecturers,
      });
    }
    //Delete Last Course of Lecturer
    else if (event.target.id.split(" ")[0] === "del") {
      let temp_lecturers = this.state.lecturers;
      for (let i = 0; i < temp_lecturers.length; i++) {
        if (i == event.target.id.split(" ")[1]) {
          temp_lecturers[i]["courses"] = temp_lecturers[i]["courses"].slice(
            0,
            temp_lecturers[i]["courses"].length - 1
          );
          break;
        }
      }
      this.setState({
        lecturers: temp_lecturers,
      });
    }
    // Edit Valid Course Details
    else if (event.target.id.split(" ")[0] === "lecturer") {
      let temp_lecturers = this.state.lecturers;
      for (let i = 0; i < temp_lecturers.length; i++) {
        if (i == event.target.id.split(" ")[2]) {
          for (let j = 0; j < temp_lecturers[i]["courses"].length; j++) {
            if (j == event.target.id.split(" ")[3]) {
              if (event.target.id.split(" ")[1] == "course") {
                temp_lecturers[i]["courses"][j] =
                  event.target.value +
                  " " +
                  temp_lecturers[i]["courses"][j].split(" ")[1];
              } else {
                temp_lecturers[i]["courses"][j] =
                  temp_lecturers[i]["courses"][j].split(" ")[0] +
                  " " +
                  event.target.value;
              }
              break;
            }
          }
          break;
        }
      }
      this.setState({
        lecturers: temp_lecturers,
      });
    }
    // Edit other properties
    else {
      let temp_lecturers = this.state.lecturers;
      for (let i = 0; i < temp_lecturers.length; i++) {
        if (i == event.target.id) {
          temp_lecturers[i][event.target.className] = event.target.value;
          break;
        }
      }
      this.setState({
        lecturers: temp_lecturers,
      });
    }
  }
  onSubmitHandler() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  render() {
    return (
      <div style={{ padding: "5%" }}>
        <h1 style={{ marginRight: "70%" }}>Enter Details</h1>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row style={{ border: "#ff2e63 solid", margin: "5%" }}>
            <Col
              sm={3}
              style={{ borderRight: "#ff2e63 solid", padding: "2.5%" }}
            >
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Days</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Hours</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Rooms</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">Course Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Student Group Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sixth">Lecturer Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="seventh">
                    Population Size and No. of Generations
                  </Nav.Link>
                </Nav.Item>
                <Button variant="success" onClick={this.onSubmitHandler}>
                  Submit
                </Button>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <h3>Enter Days</h3>
                  {this.state.days.map((day, key) => (
                    <div style={{ padding: "2.5%" }}>
                      <h4>Day {key + 1}:</h4>
                      <input
                        class="day"
                        placeholder="Enter Day..."
                        id={key}
                        value={day}
                        onChange={this.onDaysHandler}
                      ></input>
                      <br></br>
                    </div>
                  ))}
                  <Button
                    variant="primary"
                    onClick={this.onDaysHandler}
                    id="add"
                  >
                    Add
                  </Button>
                  <Button
                    variant="danger"
                    onClick={this.onDaysHandler}
                    id="del"
                  >
                    Delete
                  </Button>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h3>Enter Hours</h3>
                  {this.state.hours.map((hour, key) => (
                    <div style={{ padding: "2.5%" }}>
                      <h4>Hour {key + 1}</h4>
                      <input
                        class="hour"
                        placeholder="Enter Hour..."
                        id={key}
                        value={hour.name}
                        onChange={this.onHoursHandler}
                      ></input>
                      <input
                        type="checkbox"
                        checked={hour.status}
                        class="checkbox"
                        id={key}
                        onChange={this.onHoursHandler}
                      ></input>
                      <br></br>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    onClick={this.onHoursHandler}
                    id="add"
                  >
                    Add
                  </Button>
                  <Button
                    variant="danger"
                    onClick={this.onHoursHandler}
                    id="del"
                  >
                    Delete
                  </Button>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h3>Enter Rooms</h3>
                  {this.state.rooms.map((room, key) => (
                    <div style={{ padding: "2.5%" }}>
                      <h4>Room {key + 1}</h4>
                      <input
                        class="room"
                        placeholder="Enter Room..."
                        id={key}
                        value={room}
                        onChange={this.onRoomsHandler}
                      ></input>
                      <br></br>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    onClick={this.onRoomsHandler}
                    id="add"
                  >
                    Add
                  </Button>
                  <Button
                    variant="danger"
                    onClick={this.onRoomsHandler}
                    id="del"
                  >
                    Delete
                  </Button>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  {this.state.student_groups.map((student_group, key) => (
                    <div
                      style={{
                        padding: "2.5%",
                        margin: "2.5%",
                        borderStyle: "double",
                      }}
                    >
                      <h3>Student Group #{key + 1}</h3>
                      <br></br>
                      <label>Enter Student Name:</label>
                      <br></br>
                      <input
                        class="student_grp"
                        id={key}
                        value={student_group.name}
                        onChange={this.onStudentGroupsHandler}
                      ></input>
                      <br></br>
                      <h5>Courses</h5>
                      <br></br>
                      {student_group.courses.map((course, index) => (
                        <div>
                          <select
                            onChange={this.onStudentGroupsHandler}
                            id={"student_grp " + key + " " + index}
                            value={course}
                          >
                            <option value="">Make a selection</option>
                            {this.state.courses.map((aval_course) => (
                              <option value={aval_course.course_id}>
                                {aval_course.course_id}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                      <Button
                        variant="primary"
                        onClick={this.onStudentGroupsHandler}
                        class="room"
                        id={"add " + key}
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        class="room"
                        onClick={this.onStudentGroupsHandler}
                        id={"del " + key}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="primary"
                    onClick={this.onStudentGroupsHandler}
                    id="add"
                  >
                    Add
                  </Button>
                  <Button
                    variant="danger"
                    onClick={this.onStudentGroupsHandler}
                    id="del"
                  >
                    Delete
                  </Button>
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  {this.state.courses.map((course, key) => (
                    <div
                      style={{
                        padding: "2.5%",
                        margin: "2.5%",
                        borderStyle: "double",
                      }}
                    >
                      <h3>Course #{key + 1}</h3>
                      <br></br>
                      <label>Enter Course Id:</label>
                      <br></br>
                      <input
                        class="course_id"
                        id={key}
                        value={course.course_id}
                        onChange={this.onCoursesHandler}
                      ></input>
                      <br></br>
                      <label>Enter Course Name:</label>
                      <br></br>
                      <input
                        class="course_name"
                        id={key}
                        value={course.course_name}
                        onChange={this.onCoursesHandler}
                      ></input>
                      <br></br>
                      <label>
                        Enter Number of Hours to Schedule when Assigning:
                      </label>
                      <br></br>
                      <input
                        class="no_of_hours_to_schedule_when_assigning"
                        id={key}
                        value={course.no_of_hours_to_schedule_when_assigning}
                        onChange={this.onCoursesHandler}
                      ></input>
                      <br></br>
                      <label>Enter Maximum number of hours per day:</label>
                      <br></br>
                      <input
                        class="max_no_hours_per_day"
                        id={key}
                        value={course.max_no_hours_per_day}
                        onChange={this.onCoursesHandler}
                      ></input>
                      <br></br>
                      <label>No of Hours per Week:</label>
                      <br></br>
                      <input
                        class="no_hours_per_week"
                        id={key}
                        value={course.no_hours_per_week}
                        onChange={this.onCoursesHandler}
                      ></input>
                      <br></br>
                      <label>Maximum consecutive hours per day</label>
                      <br></br>
                      <input
                        class="max_consecutive_hours_per_day"
                        id={key}
                        value={course.max_consecutive_hours_per_day}
                        onChange={this.onCoursesHandler}
                      ></input>
                      <br></br>
                      <h5>Valid Rooms</h5>
                      {course.valid_rooms.map((room, index) => (
                        <div>
                          <select
                            onChange={this.onCoursesHandler}
                            id={"room " + key + " " + index}
                            value={room}
                          >
                            (<option value="">Make a selection</option>)
                            {this.state.rooms.map((aval_room) => (
                              <option value={aval_room}>{aval_room}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                      <Button
                        variant="primary"
                        onClick={this.onCoursesHandler}
                        class="room"
                        id={"add " + key}
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        class="room"
                        onClick={this.onCoursesHandler}
                        id={"del " + key}
                      >
                        -
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    onClick={this.onCoursesHandler}
                    id="add"
                  >
                    Add
                  </Button>
                  <Button
                    variant="danger"
                    onClick={this.onCoursesHandler}
                    id="del"
                  >
                    Delete
                  </Button>
                </Tab.Pane>
                <Tab.Pane eventKey="sixth">
                  {this.state.lecturers.map((lecturer, key) => (
                    <div
                      style={{
                        padding: "2.5%",
                        margin: "2.5%",
                        borderStyle: "double",
                      }}
                    >
                      <h3>Lecturer #{key + 1}</h3>
                      <br></br>
                      <label>Enter Lecturer Name:</label>
                      <br></br>
                      <input
                        class="name"
                        id={key}
                        value={lecturer.name}
                        onChange={this.onLecturersHandler}
                      ></input>
                      <br></br>
                      <label>Enter Department:</label>
                      <br></br>
                      <input
                        class="department"
                        id={key}
                        value={lecturer.department}
                        onChange={this.onLecturersHandler}
                      ></input>
                      <br></br>
                      <label>Enter Maximum number of hours per day:</label>
                      <br></br>
                      <input
                        class="max_no_hours_per_day"
                        id={key}
                        value={lecturer.max_no_hours_per_day}
                        onChange={this.onLecturersHandler}
                      ></input>
                      <br></br>
                      <label>Enter Maximum number of Hours per Week:</label>
                      <br></br>
                      <input
                        class="max_no_hours_per_week"
                        id={key}
                        value={lecturer.max_no_hours_per_week}
                        onChange={this.onLecturersHandler}
                      ></input>
                      <br></br>
                      <label>Maximum consecutive hours per day</label>
                      <br></br>
                      <input
                        class="max_consecutive_hours"
                        id={key}
                        value={lecturer.max_consecutive_hours}
                        onChange={this.onLecturersHandler}
                      ></input>
                      <br></br>
                      <label>Rank</label>
                      <br></br>
                      <input
                        class="rank"
                        id={key}
                        value={lecturer.rank}
                        onChange={this.onLecturersHandler}
                      ></input>
                      <br></br>
                      <label>Enter Availabilty Slots</label>
                      <br></br>
                      <input
                        class="Availabilty_slots"
                        id={key}
                        value={lecturer.Availabilty_slots}
                        onChange={this.onLecturersHandler}
                      ></input>
                      <br></br>
                      <h5>Courses</h5>
                      {lecturer.courses.map((course, index) => (
                        <div>
                          <select
                            onChange={this.onLecturersHandler}
                            id={"lecturer course " + key + " " + index}
                            value={course.split(" ")[0]}
                          >
                            (<option value="">Make a selection</option>)
                            {this.state.courses.map((aval_course) => (
                              <option value={aval_course.course_id}>
                                {aval_course.course_id}
                              </option>
                            ))}
                          </select>
                          <input
                            class="type_course"
                            id={"lecturer type_course " + key + " " + index}
                            value={course.split(" ")[1]}
                            onChange={this.onLecturersHandler}
                          ></input>
                        </div>
                      ))}
                      <Button
                        variant="primary"
                        onClick={this.onLecturersHandler}
                        class="course"
                        id={"add " + key}
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        class="course"
                        onClick={this.onLecturersHandler}
                        id={"del " + key}
                      >
                        -
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    onClick={this.onLecturersHandler}
                    id="add"
                  >
                    Add
                  </Button>
                  <Button
                    variant="danger"
                    onClick={this.onLecturersHandler}
                    id="del"
                  >
                    Delete
                  </Button>
                </Tab.Pane>
                <Tab.Pane eventKey="seventh">
                  <label>Population</label>
                  <select
                    value={this.state.population_size}
                    onChange={(event) =>
                      this.setState({
                        population_size: parseInt(event.target.value),
                      })
                    }
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                  <label>Number of Iteration</label>
                  <select
                    value={this.state.iterations}
                    onChange={(event) =>
                      this.setState({
                        iterations: parseInt(event.target.value),
                      })
                    }
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <Modal
          show={this.state.showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Warning!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Do You Wish to Proceed to Timetable Generation?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => this.props.sendDataHere(this.state)}
            >
              Yes
            </Button>
            <Button variant="warning" onClick={this.onSubmitHandler}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Input;
