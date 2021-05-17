import { Component } from "react";
import Toggle from "./Toggle/Toggle";
import "./App.css";
import calculate from "./calculate";

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
      // readOnly
      value={props.value}
      onChange={props.handleChange}
      onKeyPress={(event) => {
        if (event.key === "Enter")
          console.log(calculate(event.currentTarget.value));
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
      history: [
        {
          mathExpression: "",
          mathExpressionResult: "",
        },
      ],
      mathExpression: "",
    };
  }
  handleChange = (e) => {
    this.setState({ mathExpression: e.currentTarget.value });
  };
  handleClick(value) {
    const history = this.state.history.slice();
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
        const result = calculate(this.state.mathExpression);
        this.setState((state) => ({
          history: [
            ...history,
            {
              mathExpression: state.mathExpression,
              result,
            },
          ],
          mathExpression: `${result}`,
        }));
        break;
      case "±":
        break;
      case "%":
        break;
      case ".":
        break;
      default:
        this.setState((state) => ({
          mathExpression: `${state.mathExpression}${value}`,
        }));
        break;
    }
  }
  render() {
    const lastMathExpression =
      this.state.history[this.state.history.length - 1].mathExpression;
    return (
      <div className="calculator">
        <p className="calculator__previous-result">{lastMathExpression}</p>
        <InputField
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
