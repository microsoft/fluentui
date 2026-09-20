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

export const AlignContent = (): React.ReactNode => (
  <div style={styles.root}>
    <div style={styles.example}>
      <Divider alignContent="start">start</Divider>
    </div>
    <div style={styles.example}>
      <Divider alignContent="center">center (default)</Divider>
    </div>
    <div style={styles.example}>
      <Divider alignContent="end">end</Divider>
    </div>
    <div style={styles.example}>
      <Divider alignContent="start" vertical>
        start
      </Divider>
    </div>
    <div style={styles.example}>
      <Divider alignContent="center" vertical>
        center (default)
      </Divider>
    </div>
    <div style={styles.example}>
      <Divider alignContent="end" vertical>
        end
      </Divider>
    </div>
  </div>
);

AlignContent.parameters = {
  docs: {
    description: {
      story:
        'The label associated with the divider can be aligned at the `start`, `center`, or `end` of the divider line.',
    },
  },
};
