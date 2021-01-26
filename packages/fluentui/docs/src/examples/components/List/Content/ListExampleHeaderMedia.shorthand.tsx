import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  { key: 'irving', header: 'Robert Tolbert', headerMedia: '7:26:56 AM' },
  { key: 'skyler', header: 'Celeste Burton', headerMedia: '11:30:17 PM' },
  { key: 'dante', header: 'Cecil Folk', headerMedia: '5:22:40 PM' },
];

const ListExample = () => <List items={items} />;

export default ListExample;
