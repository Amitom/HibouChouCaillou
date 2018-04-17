import React, { Component } from "react";

import CanvasRender from 'components/CanvasRender';
import InstructionsRender from 'components/InstructionsRender';

class CreationBox extends Component {
  render() {
    return (
      <section className="creationbox">
        {/* Canvas render */}
        <CanvasRender />
        {/* Add instruction step */}
        {/* Instruction render / Steps */}
        <InstructionsRender />

      </section>
    );
  }
}

export default CreationBox;