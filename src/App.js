import {Component} from 'react';
import './App.css';

class ButtonNum extends Component {
  handleClick = () => {
    console.log(this);
  }
  render(){
    return <button className='button-number' onClick={this.handleClick} >{this.props.num}</button>;
  }
}
class ButtonOperation extends Component{
  render(){
    return (
      <button className='button-operation'>{this.props.operation}</button>
    )
  }
}
class InputNum extends Component{
  render(){
    return (
      <input type='text' className='input-number' placeholder='0'></input>
    )
  }
}
function App() {
  return (
    <div className='App'>
      <InputNum></InputNum>
      <ButtonNum num='0'></ButtonNum>
      <ButtonNum num='1'></ButtonNum>
      <ButtonNum num='2'></ButtonNum>
      <ButtonNum num='3'></ButtonNum>
      <ButtonNum num='4'></ButtonNum>
      <ButtonNum num='5'></ButtonNum>
      <ButtonNum num='6'></ButtonNum>
      <ButtonNum num='7'></ButtonNum>
      <ButtonNum num='8'></ButtonNum>
      <ButtonNum num='9'></ButtonNum>
      <ButtonNum num='.'></ButtonNum>
      <ButtonOperation operation='+'></ButtonOperation>
    </div>
  );
}

export default App;
