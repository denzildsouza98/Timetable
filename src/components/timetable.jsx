import React, { Component } from "react";
import axios from "axios";

class Timetable extends Component {
  constructor(props) {
    super(props);
    let iteration = props.iteration.split(" ");
    iteration =
      iteration[0].charAt(0).toLowerCase() +
      iteration[0].slice(1) +
      "_" +
      iteration[1].charAt(0).toLowerCase() +
      iteration[1].slice(1);
    this.state = { iteration, data: props.data };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    let generate_timetables_for_these_names = [];
    for (let i = 0; i < this.state.data.lecturers.length; i++)
      generate_timetables_for_these_names.push({
        class: "lecturer",
        name: this.state.data.lecturers[i].name,
      });
    for (let i = 0; i < this.state.data.student_groups.length; i++)
      generate_timetables_for_these_names.push({
        class: "student_group",
        name: this.state.data.student_groups[i].name,
      });
    for (let i = 0; i < this.state.data.rooms.length; i++)
      generate_timetables_for_these_names.push({
        class: "room",
        name: this.state.data.rooms[i],
      });

    axios
      .post("http://127.0.0.1:5000/get_chromosome_with_maximum", {
        name: this.state.iteration,
      })
      .then((res) => {
        this.setState(res.data, () => {
          this.setState({
            generate_timetables_for_these_names,
            selectedClassId: generate_timetables_for_these_names[0].name,
            selectedClassName: generate_timetables_for_these_names[0].class,
          });
          axios
            .post("http://127.0.0.1:5000/get_timetable", {
              name: this.state.iteration,
              chromosome: this.state.chromosome,
              className: generate_timetables_for_these_names[0].class,
              classId: generate_timetables_for_these_names[0].class,
            })
            .then((res) => {
              this.setState({
                timetable: res.data,
              });
            });
        });
      });
  }

  handleSelectChange(event) {
    console.log(event.target.selectedOptions[0].className);
    this.setState(
      {
        selectedClassId: event.target.value,
        selectedClassName: event.target.selectedOptions[0].className,
      },
      () => {
        axios
          .post("http://127.0.0.1:5000/get_timetable", {
            name: this.state.iteration,
            chromosome: this.state.chromosome,
            className: this.state.selectedClassName,
            classId: this.state.selectedClassId,
          })
          .then((res) => {
            this.setState({
              timetable: res.data,
            });
          });
      }
    );
  }

  render() {
    return (
      <div>
        <label>Generate Timetable for:</label>
        {this.state.generate_timetables_for_these_names ? (
          <select
            value={this.state.selected}
            onChange={this.handleSelectChange}
          >
            {this.state.generate_timetables_for_these_names.map((name, key) => (
              <option className={name.class} value={name.name}>
                {name.name}
              </option>
            ))}
          </select>
        ) : (
          <span>Loading</span>
        )}
        <div dangerouslySetInnerHTML={{ __html: this.state.timetable }}></div>
      </div>
    );
  }
}

export default Timetable;
