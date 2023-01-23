import React from 'react';
import './PanelContainer.css'

class PanelContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id='panelContainer'>
        <div id='consolePanel'> {this.props.children[0]} </div>
        <div id='mapPanel'>{this.props.children[1]}</div>
        <div id='instructionsPanel'>{this.props.children[2]}</div>
      </div>
    );
  }

}

export default PanelContainer;
