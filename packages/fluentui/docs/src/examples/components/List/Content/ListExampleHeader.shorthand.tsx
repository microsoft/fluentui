import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  { key: 'robert', header: 'Robert Tolbert' },
  { key: 'celeste', header: 'Celeste Burton' },
  { key: 'cecil', header: 'Cecil Folk' },
];

const ListExample = () => <List items={items} />;

export default ListExample;
