import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class CreationBox extends Component {

  static defaultProps = {
    cameraDistance: 2,
    texture: {
      wire: false,
    },
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
      texture: props.texture,
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
    let angle = e.target.value;

    if (angle < -90) {
      angle = -90;
    }
    else if (angle > 90) {
      angle = 90;
    }

    this.angleToPosition(this.state.cameraAngles.y, angle);
  };

  onChangeCameraYAxis = (e) => {
    let angle = e.target.value;
    
    if (angle < 0) {
      angle = 0;
    }
    else if (angle > 360) {
      angle = 360;
    }

    this.angleToPosition(angle, this.state.cameraAngles.perspective);
  };

  onWireTextureChange = (e) => {
    const texture = this.state.texture;
    texture.wire = e.target.checked;
    this.setState({
      texture,
    })
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <section className="canvasrender">
        <div className="form-group row">
          <label className="col-sm-2">
            <FormattedMessage id="canvasrender.horizontalRotation" />
          </label>
          <div className="col-sm-10">
            <input id="cameraYAxis" className="form-control-range" type="range" min={0} max={360} value={this.state.cameraAngles.y} onChange={this.onChangeCameraYAxis} />
            <input type="number" min={0} max={360} value={this.state.cameraAngles.y} onChange={this.onChangeCameraYAxis} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2">
            <FormattedMessage id="canvasrender.verticalRotation" />
          </label>
          <div className="col-sm-10">
            <input id="cameraPerspective" className="form-control-range" type="range" min={-90} max={90} value={this.state.cameraAngles.perspective} onChange={this.onChangeCameraPerspective} />
            <input type="number" min={-90} max={90} value={this.state.cameraAngles.perspective} onChange={this.onChangeCameraPerspective} />
           </div>
         </div>
        <div className="form-group row"> 
          <label className="col-sm-2">
            <FormattedMessage id="canvasrender.wireTexture" />
          </label>
          <div className="col-sm-10">
            <input id="cameraPerspective" type="checkbox" value={this.state.texture.wire} onChange={this.onWireTextureChange} />
          </div>
        </div>
        <React3
          mainCamera="camera"
          width={width}
          height={height}
          shadowMapEnabled

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
              position={new THREE.Vector3(0, 0, this.props.cameraDistance)}
              lookAt={new THREE.Vector3(0, 0, 0)}

              castShadow
              shadowCameraNear={20}
              shadowCameraFar={100}
              shadowCameraFov={5}

              shadowBias={-0.00022}

              shadowMapWidth={2048}
              shadowMapHeight={2048}
            />

            <mesh
              castShadow
              receiveShadow
            >
              <boxGeometry
                width={1}
                height={1}
                depth={1}
              />
              <meshBasicMaterial
                color={0x009900}
                wireframe={this.state.texture.wire}
              />
            </mesh>
          </scene>
        </React3>
      </section>
    );
  }
}

export default CreationBox;