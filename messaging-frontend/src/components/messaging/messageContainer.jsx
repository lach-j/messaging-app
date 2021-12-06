import { useQuery, gql } from '@apollo/client';
import React from 'react';
import RoomHeader from './roomHeader';

const MessageContainer = ({ currRoom }) => {
  const { loading, error, data } = useQuery(
    gql`
      query FullRoomQuery($currRoom: ID!) {
        room(_id: $currRoom) {
          id
          nicknames {
            user_id
            nickname
          }
          messages {
            id
            author
            timestamp
            body
            reactions {
              reaction
              author
            }
          }
          title
        }
      }
    `,
    { variables: { currRoom } }
  );
  return (
    <div>
      <RoomHeader title={currRoom} />
      <div>
        {data &&
          data.room[0].messages.map((message) => {
            return <div key={message.id}>{message.body}</div>;
          })}
      </div>
    </div>
  );
};

export default MessageContainer;
