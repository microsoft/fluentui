import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const ListExample = () => (
  <List>
    <List.Item header="Robert Tolbert" headerMedia="7:26:56 AM" index={0} />
    <List.Item header="Celeste Burton" headerMedia="11:30:17 PM" index={1} />
    <List.Item header="Cecil Folk" headerMedia="5:22:40 PM" index={2} />
  </List>
);

export default ListExample;
