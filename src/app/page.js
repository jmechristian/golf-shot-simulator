'use client';
import React, { useState, useEffect } from 'react';
import ShotList from '../components/ShotList';
import ShotVisualization from '../components/ShotVisualization';

const Home = () => {
  const [shots, setShots] = useState([]);
  const [selectedShot, setSelectedShot] = useState(null);

  useEffect(() => {
    fetch('/shots.json')
      .then((response) => response.json())
      .then((data) => setShots(data));
  }, []);

  return (
    <div className='grid grid-cols-12 min-h-screen'>
      <ShotList
        shots={shots}
        onSelect={(index) => setSelectedShot(shots[index])}
      />
      <div className='col-span-10' style={{ height: '100vh' }}>
        {selectedShot && <ShotVisualization shot={selectedShot} />}
      </div>
    </div>
  );
};

export default Home;
