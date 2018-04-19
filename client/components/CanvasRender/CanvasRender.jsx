import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class CreationBox extends Component {

  static defaultProps = {
    canvas:{
      height: 500,
      width: 500,
    },
    cameraDistance: 3,
    material: {
      reflectiveIndex: 1.54,
    },
    texture: {
      wire: false,
    },
  }

  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      canvas: props.canvas,
      ...this.angleToPosition(45,30),
      material: props.material,
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
    return {
      cameraAngles: {y, perspective},
      cameraPosition: new THREE.Vector3(
        Math.cos(y*(Math.PI*2)/360)*this.props.cameraDistance * Math.cos(perspective*(Math.PI*2)/360),
        Math.sin(perspective*(Math.PI*2)/360)*this.props.cameraDistance,
        Math.sin(y*(Math.PI*2)/360)*this.props.cameraDistance * Math.cos(perspective*(Math.PI*2)/360)
      ),
    };
  };

  onChangeCameraPerspective = (e) => {
    let angle = e.target.value;

    if (angle < -90) {
      angle = -90;
    }
    else if (angle > 90) {
      angle = 90;
    }

    this.setState(this.angleToPosition(this.state.cameraAngles.y, angle));
  };

  onChangeCameraYAxis = (e) => {
    let angle = e.target.value;

    if (angle < 0) {
      angle = 0;
    }
    else if (angle > 360) {
      angle = 360;
    }

    this.setState(this.angleToPosition(angle, this.state.cameraAngles.perspective));
  };

  onWireTextureChange = (e) => {
    const texture = this.state.texture;
    texture.wire = e.target.checked;
    this.setState({
      texture,
    })
  };

  render() {
    const box = {
      color: 0x330033,
      height: 30,
      width: 29,
    };

    const {
      height,
      width,
    } = this.state.canvas;

    return (
      <section className="canvasrender" ref={(e) => this.wrapper = e}>
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
          antialias
          clearColor={0xf0f0f0}

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
            >
            </perspectiveCamera>

            <ambientLight intensity={.8} />

            <pointLight
              color={0xFFFFFF}
              distance={2000}
              position={new THREE.Vector3(0, 10, 0)}
            />

            <pointLight
              color={0xFFFFFF}
              distance={100}
              position={this.state.cameraPosition}
            />

            <mesh
              key="boxtop"
              castShadow
              receiveShadow
              rotation={new THREE.Euler(0,2*Math.PI/8,0,"XYZ")}
              position={new THREE.Vector3(0, box.width / 2, 0)}
              lookAt={new THREE.Vector3(0, 0, 0)}
            >
              <planeGeometry
                height={box.width}
                width={box.width}
              />
              <meshPhongMaterial
                color={box.color}
              />
            </mesh>

            <mesh
              key="boxbottom"
              castShadow
              receiveShadow
              rotation={new THREE.Euler(0,2*Math.PI/4,0,"XYZ")}
              position={new THREE.Vector3(0, box.width / -2, 0)}

            >
              <planeGeometry
                height={box.width}
                width={box.width}
              />
              <meshPhongMaterial
                color={box.color}
              />
            </mesh>

            <mesh
              key="box0"
              castShadow
              receiveShadow
              position={new THREE.Vector3(-10, 0, 10)}
              lookAt={new THREE.Vector3(0, 0, 0)}
            >
              <planeGeometry
                height={box.height}
                width={box.width}
              />
              <meshPhongMaterial
                color={box.color}
              />
            </mesh>

            <mesh
              key="box1"
              castShadow
              receiveShadow
              position={new THREE.Vector3(-10, 0, -10)}
              lookAt={new THREE.Vector3(0, 0, 0)}
            >
              <planeGeometry
                height={box.height}
                width={box.width}
              />
              <meshPhongMaterial
                color={box.color}
              />
            </mesh>

            <mesh
              key="box2"
              castShadow
              receiveShadow
              position={new THREE.Vector3(10, 0, -10)}
              lookAt={new THREE.Vector3(0, 0, 0)}
            >
              <planeGeometry
                height={box.height}
                width={box.width}
              />
              <meshPhongMaterial
                color={box.color}
              />
            </mesh>

            <mesh
              key="box3"
              castShadow
              receiveShadow
              position={new THREE.Vector3(10, 0, 10)}
              lookAt={new THREE.Vector3(0, 0, 0)}
            >
              <planeGeometry
                height={box.height}
                width={box.width}
              />
              <meshPhongMaterial
                color={box.color}
              />
            </mesh>

            <mesh
              castShadow
              receiveShadow
            >
              <boxGeometry
                width={1}
                height={1}
                depth={1}
              />
              <meshPhongMaterial
                reflectivity={this.state.material.reflectiveIndex}
                color={0xffffff}
                transparent
                opacity={0.3}
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