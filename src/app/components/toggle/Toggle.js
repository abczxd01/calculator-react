import { Component } from 'react';
import './Toggle.css';
const styleVaribles = [
  {
    nameVaribles: '--main-calculator-bg-color',
    colorVaribles: '#010808',
  },
  {
    nameVaribles: '--main-button-bg-color',
    colorVaribles: '#08151a',
  },
  {
    nameVaribles: '--extra-button-bg-color',
    colorVaribles: '#0a3d3e',
  },
  {
    nameVaribles: '--equals-button-bg-color',
    colorVaribles: '#249c91',
  },
  {
    nameVaribles: '--main-font-color',
    colorVaribles: '#feffff',
  },
];
export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  handleChange = () => {
    new Promise(resolve => {
      this.setState({
        active: !this.state.active,
      });
      resolve();
    }).then(() => {
      if (this.state.active) {
        styleVaribles.forEach(obj => {
          document.body.style.setProperty(obj.nameVaribles, obj.colorVaribles);
        });
      } else {
        document.body.style.cssText = '';
      }
    });
  };
  render() {
    return (
      <label className="toggle">
        <input type="checkbox" onChange={this.handleChange}></input>
        <span className="toggle-item toggle-round"></span>
      </label>
    );
  }
}
