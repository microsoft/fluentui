import * as React from 'react';

import { FocusTrapZone } from '@fluentui/react';
import { useUncontrolledFocus, Field, Switch, Button } from '@fluentui/react-components';

import styles from './Default.module.css';

export const Default = () => {
  const attr = useUncontrolledFocus();

  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className={styles.container}>
      <Button>Outside</Button>

      <FocusTrapZone
        {...attr}
        className={styles.focusTrapZone}
        disabled={!enabled}
        isClickableOutsideFocusTrap
        forceFocusInsideTrap={false}
      >
        <Field label="Enable focus trap">
          <Switch checked={enabled} onChange={(e, data) => setEnabled(data.checked)} />
        </Field>

        <div className={styles.controls}>
          <Button>{enabled ? 'Trapped' : 'Not trapped'}</Button>
          <Button>{enabled ? 'Trapped' : 'Not trapped'}</Button>
        </div>
      </FocusTrapZone>

      <Button>Outside</Button>
    </div>
  );
};
