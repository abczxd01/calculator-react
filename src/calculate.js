export default function calculate(str) {
  const reg = {
    numbers: /\d+/i,
    numOperation: /\D\d+/i,
  };

  const splitStr = str.split("");
  let result = null;

  function calculateExpression(expression) {
    let num1 = expression.match(reg.numbers)[0];
    let operation = expression.match(reg.numOperation)[0][0];
    let num2 = expression.match(reg.numOperation)[0].match(reg.numbers)[0];
    switch (operation) {
      case "+":
        return `${+num1 + +num2}`.split("");
      case "−":
      case "-":
        return `${+num1 - +num2}`.split("");
      case "×":
      case "*":
        return `${+num1 * +num2}`.split("");
      case "÷":
      case "/":
      case ":":
        return `${+num1 / +num2}`.split("");
      default:
        break;
    }
  }

  function clearCalculated() {
    let indexDeleted =
      splitStr.join("").match(reg.numOperation).index +
      splitStr.join("").match(reg.numOperation)[0].length -
      1;
    for (let index = 0; index <= indexDeleted; index++) {
      splitStr.shift();
    }
  }

  while (splitStr.join("").match(reg.numOperation)) {
    result = calculateExpression(splitStr.join(""));
    clearCalculated();
    splitStr.unshift(...result);
  }
  return result.join("");
}
