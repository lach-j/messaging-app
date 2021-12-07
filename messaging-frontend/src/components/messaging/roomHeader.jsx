import React from 'react';

const RoomHeader = ({ title }) => {
  return (
    <div className="flex justify-between p-5 border-b-2 border-gray-50 bg-gray-200">
      <h1>{title}</h1>
      <div className="flex justify-evenly gap-2">
        <button>btn1</button>
        <button>btn2</button>
        <button>btn3</button>
      </div>
    </div>
  );
};

export default RoomHeader;
