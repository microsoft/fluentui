import { useRangeKnob } from '@fluentui/docs-components';
import { Alert } from '@fluentui/react-northstar';
import * as React from 'react';
import { ScreencastIcon } from '@fluentui/react-icons-northstar';

const AlertExampleWidth = () => {
  const [width] = useRangeKnob({
    name: 'width',
    min: '350px',
    max: '800px',
    initialValue: '500px',
    step: '10px',
  });

  return (
    <div style={{ width }}>
      <Alert
        actions={[{ content: 'Join and add the room', primary: true, key: 'content-1' }]}
        header="There is a conference room close to you."
        dismissible
        dismissAction={{ 'aria-label': 'close' }}
        icon={<ScreencastIcon />}
      />
    </div>
  );
};

export default AlertExampleWidth;
