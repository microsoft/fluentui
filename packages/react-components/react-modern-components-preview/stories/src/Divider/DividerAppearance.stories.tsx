import * as React from 'react';

import { tokens } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-modern-components-preview/divider';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
} satisfies Record<string, React.CSSProperties>;

export const Appearance = (): React.ReactNode => (
  <div style={styles.root}>
    <div style={styles.example}>
      <Divider>(default)</Divider>
    </div>
    <div style={styles.example}>
      <Divider appearance="subtle">subtle</Divider>
    </div>
    <div style={styles.example}>
      <Divider appearance="brand">brand</Divider>
    </div>
    <div style={styles.example}>
      <Divider appearance="strong">strong</Divider>
    </div>
  </div>
);

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A divider can have a `brand`, `subtle`, or `strong` appearance.' +
        ' When not specified, it has its default experience.',
    },
  },
};
