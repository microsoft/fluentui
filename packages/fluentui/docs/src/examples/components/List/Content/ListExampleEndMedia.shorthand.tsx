import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const ellipsis = <span>&hellip;</span>;

const items = [
  {
    key: 'sensor',
    endMedia: ellipsis,
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'ftp',
    endMedia: ellipsis,
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'gb',
    endMedia: ellipsis,
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

const ListExample = () => <List items={items} selectable />;

export default ListExample;
