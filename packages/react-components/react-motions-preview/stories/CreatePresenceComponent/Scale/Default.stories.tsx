import * as React from 'react';
import { Scale } from '@fluentui/react-motions-preview';
import { Checkbox } from '@fluentui/react-components';
import { loremIpsum } from '../utils/loremIpsum';

export const Default = () => {
  const [visible, setVisible] = React.useState(false);
  const [unmountOnExit, setUnmountOnExit] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Checkbox label="unmount on exit" checked={unmountOnExit} onChange={() => setUnmountOnExit(v => !v)} />
      <Scale {...{ visible, unmountOnExit }}>
        <div style={{ padding: 8 }}>{loremIpsum(5)}</div>
      </Scale>
    </div>
  );
};
