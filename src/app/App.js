import { Component } from 'react';

import calculate from '../calculate';

import Toggle from './components/toggle/Toggle';
import { Buttons } from './components/Buttons';

import './App.css';

function ButtonsArrow(props) {
  return (
    <div className="buttons-arrow">
      <button
        className="button-arrow button-arrow-left"
        onClick={props.handleClick}>
        {'<'}
      </button>
      <button
        className="button-arrow button-arrow-right"
        onClick={props.handleClick}>
        {'>'}
      </button>
    </div>
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
      onKeyPress={event =>
        event.key === 'Enter' ? props.calculateExpression() : null
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
    this.state = {
      history: [
        {
          mathExpression: '',
          result: '',
        },
      ],
      mathExpressionError: '',
      mathExpression: '',
      historyStep: 0,
    };
  }
  validateMathExpression() {
    const regExpValidate = {
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
        mathExpressionError: 'Деление на ноль запрещено',
      });
      return false;
    }
    if (state === '' || state.length < 3 || !state.match(/[+/:÷*×−-]/i)) {
      isError = true;
    }
    for (const key in regExpValidate) {
      if (state.match(regExpValidate[key])) {
        isError = true;
        break;
      }
    }
    if (isError) {
      this.setState({
        mathExpressionError: 'Некоректное выражение',
      });
      return false;
    } else {
      this.setState({
        mathExpressionError: '',
      });
      return true;
    }
  }
  handleChange = event => {
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
          mathExpressionError: 'Неизвестная ошибка',
        });
        return;
      }
    }
    this.setState(state => ({
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
    if (this.state.mathExpressionError !== '') {
      this.setState({
        mathExpressionError: '',
      });
    }
  };
  handleClickButton = value => {
    switch (value) {
      case 'C':
        this.resetError();
        this.setState({ mathExpression: '' });
        break;
      case '=':
        this.calculateExpression();
        break;
      case '±':
        break;
      case '%':
        break;
      default:
        this.resetError();
        this.setState(state => ({
          mathExpression: `${state.mathExpression}${value}`,
        }));
        break;
    }
  };
  handleClickArrow = event => {
    const historyStep = this.state.historyStep;
    const history = this.state.history;
    const currentButton = event.target.innerText === '<' ? 'left' : 'right';
    let historyStepNext = historyStep;
    if (currentButton === 'left') {
      historyStepNext = historyStep - 1 >= 0 ? historyStep - 1 : historyStep;
    } else {
      historyStepNext =
        historyStep + 1 < history.length ? historyStep + 1 : historyStep;
    }
    this.setState({
      historyStep: historyStepNext,
      mathExpression: history[historyStepNext].result,
    });
  };
  render() {
    const history = this.state.history;
    const currentMathExpession = history[this.state.historyStep].mathExpression;
    return (
      <div className="calculator">
        <ButtonsArrow handleClick={this.handleClickArrow}></ButtonsArrow>
        {this.state.mathExpressionError === '' ? null : (
          <MessageErrorExpression message={this.state.mathExpressionError} />
        )}
        <p className="calculator__previous-result">{currentMathExpession}</p>
        <InputField
          handleChange={this.handleChange}
          value={this.state.mathExpression}
          calculateExpression={this.calculateExpression}
          resetError={this.resetError}></InputField>
        <Buttons handleClick={this.handleClickButton}></Buttons>
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <Toggle />
      <Calculator />
    </div>
  );
}
