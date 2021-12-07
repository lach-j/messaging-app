import React from 'react';

const Sidebar = ({ rooms, setCurrRoom, currRoom }) => {
  return (
    <div className="h-screen border-r-2 border-gray-50 p-5">
      <h2>Rooms</h2>
      <div className="flex mt-3 flex-col gap-3 justify-center text-center">
        {rooms.map((r, i) => {
          return (
            <div
              className={`border-black ${
                r.id === currRoom ? 'bg-gray-300' : 'bg-gray-100'
              } rounded-md p-2`}
              key={i}
              onClick={() => setCurrRoom(r.id)}
            >
              <h3>{r.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
