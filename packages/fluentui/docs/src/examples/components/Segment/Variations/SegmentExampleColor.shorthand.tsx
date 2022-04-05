import * as React from 'react';
import * as _ from 'lodash';
import { Segment, ProviderConsumer } from '@fluentui/react-northstar';

const SegmentExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { contextualColors, naturalColors } }) =>
      _.keys({ ...contextualColors, ...naturalColors }).map(color => (
        <Segment key={color} color={color} content={_.startCase(color)} inverted />
      ))
    }
  />
);

export default SegmentExampleColor;
