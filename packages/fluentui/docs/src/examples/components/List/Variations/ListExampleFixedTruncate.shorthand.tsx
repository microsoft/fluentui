import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  {
    key: 'header',
    header: 'Use the online FTP application to input the multi-byte application!',
    headerMedia: '7:26:56 AM',
  },
  {
    key: 'content',
    content: 'If we override the capacitor, we can get to the SMS pixel through the open-source FTP application!',
    contentMedia: '7:26:56 AM',
  },
];

const ListExample = () => (
  <div style={{ width: '200px' }}>
    <List truncateHeader truncateContent items={items} />
  </div>
);

export default ListExample;
