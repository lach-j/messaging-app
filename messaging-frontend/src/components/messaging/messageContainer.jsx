import { useQuery, gql } from '@apollo/client';
import React, { useEffect, useState, useRef } from 'react';
import ActionsBar from './actionsBar';
import RoomHeader from './roomHeader';

const MessageContainer = ({ currRoom }) => {
  const messageContainer = useRef(null);
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

  const [messages, setMessages] = useState([]);
  const handleLocalUpdate = (msg) => {
    setMessages([...messages, msg]);
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  };
  useEffect(() => {
    if (data) setMessages(data.room[0].messages);
  }, [data]);

  useEffect(() => {
    setTimeout(
      () =>
        (messageContainer.current.scrollTop =
          messageContainer.current.scrollHeight),
      1
    );
  }, [currRoom]);
  return (
    <div className="w-full h-screen flex flex-col">
      <RoomHeader title={data ? data.room[0].title : 'Loading'} />
      <div
        ref={messageContainer}
        style={{ scrollBehavior: 'smooth' }}
        className="overflow-auto px-5 flex-grow"
      >
        {messages &&
          messages.map((message) => {
            return <div key={message.id}>{message.body}</div>;
          })}
      </div>
      <ActionsBar
        currRoom={currRoom}
        updateLocalMessages={(msg) => handleLocalUpdate(msg)}
      />
    </div>
  );
};

export default MessageContainer;
