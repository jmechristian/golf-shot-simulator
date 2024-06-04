import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Plane, Cylinder } from '@react-three/drei';
import FlightPath from './FlightPath';

const ShotVisualization = ({ shot }) => {
  const [points, setPoints] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (shot) {
      const flightPath = getFlightPath(shot);
      setPoints(flightPath);
      setProgress(0);
    }
  }, [shot]);

  return (
    <div style={{ height: '100vh' }}>
      <Canvas camera={{ position: [0, 10, -30], fov: 75 }}>
        <ambientLight />
        <Sky sunPosition={[100, 20, 100]} />
        <Plane
          args={[1000, 1000]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.5, 0]}
        >
          <meshStandardMaterial color='green' />
        </Plane>
        {points.length > 0 && (
          <>
            <FlightPath
              points={points}
              progress={progress}
              setProgress={setProgress}
            />
            <GolfFlag />
          </>
        )}
        <CameraAnchor points={points} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const getFlightPath = (shot) => {
  const points = [];
  const g = 9.81; // Gravity
  const timeStep = 0.05; // Time step for simulation
  const totalTime = (2 * shot.VerticalLaunch) / g; // Time to reach the peak height and fall back to ground
  const carryTime = totalTime / 2; // Approximate carry time
  const rollSteps = 20; // Number of steps for rolling

  // Calculate carry flight path with lateral curve
  for (let t = 0; t <= carryTime; t += timeStep) {
    const x = shot.HorizontalLaunch * t;
    const y = shot.VerticalLaunch * t - 0.5 * g * t * t;
    const z = (shot.CarryDistance * t) / carryTime;
    const lateralCurve = (shot.CarryCurveDistance * t) / carryTime; // Linear lateral displacement
    if (y >= 0) {
      points.push([x, y, z + lateralCurve]);
    }
  }

  // Add roll distance with lateral curve
  const lastPoint = points[points.length - 1];
  let [x, y, z] = lastPoint;

  for (let i = 0; i < rollSteps; i++) {
    const rollX =
      (shot.TotalLateralDistance - shot.CarryLateralDistance) / rollSteps;
    const rollZ = shot.RollDistance / rollSteps;
    x += rollX;
    z += rollZ;
    points.push([x, 0, z]);
  }

  return points;
};

const CameraAnchor = ({ points }) => {
  const { camera } = useThree();
  useFrame(() => {
    if (points.length > 0) {
      camera.position.set(points[0][0], points[0][1] + 10, points[0][2] - 30); // Adjust the height and distance to see the flight path
      camera.lookAt(points[0][0], points[0][1], points[0][2]);
    }
  });
  return null;
};

const GolfFlag = () => {
  return (
    <group position={[0, 0, 200]} rotation={[0, Math.PI / 2, 0]}>
      <Cylinder args={[0.1, 0.1, 3, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color='white' />
      </Cylinder>
      <Plane args={[1, 0.5]} position={[0, 2.5, 0.5]}>
        <meshStandardMaterial color='red' />
      </Plane>
    </group>
  );
};

export default ShotVisualization;
