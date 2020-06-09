import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';

const AlertExampleDismissActions = () => {
  const [visible, setVisible] = useBooleanKnob({ name: 'visible', initialValue: true });

  return (
    <Alert
      actions={[
        { content: 'Privacy policy', primary: true, key: 'privacy' },
        { content: 'Dismiss', onClick: () => setVisible(false), key: 'dismiss' },
      ]}
      content="Let everyone know that they're being recorded"
      visible={visible}
    />
  );
};

export default AlertExampleDismissActions;
