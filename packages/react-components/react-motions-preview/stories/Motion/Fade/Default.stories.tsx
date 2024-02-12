import * as React from 'react';
import { Fade } from '@fluentui/react-motions-preview';
import { Checkbox } from '@fluentui/react-checkbox';
import { loremIpsum } from '../loremIpsum';

export const Default = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Fade visible={visible}>
        <div>{loremIpsum(10)}</div>
      </Fade>
    </div>
  );
};
