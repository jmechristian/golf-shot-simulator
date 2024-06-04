import React from 'react';

const ShotList = ({ shots, onSelect }) => {
  return (
    <div
      className='col-span-2 p-4 bg-gray-100 overflow-y-auto'
      style={{ maxHeight: '100vh' }}
    >
      <h2 className='text-lg font-bold mb-4'>Shot List</h2>
      <ul>
        {shots.map((shot, index) => (
          <li
            key={index}
            className='mb-2 p-2 border-b cursor-pointer hover:bg-gray-200'
            onClick={() => onSelect(index)}
          >
            Shot {index + 1} - {shot.TotalDistance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShotList;
