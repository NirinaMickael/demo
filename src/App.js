import "./App.css";
import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture, Text,Environment } from "@react-three/drei";
import test from "./texture/test.jpg";
function Sph() {
  const texture = useTexture(test);
  const radius = 5;
  return (
    <Sphere args={[radius, 32, 32]}>
      <meshStandardMaterial map={texture} side={THREE.BackSide} />
      {
        ['Texte 1', 'Texte 2', 'Texte 3', 'Texte 4', 'Texte 5', 'Texte 6'].map((text, index) => {
          const angle = ((index * 60) / 180) * Math.PI;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
  
          return (
            <Text
            position={[x, 0, z]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            rotation={[Math.PI/4, Math.PI/3, 0]}
          >
            {text}
          </Text>
          );
        })
      }
    </Sphere>
  );
}
function App() {
  return (
    <div className="App">
      <div>
        left side bar
      </div>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
        camera={{ position: [1, 0, 0] ,fov: (window.innerHeight * 65) / 935,far:10000,near:0.1}}
      >
        <pointLight position={[5, 5, 5]} intensity={9} />
        <ambientLight intensity={1.4} />
        <OrbitControls 
        />
        <Sph />
        {/* <Environment files="./hdr/test.hdr" background /> */}
      </Canvas>
    </div>
  );
}

export default App;
