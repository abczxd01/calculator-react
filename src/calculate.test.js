import calcalute from "./calculate";
const testExpression = [
  {
    expression: "1123+121+232+21312+214412+12134125126+42142414+241421",
    result: 12176746161,
  },
  {
    expression: "1231+321−213−313+21512+4214+24",
    result: 26776,
  },
  {
    expression: "26776×150÷200",
    result: 20082,
  },
  {
    expression: "15.5-10+50-5.5",
    result: 50,
  },
  {
    expression: "15.5*10*5*9.8",
    result: 7595,
  },
  {
    expression: "15.5*10*5*9.8*5.9*10*8.1",
    result: 3629650.5,
  },
  {
    expression: "24,5*9,8*5,9*5,1*203",
    result: 1466595.627,
  },
  {
    expression: "24,5×9,8×5,9×5,1×203",
    result: 1466595.627,
  },
  {
    expression: "500/5/5*100/10×100÷10",
    result: 2000,
  },
  {
    expression: "10+120*20",
    result: 2410,
  },
  {
    expression: "10+120+20-20*5+20÷10",
    result: 52,
  },
];
testExpression.forEach((obj) => {
  test(`${obj.expression} = ${obj.result}`, () => {
    expect(calcalute(obj.expression)).toBeCloseTo(obj.result);
  });
});
