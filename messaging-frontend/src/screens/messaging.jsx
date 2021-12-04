import React from 'react';

import MessageContainer from '../components/messaging/messageContainer';
import Sidebar from '../components/sidebar/sidebar';

const Messaging = () => {
  return (
    <div>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Messaging;
