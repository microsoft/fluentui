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

export const Inset = (): React.ReactNode => (
  <div style={styles.root}>
    <div style={styles.example}>
      <Divider inset />
    </div>
    <div style={styles.example}>
      <Divider inset>Text</Divider>
    </div>
    <div style={styles.example}>
      <Divider inset vertical style={{ height: '100%' }} />
    </div>
    <div style={styles.example}>
      <Divider inset vertical style={{ height: '100%' }}>
        Text
      </Divider>
    </div>
  </div>
);

Inset.parameters = {
  docs: {
    description: {
      story: 'A divider can have its line inset from the edges of its container.',
    },
  },
};
