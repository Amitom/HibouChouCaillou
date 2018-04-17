import React, { Component } from "react";
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class CreationBox extends Component {

  static defaultProps = {
    cameraDistance: 5,
  }

  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cameraAngles: {
        y: 0, // x, z
        perspective: 0, // x, y, z
      },
      cameraPosition: new THREE.Vector3(0, 0, this.props.cameraDistance),
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

  angleToPosition = (y, perspective = 0) => {
    this.setState({
      cameraAngles: {y, perspective},
      cameraPosition: new THREE.Vector3(
        Math.cos(y*(Math.PI*2)/360)*this.props.cameraDistance * Math.cos(perspective*(Math.PI*2)/360),
        Math.sin(perspective*(Math.PI*2)/360)*this.props.cameraDistance,
        Math.sin(y*(Math.PI*2)/360)*this.props.cameraDistance * Math.cos(perspective*(Math.PI*2)/360)
      ),
    });
  }

  onChangeCameraPerspective = (e) => {
    this.angleToPosition(this.state.cameraAngles.y, e.target.value);
  };

  onChangeCameraYAxis = (e) => {
    this.angleToPosition(e.target.value, this.state.cameraAngles.perspective);
  };

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <section className="canvasrender">
        <input id="cameraYAxis" type="range" min={0} max={360} value={this.state.cameraAngles.y} onChange={this.onChangeCameraYAxis} />
        <input id="cameraPerspective" type="range" min={-90} max={90} value={this.state.cameraAngles.perspective} onChange={this.onChangeCameraPerspective} />
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

            <ambientLight
              color={0x505050}
            />

            <spotLight
              color={0xffffff}
              intensity={1.5}
              position={this.state.cameraPosition}
              lookAt={new THREE.Vector3(0, 0, 0)}

              castShadow
              shadowCameraNear={200}
              shadowCameraFar={10000}
              shadowCameraFov={50}

              shadowBias={-0.00022}

              shadowMapWidth={2048}
              shadowMapHeight={2048}
            />

            <mesh>
              <boxGeometry
                width={1}
                height={1}
                depth={1}
              />
              <meshBasicMaterial
                color={0x009900}
                wireframe={false}
              />
            </mesh>
          </scene>
        </React3>
      </section>
    );
  }
}

export default CreationBox;