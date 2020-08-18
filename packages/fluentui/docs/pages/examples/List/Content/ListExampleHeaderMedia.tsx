import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const ListExample = () => (
  <List>
    <List.Item header="Irving Kuhic" headerMedia="7:26:56 AM" index={0} />
    <List.Item header="Skyler Parks" headerMedia="11:30:17 PM" index={1} />
    <List.Item header="Dante Schneider" headerMedia="5:22:40 PM" index={2} />
  </List>
);

export default ListExample;
