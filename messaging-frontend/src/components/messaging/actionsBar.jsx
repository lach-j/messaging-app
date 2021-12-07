import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ActionsBar = ({ currRoom, updateLocalMessages }) => {
  const [message, setMessage] = useState('');
  const [sendMessage, { data, loading, error }] = useMutation(
    gql`
      mutation SendMessage($room_id: ID, $message: String, $author: ID) {
        addMessage(room: $room_id, input: { author: $author, body: $message }) {
          id
          author
          timestamp
          body
          reactions {
            author
            reaction
          }
        }
      }
    `,
    { variables: { room_id: currRoom, message, author: '12345' } }
  );

  const handleSendMessage = (target) => {
    sendMessage().then((msg) => updateLocalMessages(msg.data.addMessage));
    setMessage('');
  };
  return (
    <div className="flex w-full py-1 pl-3 pr-10 gap-x-3 mb-2 mt-2">
      <input
        className="p-3 w-full rounded-full bg-gray-100"
        value={message}
        onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage() : null)}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="py-2 px-4 bg-gray-200 rounded-2xl"
        onClick={handleSendMessage}
      >
        SEND
      </button>
    </div>
  );
};

export default ActionsBar;
