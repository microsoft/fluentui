import * as React from 'react';
import { Scale } from '@fluentui/react-motions-preview';
import { Checkbox } from '@fluentui/react-components';
import { loremIpsum } from '../utils/loremIpsum';

export const Default = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Scale visible={visible}>
        <div>{loremIpsum(5)}</div>
      </Scale>
    </div>
  );
};
