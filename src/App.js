import "./App.css";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  useTexture,
  Text,
  Environment,
  useEnvironment,
} from "@react-three/drei";
import test from "./texture/test.jpg";
import sky from "./hdr/test.hdr";
import { useControls } from "leva";
function Texts() {
  const { x, z, y, fontSize, color, rotationX, rotationY } = useControls({
    x: { value: 0, min: -10, max: 10 },
    y: { value: 0, min: -10, max: 10 },
    fontSize: { value: 3, min: 0.1, max: 3 },
    color: "#ffffff",
    rotationX: { value: Math.PI / 4, min: -Math.PI, max: Math.PI },
    rotationY: { value: Math.PI / 3, min: -Math.PI, max: Math.PI },
  });

  const radius = 50;
  return (
    <>
      {["Texte 1", "Texte 2", "Texte 3", "Texte 4", "Texte 5", "Texte 6"].map(
        (text, index) => {
          const angle = ((index * 60) / 180) * Math.PI;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);

          return (
            <Text
              position={[x, 10, z]}
              fontSize={fontSize}
              color="white"
              anchorX="center"
              anchorY="middle"
              rotation={[rotationX, rotationY, 0]}
            >
              {text}
            </Text>
          );
        }
      )}
    </>
  );
}
function ThreeScene({step}) {
  const textControl = useControls({});
  const orbitControlRef = useRef();
  useFrame((state) => {
    if (step != -1) {
      state.camera.rotateY(((step * 60) / 180) * Math.PI)
    }
  });
  return (
    <>
      <pointLight position={[5, 5, 5]} intensity={2} />
      <ambientLight intensity={1.4} />
      <OrbitControls ref={orbitControlRef} />
      <Texts />
      <Environment files={sky} background />
    </>
  );
}
function App() {
  const [step, setStep] = useState(-1);
  const RotateCamera = () => {
    setStep((i)=>i=(i+1)%6);
  };
  return (
    <div className="App">
      <div
        style={{ position: "absolute", zIndex: 222, background: "red" , padding:2}}
        onClick={() => RotateCamera()}
      >
        step{step}
      </div>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
        camera={{
          position: [2, 0, 0],
          fov: (window.innerHeight * 65) / 935,
          far: 10000,
          near: 0.1,
        }}
      >
        <ThreeScene step={step} />
      </Canvas>
    </div>
  );
}

export default App;
