import * as React from 'react';
import { ItemLayout, Image } from '@fluentui/react-northstar';

const ItemLayoutExampleMediaShorthand = () => (
  <ItemLayout
    media={<Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" avatar />}
    header="Cecil Folk"
    headerMedia="5:22:40 PM"
    content="The GB pixel is down, navigate the virtual interface!"
  />
);

export default ItemLayoutExampleMediaShorthand;
