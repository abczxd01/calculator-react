import { Component } from "react";
import Toggle from "./Toggle/Toggle";
import "./App.css";
import calculate from "./calculate";

function ButtonsArrow(props) {
  return (
    <div className="buttons-arrow">
      <button
        className="button-arrow button-arrow-left"
        onClick={props.handleClick}
      >
        {"<"}
      </button>
      <button
        className="button-arrow button-arrow-right"
        onClick={props.handleClick}
      >
        {">"}
      </button>
    </div>
  );
}
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
      onKeyPress={(event) =>
        event.key === "Enter" ? props.calculateExpression() : null
      }
    />
  );
}
function MessageErrorExpression(props) {
  return <p className="error-expression">{props.message}</p>;
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
          result: "",
        },
      ],
      mathExpressionError: "",
      mathExpression: "",
      historyStep: 0,
    };
  }
  validateMathExpression() {
    const reg = {
      exception: /[^0-9+/:÷*×−.,-]/i,
      dotCommaDouble: /[.,][.,]/i,
      operatorDouble: /[+/:÷*×−-][+/:÷*×−-]/i,
      dotCommaOperation: /[.,][+/:÷*×−-]/i,
      operatorDotComma: /[+/:÷*×−-][.,]/i,
    };
    const state = this.state.mathExpression;
    let isError = false;
    if (state.match(/[/:÷]0/i) && !state.match(/[/:÷]0[.,]\d{0,}/i)) {
      this.setState({
        mathExpressionError: "Деление на ноль запрещено",
      });
      return false;
    }
    if (state === "" || state.length < 3 || !state.match(/[+/:÷*×−-]/i)) {
      isError = true;
    }
    for (const key in reg) {
      if (state.match(reg[key])) {
        isError = true;
      }
    }
    if (isError) {
      this.setState({
        mathExpressionError: "Некоректное выражение",
      });
      return false;
    } else {
      this.setState({
        mathExpressionError: "",
      });
      return true;
    }
  }
  handleChange = (event) => {
    this.resetError();
    this.setState({ mathExpression: event.currentTarget.value });
  };
  calculateExpression = () => {
    const history = this.state.history.slice();
    const validateResult = this.validateMathExpression();
    let result = null;
    if (!validateResult) {
      return;
    } else {
      result = calculate(this.state.mathExpression);
      if (!isFinite(result)) {
        this.setState({
          mathExpressionError: "Неизвестная ошибка",
        });
        return;
      }
    }
    this.setState((state) => ({
      history: [
        ...history,
        {
          mathExpression: state.mathExpression,
          result,
        },
      ],
      historyStep: state.historyStep + 1,
      mathExpression: `${result}`,
    }));
  };
  resetError = () => {
    if (this.state.mathExpressionError !== "") {
      this.setState({
        mathExpressionError: "",
      });
    }
  };

  handleClick = (value) => {
    switch (value) {
      case "C":
        this.resetError();
        this.setState({ mathExpression: "" });
        break;
      case "=":
        this.calculateExpression();
        break;
      case "±":
        break;
      case "%":
        break;
      default:
        this.resetError();
        this.setState((state) => ({
          mathExpression: `${state.mathExpression}${value}`,
        }));
        break;
    }
  };
  handleClickArrow = (event) => {
    const historyStep = this.state.historyStep;
    const history = this.state.history;
    if (event.target.matches(".button-arrow-left")) {
      const historyStepBack = historyStep - 1;
      if (historyStepBack >= 0) {
        this.setState({
          historyStep: historyStepBack,
          mathExpression: history[historyStepBack].result,
        });
      }
    } else if (event.target.matches(".button-arrow-right")) {
      const historyStepNext = historyStep + 1;
      if (historyStepNext < history.length) {
        this.setState({
          historyStep: historyStepNext,
          mathExpression: history[historyStepNext].result,
        });
      }
    }
  };
  render() {
    const history = this.state.history;
    const currentMathExpession = history[this.state.historyStep].mathExpression;
    return (
      <div className="calculator">
        <ButtonsArrow handleClick={this.handleClickArrow}></ButtonsArrow>
        {this.state.mathExpressionError === "" ? null : (
          <MessageErrorExpression message={this.state.mathExpressionError} />
        )}
        <p className="calculator__previous-result">{currentMathExpession}</p>
        <InputField
          handleChange={this.handleChange}
          value={this.state.mathExpression}
          calculateExpression={this.calculateExpression}
          resetError={this.resetError}
        ></InputField>
        <div className="calculator__buttons">
          {this.numbers.map((number) => {
            return (
              <ButtonNum
                num={number}
                key={number}
                handleClick={this.handleClick}
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
                  handleClick={this.handleClick}
                ></ButtonOperation>
              );
            }
            return (
              <ButtonOperation
                key={operation}
                operation={operation}
                handleClick={this.handleClick}
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
