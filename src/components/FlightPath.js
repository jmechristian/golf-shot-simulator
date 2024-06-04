import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Html } from '@react-three/drei';

const FlightPath = ({ points, progress, setProgress }) => {
  const ballRef = useRef();
  const [currentYardage, setCurrentYardage] = useState(0);

  useFrame(() => {
    setProgress((prev) => (prev + 0.0025) % 1); // Adjust the increment for speed
    const index = Math.floor(progress * (points.length - 1));
    const [x, y, z] = points[index];

    if (ballRef.current) {
      ballRef.current.position.set(x, y, z);
      setCurrentYardage(
        ((index / points.length) * points[points.length - 1][2]).toFixed(2)
      );
    }
  });

  return (
    <>
      <Line points={points} color='blue' lineWidth={2} />
      <Sphere ref={ballRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color='red' />
      </Sphere>
      <Html
        position={[
          ballRef.current?.position.x,
          ballRef.current?.position.y + 2,
          ballRef.current?.position.z,
        ]}
      >
        <div
          style={{
            color: 'black',
            fontSize: '24px',
            backgroundColor: 'white',
            padding: '2px',
            borderRadius: '4px',
          }}
        >
          {currentYardage} yds
        </div>
      </Html>
    </>
  );
};

export default FlightPath;
