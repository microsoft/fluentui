import * as React from 'react';
import { List } from '@fluentui/react-northstar';

const ellipsis = <span>&hellip;</span>;

const ListExample = () => (
  <List>
    <List.Item
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
      endMedia={ellipsis}
      selectable
      index={0}
    />
    <List.Item
      content="Use the online FTP application to input the multi-byte application!"
      endMedia={ellipsis}
      selectable
      index={1}
    />
    <List.Item
      content="The GB pixel is down, navigate the virtual interface!"
      endMedia={ellipsis}
      selectable
      index={2}
    />
  </List>
);

export default ListExample;
