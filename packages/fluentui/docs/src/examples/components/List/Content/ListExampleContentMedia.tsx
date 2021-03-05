import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const ListExample = () => (
  <List>
    <List.Item
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
      contentMedia="7:26:56 AM"
      index={0}
    />
    <List.Item
      content="Use the online FTP application to input the multi-byte application!"
      contentMedia="11:30:17 PM"
      index={1}
    />
    <List.Item content="The GB pixel is down, navigate the virtual interface!" contentMedia="5:22:40 PM" index={2} />
  </List>
);

export default ListExample;
