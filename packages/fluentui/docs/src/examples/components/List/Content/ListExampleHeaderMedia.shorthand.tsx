import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  { key: 'robert', header: 'Robert Tolbert', headerMedia: '7:26:56 AM' },
  { key: 'celeste', header: 'Celeste Burton', headerMedia: '11:30:17 PM' },
  { key: 'cecil', header: 'Cecil Folk', headerMedia: '5:22:40 PM' },
];

const ListExample = () => <List items={items} />;

export default ListExample;
