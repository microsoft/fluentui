import * as React from 'react';
import { ItemLayout, Image } from '@fluentui/react-northstar';

const ItemLayoutExampleMediaShorthand = () => (
  <ItemLayout
    media={<Image src="public/images/avatar/small/nom.jpg" avatar />}
    header="Dante Schneider"
    headerMedia="5:22:40 PM"
    content="The GB pixel is down, navigate the virtual interface!"
  />
);

export default ItemLayoutExampleMediaShorthand;
