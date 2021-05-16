import { Component } from "react";
import Toggle from "./Toggle/Toggle";
import "./App.css";

function ButtonNum(props) {
  return (
    <button
      className="button-number"
      onClick={() => props.handleClick(props.num)}
    >
      {props.num}
    </button>
  );
}
function ButtonOperation(props) {
  return (
    <button
      className={`${props.className ?? ""} button-operation`}
      onClick={() => props.handleClick(props.operation)}
    >
      {props.operation}
    </button>
  );
}
function InputField(props) {
  return (
    <input
      type="text"
      className="input-field"
      placeholder="0"
      value={props.value}
      onChange={props.handleChange}
      onKeyPress={(event) => {
        if (event.key === "Enter") props.calculate();
      }}
    />
  );
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];
    this.operations = ["+", "±", "−", "×", "÷", "%", "C", "="];
    this.state = {
      mathExpression: "",
    };
  }
  calculate = () => {
    this.setState((state) => ({
      mathExpression: `${eval(state.mathExpression)}`,
    }));
  };
  handleChange = (e) => {
    this.setState({ mathExpression: e.currentTarget.value });
  };
  handleClick(value) {
    switch (value) {
      case "C":
        let mathExpression = this.state.mathExpression.split("");
        mathExpression.pop();
        mathExpression = mathExpression.join("");
        this.setState({
          mathExpression: `${mathExpression}`,
        });
        break;
      case "=":
        this.calculate();
        break;
      default:
        this.setState((state, props) => ({
          mathExpression: `${state.mathExpression}${value}`,
        }));
        break;
    }
  }
  render() {
    return (
      <div className="calculator">
        <InputField
          calculate={this.calculate}
          handleChange={this.handleChange}
          value={this.state.mathExpression}
        ></InputField>
        <div className="calculator__buttons">
          {this.numbers.map((number) => {
            return (
              <ButtonNum
                num={number}
                key={number}
                handleClick={(num) => this.handleClick(num)}
              ></ButtonNum>
            );
          })}
          {this.operations.map((operation) => {
            if (operation === "=") {
              return (
                <ButtonOperation
                  key={operation}
                  operation={operation}
                  className="button-equals"
                  handleClick={(operation) => this.handleClick(operation)}
                ></ButtonOperation>
              );
            }
            return (
              <ButtonOperation
                key={operation}
                operation={operation}
                handleClick={(operation) => this.handleClick(operation)}
              ></ButtonOperation>
            );
          })}
        </div>
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <Toggle></Toggle>
      <Calculator></Calculator>
    </div>
  );
}
