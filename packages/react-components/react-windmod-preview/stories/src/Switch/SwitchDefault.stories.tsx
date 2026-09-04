import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Switch } from '@fluentui/react-windmod-preview/switch';

import styles from '../compare.module.css';

const sizes = ['medium', 'small'] as const;
const positions = ['after', 'before', 'above'] as const;

const Controlled = () => {
  const [checked, setChecked] = React.useState(false);

  return <Switch checked={checked} label="Controlled" onChange={(_, data) => setChecked(data.checked)} />;
};

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        <Switch label="Off" />
        <Switch defaultChecked label="On" />
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Switch key={size} defaultChecked label="Hello" size={size} />
        ))}
      </div>
      <div className={styles.row}>
        {positions.map(labelPosition => (
          <Switch key={labelPosition} defaultChecked label={labelPosition} labelPosition={labelPosition} />
        ))}
      </div>
      <div className={styles.row}>
        <Switch />
        <Switch defaultChecked />
      </div>
      <div className={styles.row}>
        <Switch disabled label="Disabled" />
        <Switch defaultChecked disabled label="Disabled on" />
        <Switch disabledFocusable label="Disabled focusable" />
        <Switch defaultChecked disabledFocusable label="Disabled focusable on" />
      </div>
      <div className={styles.row}>
        <Controlled />
      </div>
    </div>
  </FluentProvider>
);
