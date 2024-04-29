import { useBooleanKnob } from '@fluentui/docs-components';
import { Alert } from '@fluentui/react-northstar';
import * as React from 'react';

const AlertExampleDismissible = () => {
  const [visible, setVisible] = useBooleanKnob({ name: 'visible', initialValue: true });

  return (
    <Alert
      content="This is a special notification which you can dismiss if you're bored with it."
      dismissible
      onVisibleChange={() => setVisible(false)}
      dismissAction={{ 'aria-label': 'close' }}
      visible={visible}
    />
  );
};

export default AlertExampleDismissible;
