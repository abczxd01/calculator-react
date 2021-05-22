export default function calculate(str) {
  function createStack(string) {
    const operators = /[+/:÷*×−-]/i;
    const conversionOperator = operator => {
      switch (operator) {
        case '÷':
        case ':':
          return '/';
        case '×':
          return '*';
        case ',':
          return '.';
        case '−':
          return '-';
        default:
          return operator;
      }
    };
    const splitString = string.split('');
    const stack = [];
    let currentNum = '';
    splitString.forEach(symbol => {
      if (!isNaN(symbol) || symbol === '.' || symbol === ',') {
        currentNum += conversionOperator(symbol);
      }
      if (symbol.match(operators)) {
        stack.push(+currentNum);
        currentNum = '';
        stack.push(conversionOperator(symbol));
      }
    });
    stack.push(+currentNum);
    return stack;
  }
  function calculateStack(stack) {
    const _stack = [...stack];
    const calculateOneExpression = (x, y, operation) => {
      switch (operation) {
        case '+':
          return +(x + y).toFixed(3);
        case '-':
          return +(x - y).toFixed(3);
        case '*':
          return +(x * y).toFixed(3);
        case '/':
          return +(x / y).toFixed(3);
        default:
          break;
      }
    };
    const searchIndexOperator = arr => {
      if (arr.includes('*') && arr.includes('/')) {
        const indexOperator1 = arr.indexOf('*', 1);
        const indexOperator2 = arr.indexOf('/', 1);
        if (indexOperator1 < indexOperator2) {
          return indexOperator1;
        } else if (indexOperator2 < indexOperator1) {
          return indexOperator2;
        }
      } else if (arr.includes('*')) {
        return arr.indexOf('*', 1);
      } else if (arr.includes('/')) {
        return arr.indexOf('/', 1);
      }
      return -1;
    };
    while (_stack.length > 2) {
      const indexOperator = searchIndexOperator(_stack);
      if (indexOperator !== -1) {
        let res = calculateOneExpression(
          _stack[indexOperator - 1],
          _stack[indexOperator + 1],
          _stack[indexOperator]
        );
        _stack.splice(indexOperator - 1, 3, res);
      } else {
        let res = calculateOneExpression(_stack[0], _stack[2], _stack[1]);
        _stack.shift();
        _stack.shift();
        _stack.shift();
        _stack.unshift(res);
      }
    }
    return _stack[0];
  }
  try {
    const stack = createStack(str);
    const result = calculateStack(stack);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}
