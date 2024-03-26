import * as React from 'react';
import { Collapse } from '@fluentui/react-motions-preview';
import { Checkbox } from '@fluentui/react-components';
import { loremIpsum } from '../loremIpsum';

export const Default = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse visible={visible}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};
