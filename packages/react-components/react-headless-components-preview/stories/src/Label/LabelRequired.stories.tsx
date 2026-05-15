import * as React from 'react';
import { Label } from '@fluentui/react-headless-components-preview/label';
import styles from './label.module.css';

export const Required = (): React.ReactNode => (
  <div className={styles.demo}>
    <Label className={styles.label} required>
      Required label
    </Label>
    <Label className={styles.label} required={{ className: styles.required, children: '***' }}>
      Required label with custom indicator
    </Label>
  </div>
);

Required.parameters = {
  docs: {
    description: {
      story:
        'A Label can display a required asterisk or a custom required indicator. This custom required indicator can' +
        'be a custom string or jsx content.',
    },
  },
};
