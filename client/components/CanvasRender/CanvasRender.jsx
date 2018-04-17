import React, { Component } from "react";
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class CreationBox extends Component {

  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 5),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      /*this.setState({
        cameraPosition: new THREE.Vector3(
          this.state.cameraPosition.x+0.1,
          this.state.cameraPosition.y,
          this.state.cameraPosition.z
        ),
      });*/
    };
  };



  onChangeCameraXAxis = (axisValue) => {
    //this.setState({cameraRotation : })
  };

  onChangeCameraYAxis = (axisValue) => {
    console.log(axisValue);
  };

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <section className="canvasrender">
        <input id="cameraXAxis" type="range" min={0} max={360} value={0} onChange={this.onChangeCameraXAxis} />
        <input id="cameraYAxis" type="range" min={-90} max={90} value={0} onChange={this.onChangeCameraYAxis}/>
        <React3
          mainCamera="camera"
          width={width}
          height={height}

          onAnimate={this._onAnimate}
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}
              lookAt={new THREE.Vector3(0, 0, 0)}

              position={this.state.cameraPosition}
            />
            <mesh>
              <boxGeometry
                width={1}
                height={1}
                depth={1}
              />
              <meshBasicMaterial
                color={0x00ff00}
              />
            </mesh>
          </scene>
        </React3>
      </section>
    );
  }
}

export default CreationBox;