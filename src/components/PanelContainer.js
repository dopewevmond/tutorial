import React from 'react';
import '../App.css';  // DELETE

function debounce(fn, millisecs) {
  let timeoutId;
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
    }, millisecs)
  }
}

class PanelContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.ref = React.createRef();
    this.onResize = debounce(this.onResize.bind(this), 500);
    this.state = {
      consoleHeight: 14.938,
      remainingHeight: (window.innerHeight / 16) - 14.938, // converting height to rem
      instructionsPanelWidth: 24.375,
      remainingWidth: (window.innerWidth / 16) - 24.375
    }
  }

  onResize() {
    const { innerHeight: height, innerWidth: width } = window;
    const consoleHeight = width < 1512 ? (14.938) : (20.188);
    const instructionsPanelWidth = width < 1512 ? (24.375) : (31.75);
    const remainingHeight = (height / 16) - consoleHeight; // converting height to rem
    const remainingWidth = (width / 16) - instructionsPanelWidth;
    this.setState({
      consoleHeight,
      instructionsPanelWidth,
      remainingHeight,
      remainingWidth,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    let panels = [];

    const commonStyles = {
      display: 'inline-block',
      position: 'absolute',
      wordWrap: 'break-word',
    }
    const instructionsStyles = {
      ...commonStyles,
      left: '0px',
      height: '100%',
      width: this.state.instructionsPanelWidth + 'rem',
      zIndex: 3,
    }
    const consoleStyles = {
      ...commonStyles,
      bottom: '0px',
      left: this.state.instructionsPanelWidth + 'rem',
      height: this.state.consoleHeight + 'rem',
      width: this.state.remainingWidth + 'rem',
      zIndex: 3,
    }
    const mapStyles = {
      ...commonStyles,
      top: '0px',
      left: this.state.instructionsPanelWidth + 'rem',
      height: this.state.remainingHeight + 'rem',
      width: this.state.remainingWidth + 'rem',
    }
    panels.push(<div className='panel' key="console" style={consoleStyles}>{this.props.children[0]}</div>);
    panels.push(<div className='panel' key="map" style={mapStyles}>{this.props.children[1]}</div>);
    panels.push(<div className='panel' key="instructions" style={instructionsStyles}>{this.props.children[2]}</div>);

    return (
      <div ref={this.ref} className='panel-container' style={{height: '100%', width: '100%'}}>
        {panels}
      </div>
    );
  }

}

export default PanelContainer;
