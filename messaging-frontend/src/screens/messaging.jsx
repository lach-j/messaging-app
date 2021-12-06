import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import MessageContainer from '../components/messaging/messageContainer';
import Sidebar from '../components/sidebar/sidebar';

const Messaging = () => {
  const [currRoom, setCurrRoom] = useState(null);
  const { loading, error, data } = useQuery(gql`
    query RoomQuery {
      room {
        title
        id
      }
    }
  `);
  // TODO: handle query loading/error

  if (data && !currRoom) {
    setCurrRoom(data.room[0].id);
  }

  if (!data) {
    return (
      <p>{loading ? 'Page Loading' : error ? JSON.stringify(error) : 'huh'}</p>
    );
  }

  return (
    <div>
      <Sidebar
        currRoom={currRoom}
        rooms={data?.room ? data.room : []}
        setCurrRoom={(room) => setCurrRoom(room)}
      />
      <MessageContainer currRoom={currRoom} />
    </div>
  );
};

export default Messaging;
