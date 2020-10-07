import * as React from 'react';
import { List, Image } from '@fluentui/react-northstar';

const ListExampleSelectable = () => (
  <List selectable>
    <List.Item
      media={<Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/matt.jpg" avatar />}
      header="Irving Kuhic"
      headerMedia="7:26:56 AM"
      index={0}
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
    />
    <List.Item
      media={<Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/steve.jpg" avatar />}
      header="Skyler Parks"
      headerMedia="11:30:17 PM"
      index={1}
      content="Use the online FTP application to input the multi-byte application!"
    />
    <List.Item
      media={<Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/nom.jpg" avatar />}
      header="Dante Schneider"
      headerMedia="5:22:40 PM"
      index={2}
      content="The GB pixel is down, navigate the virtual interface!"
    />
  </List>
);

export default ListExampleSelectable;
