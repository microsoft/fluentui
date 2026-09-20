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

export const Default = (): React.ReactNode => (
  <div style={styles.root}>
    <div style={styles.example}>
      <Divider />
    </div>
    <div style={styles.example}>
      <Divider>Text</Divider>
    </div>
  </div>
);
