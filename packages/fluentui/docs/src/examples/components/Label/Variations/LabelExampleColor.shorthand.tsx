import * as React from 'react';
import { Label } from '@fluentui/react-northstar';

const LabelExampleColor = () =>
  ['black', 'white', 'brand', 'grey', 'orange', 'red', 'green', 'yellow'].map(color => (
    <span key={color}>
      <Label color={color} content={color} />{' '}
    </span>
  ));

export default LabelExampleColor;
