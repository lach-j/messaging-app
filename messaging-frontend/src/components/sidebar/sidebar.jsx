import React from 'react';

const Sidebar = ({ rooms, setCurrRoom }) => {
  return (
    <div>
      <h2>sidebar</h2>
      {rooms.map((r, i) => {
        return (
          <div key={i} onClick={() => setCurrRoom(r.id)}>
            <h3>{r.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
