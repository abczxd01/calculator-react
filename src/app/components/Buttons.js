const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
const operators = ['+', '±', '−', '×', '÷', '%', 'C', '='];

function ButtonNum(props) {
  return (
    <button
      className="button-number"
      onClick={() => props.handleClick(props.num)}>
      {props.num}
    </button>
  );
}
function ButtonOperation(props) {
  return (
    <button
      className={`${props.className ?? ''} button-operation`}
      onClick={() => props.handleClick(props.operation)}>
      {props.operation}
    </button>
  );
}

export const Buttons = props => {
  return (
    <div className="calculator__buttons">
      {numbers.map(number => {
        return (
          <ButtonNum
            num={number}
            key={number}
            handleClick={props.handleClick}></ButtonNum>
        );
      })}
      {operators.map(operator => {
        if (operator === '=') {
          return (
            <ButtonOperation
              key={operator}
              operation={operator}
              className="button-equals"
              handleClick={props.handleClick}></ButtonOperation>
          );
        }
        return (
          <ButtonOperation
            key={operator}
            operation={operator}
            handleClick={props.handleClick}></ButtonOperation>
        );
      })}
    </div>
  );
};
