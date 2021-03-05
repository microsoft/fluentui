import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const ListExample = () => (
  <List>
    <List.Item
      header="Robert Tolbert"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
      index={0}
    />
    <List.Item
      header="Celeste Burton"
      content="Use the online FTP application to input the multi-byte application!"
      index={1}
    />
    <List.Item header="Cecil Folk" content="The GB pixel is down, navigate the virtual interface!" index={2} />
  </List>
);

export default ListExample;
