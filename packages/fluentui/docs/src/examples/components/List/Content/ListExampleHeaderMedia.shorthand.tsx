import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  { key: 'irving', header: 'Irving Kuhic', headerMedia: '7:26:56 AM' },
  { key: 'skyler', header: 'Skyler Parks', headerMedia: '11:30:17 PM' },
  { key: 'dante', header: 'Dante Schneider', headerMedia: '5:22:40 PM' },
];

const ListExample = () => <List items={items} />;

export default ListExample;
