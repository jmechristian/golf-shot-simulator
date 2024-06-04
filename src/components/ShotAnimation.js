import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stats, Line } from '@react-three/drei';

const ShotAnimation = ({ shot }) => {
  return (
    <Canvas className='w-5/6 h-screen'>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {shot && <ShotPath coordinates={shot.coordinates} />}
      <Stats />
    </Canvas>
  );
};

const ShotPath = ({ coordinates }) => {
  const ref = useRef();
  const [index, setIndex] = useState(0);

  useFrame(() => {
    if (index < coordinates.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
    }
    ref.current.position.set(...coordinates[index]);
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='hotpink' />
      </mesh>
      <Line points={coordinates} color='blue' lineWidth={2} />
    </>
  );
};

export default ShotAnimation;
