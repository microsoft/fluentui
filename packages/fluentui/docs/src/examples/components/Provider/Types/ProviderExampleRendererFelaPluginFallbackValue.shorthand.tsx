import * as React from 'react';
import { Segment } from '@fluentui/react-northstar';

const ProviderExampleShorthand = () => (
  <>
    <Segment content="Segment with red border" styles={{ border: ['1px solid red', '1px solid invalid'] as any }} />
    <Segment content="Segment with blue border" styles={{ border: ['1px solid red', '1px solid blue'] as any }} />
  </>
);

export default ProviderExampleShorthand;
