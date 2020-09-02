import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const items = [
  { key: 'irving', header: 'Irving Kuhic' },
  { key: 'skyler', header: 'Skyler Parks' },
  { key: 'dante', header: 'Dante Schneider' },
];

const ListExample = () => <List items={items} />;

export default ListExample;
