import { ItemLayout, Image } from '@fluentui/react-northstar';
import * as React from 'react';

const ItemLayoutExampleSelectionShorthand = () => {
  return (
    <ItemLayout
      media={
        <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg" avatar />
      }
      header="Robert Tolbert"
      headerMedia="7:26:56 AM"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
    />
  );
};

export default ItemLayoutExampleSelectionShorthand;
