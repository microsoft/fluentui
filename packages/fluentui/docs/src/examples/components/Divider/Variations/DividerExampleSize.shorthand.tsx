import * as _ from 'lodash';
import * as React from 'react';
import { Divider } from '@fluentui/react-northstar';

const DividerExampleSize = () =>
  _.times(11, i => {
    const size = i;

    return <Divider key={size} size={size} content={`Size ${size}`} />;
  });

export default DividerExampleSize;
