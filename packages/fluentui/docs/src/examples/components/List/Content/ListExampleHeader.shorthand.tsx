import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  { key: 'irving', header: 'Robert Tolbert' },
  { key: 'skyler', header: 'Celeste Burton' },
  { key: 'dante', header: 'Cecil Folk' },
];

const ListExample = () => <List items={items} />;

export default ListExample;
