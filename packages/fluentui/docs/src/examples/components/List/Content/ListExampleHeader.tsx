import * as React from 'react';
import { List } from '@fluentui/react-experimental';

const ListExample = () => (
  <List>
    <List.Item header="Irving Kuhic" index={0} />
    <List.Item header="Skyler Parks" index={1} />
    <List.Item header="Dante Schneider" index={2} />
  </List>
);

export default ListExample;
