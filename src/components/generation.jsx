import React, { Component } from "react";
import axios from "axios";
import Line from "./line";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      current: "initialised",
      progress: 0,
      count: 0,
      chart_data: [
        ["x", "maximum", "average", "minimum"],
        // [0, 87.14285714285714, 83.26190476190477, 76.66666666666667],
        // [1, 88.0952380952381, 84.18546365914787, 80.47619047619048],
        // [2, 88.57142857142857, 83.30827067669173, 79.52380952380952],
        // [3, 90.95238095238095, 85.57142857142858, 78.57142857142857],
        // [4, 89.52380952380952, 85.19047619047618, 80.47619047619048],
        // [5, 88.0952380952381, 84.36507936507935, 79.04761904761905],
        // [6, 90.47619047619048, 85.34391534391531, 77.61904761904762],
        // [7, 91.42857142857143, 84.81203007518798, 75.71428571428572],
        // [8, 90, 85.28822055137843, 81.9047619047619],
        // [9, 89.04761904761905, 85.1082251082251, 79.04761904761905],
      ],
      generation: "intial_population",
    };
    this.getIterationWithMaximum = this.getIterationWithMaximum.bind(this);
    this.createInitalPopulation = this.createInitalPopulation.bind(this);
    this.processPopulation = this.processPopulation.bind(this);
  }

  // componentDidMount() {
  //   axios
  //     .post("http://127.0.0.1:5000/init", this.state.data)
  //     .then((res) => {
  //       localStorage.setItem(
  //         "column_numbers",
  //         JSON.stringify(res.data.column_numbers)
  //       );
  //       this.setState({
  //         current: "initialised",
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }

  getIterationWithMaximum() {
    let chart_data = this.state.chart_data.slice(1);
    let iterationWithMaximum = 0;
    let maximumFitness = 0;
    for (let i = 0; i <= this.state.data.iterations; i++) {
      console.log(i);
      if (maximumFitness <= chart_data[i][1]) {
        iterationWithMaximum = i;
        maximumFitness = chart_data[i][1];
      }
    }
    if (iterationWithMaximum === 0) {
      iterationWithMaximum = "Intial Population";
    } else if (iterationWithMaximum === 1) {
      iterationWithMaximum = "First Generation";
    } else if (iterationWithMaximum === 2) {
      iterationWithMaximum = "Two Generation";
    } else if (iterationWithMaximum === 3) {
      iterationWithMaximum = "Three Generation";
    } else if (iterationWithMaximum === 4) {
      iterationWithMaximum = "Four Generation";
    } else if (iterationWithMaximum === 5) {
      iterationWithMaximum = "Fifth Generation";
    } else if (iterationWithMaximum === 6) {
      iterationWithMaximum = "Sixth Generation";
    } else if (iterationWithMaximum === 7) {
      iterationWithMaximum = "Seventh Generation";
    } else if (iterationWithMaximum === 8) {
      iterationWithMaximum = "Eighth Generation";
    } else if (iterationWithMaximum === 9) {
      iterationWithMaximum = "Ninth Generation";
    } else if (iterationWithMaximum === 10) {
      iterationWithMaximum = "Tenth Generation";
    }
    this.setState({
      iterationWithMaximum,
      maximumFitness,
      current: "done",
    });
  }

  createInitalPopulation() {
    axios
      .post("http://127.0.0.1:5000/create_initial_population", {
        column_numbers: localStorage.getItem("column_numbers"),
        population_size: this.state.data.population_size,
      })
      .then((res) => {
        this.setState({
          population: res.data.population,
          current: "start_processing_popultaion",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async processPopulation() {
    this.setState({
      current: "processing",
    });
    for (let i = 0; i < this.state.data.population_size; i++) {
      console.log(i);
      await axios
        .post("http://127.0.0.1:5000/fill_target_matrix", {
          column_numbers: this.state.population[i],
          name: this.state.generation,
        })
        .then((res) => {
          console.log(res.data);
          this.setState(
            {
              progress: this.state.progress + 1,
            },
            () => {
              if (
                this.state.data.population_size <= this.state.progress &&
                this.state.data.iterations > this.state.count
              ) {
                axios
                  .post("http://127.0.0.1:5000/get_performance", {
                    name: this.state.generation,
                  })
                  .then((result) => {
                    let new_chart_data = this.state.chart_data;
                    new_chart_data.push([
                      this.state.count,
                      result.data.maximum,
                      result.data.average,
                      result.data.minimum,
                    ]);
                    this.setState(
                      {
                        chart_data: new_chart_data,
                        progress: 0,
                        count: this.state.count + 1,
                        // current: "start_processing_popultaion",
                        // generation: "first_generation",
                      },
                      () => {
                        axios
                          .post("http://127.0.0.1:5000/genetic_algorithm", {
                            name: this.state.generation,
                            population_size: this.state.data.population_size,
                          })
                          .then((resu) => {
                            let generation;
                            if (this.state.generation === "intial_population")
                              generation = "first_generation";
                            else if (
                              this.state.generation === "first_generation"
                            )
                              generation = "second_generation";
                            else if (
                              this.state.generation === "second_generation"
                            )
                              generation = "third_generation";
                            else if (
                              this.state.generation === "third_generation"
                            )
                              generation = "fourth_generation";
                            else if (
                              this.state.generation === "fourth_generation"
                            )
                              generation = "fifth_generation";
                            else if (
                              this.state.generation === "fifth_generation"
                            )
                              generation = "sixth_generation";
                            else if (
                              this.state.generation === "sixth_generation"
                            )
                              generation = "seventh_generation";
                            else if (
                              this.state.generation === "seventh_generation"
                            )
                              generation = "eighth_generation";
                            else if (
                              this.state.generation === "eighth_generation"
                            )
                              generation = "ninth_generation";
                            else if (
                              this.state.generation === "ninth_generation"
                            )
                              generation = "tenth_generation";

                            this.setState({
                              population: resu.data.new_population,
                              current: "start_processing_popultaion",
                              generation: generation,
                            });
                          });
                      }
                    );
                  });
              } else if (
                this.state.data.population_size <= this.state.progress &&
                this.state.data.iterations <= this.state.count
              ) {
                console.log("Here");
                axios
                  .post("http://127.0.0.1:5000/get_performance", {
                    name: this.state.generation,
                  })
                  .then((result) => {
                    let new_chart_data = this.state.chart_data;
                    new_chart_data.push([
                      this.state.count,
                      result.data.maximum,
                      result.data.average,
                      result.data.minimum,
                    ]);
                    this.setState(
                      {
                        chart_data: new_chart_data,
                        progress: 0,
                        count: this.state.count + 1,
                        // current: "start_processing_popultaion",
                        // generation: "first_generation",
                      },
                      () => {
                        this.setState({ current: "compute_maximum" });
                      }
                    );
                  });
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderSwitch(data) {
    switch (data) {
      case "initialising":
        return (
          <div>
            Initialising
            <Spinner animation="border" />
          </div>
        );

      case "initialised":
        return (
          <div>
            <Button
              variant="success"
              onClick={() => {
                this.createInitalPopulation();
              }}
              style={{
                backgroundColor: "#ff2e63",
                borderColor: "#ff2e63",
              }}
            >
              Intialise Population and begin?
            </Button>
          </div>
        );

      case "start_processing_popultaion":
        this.processPopulation();
        return;
      case "processing":
        let display_element;
        if (this.state.generation === "intial_population")
          display_element = "Intial Population";
        else {
          let string = this.state.generation.split("_");
          display_element =
            string[0].charAt(0).toUpperCase() +
            string[0].slice(1) +
            " " +
            string[1].charAt(0).toUpperCase() +
            string[1].slice(1);
        }

        return (
          <div>
            <h3>Current Iteration: {display_element}</h3>
            {this.state.progress}/{this.state.data.population_size} done
          </div>
        );
      case "compute_maximum":
        this.getIterationWithMaximum();
        break;
      case "done":
        return (
          <div>
            <h3>All Iterations are complete</h3>
            <h4>
              Looks like the <b>{this.state.iterationWithMaximum}</b> has the
              highest fitness of {this.state.maximumFitness}
            </h4>
            <Button
              variant="success"
              onClick={() => {
                this.props.sendDataHere(this.state.iterationWithMaximum);
              }}
            >
              Proceed to Display Timetable
            </Button>
          </div>
        );
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center", padding: "5%" }}>
          <h1>Genetic Algorithm </h1>
          <Row>
            <Col>
              {this.state.chart_data.length == 1 ? (
                <div>
                  <h3>This Chart will load once data comes in</h3>
                </div>
              ) : (
                <Line data={this.state.chart_data}></Line>
              )}
            </Col>
            <Col>
              {this.renderSwitch(this.state.current)}
              <ProgressBar
                style={{ margin: "2%" }}
                animated
                now={
                  (this.state.progress * 100) / this.state.data.population_size
                }
              />
            </Col>
          </Row>
        </div>
        <footer></footer>
      </div>
    );
  }
}

export default Generation;
