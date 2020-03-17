import * as React from 'react';
import { Segment } from '@fluentui/react-future';

const SegmentExampleInvertedShorthand = () => (
  <div>
    <Segment content="Colored segment." color="red" />
    <br />
    <Segment inverted content="Colored inverted segment." color="red" />
  </div>
);

export default SegmentExampleInvertedShorthand;
