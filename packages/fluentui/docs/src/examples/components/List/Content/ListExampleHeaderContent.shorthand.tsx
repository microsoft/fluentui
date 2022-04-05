import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  {
    key: 'robert',
    header: 'Robert Tolbert',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'celeste',
    header: 'Celeste Burton',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'cecil',
    header: 'Cecil Folk',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

const ListExample = () => <List items={items} />;

export default ListExample;
