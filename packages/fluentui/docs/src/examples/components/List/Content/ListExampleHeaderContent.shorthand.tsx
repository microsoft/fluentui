import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  {
    key: 'irving',
    header: 'Irving Kuhic',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'skyler',
    header: 'Skyler Parks',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'dante',
    header: 'Dante Schneider',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

const ListExample = () => <List items={items} />;

export default ListExample;
