import * as React from 'react';
import { ItemLayout } from '@fluentui/react-northstar';

const ellipsis = <span>&hellip;</span>;

const ItemLayoutExampleEndMediaShorthand = () => (
  <ItemLayout content="Program the sensor to the SAS alarm through the haptic SQL card!" endMedia={ellipsis} />
);

export default ItemLayoutExampleEndMediaShorthand;
