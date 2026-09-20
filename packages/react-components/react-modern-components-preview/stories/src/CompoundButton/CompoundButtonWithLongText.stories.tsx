import * as React from 'react';

import { CompoundButton } from '@fluentui/react-modern-components-preview/compound-button';

const styles = {
  longText: {
    width: '280px',
  },
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
} satisfies Record<string, React.CSSProperties>;

export const WithLongText = (): React.ReactNode => (
  <div style={styles.wrapper}>
    <CompoundButton secondaryContent="Secondary content">Short text</CompoundButton>
    <CompoundButton style={styles.longText} secondaryContent="Secondary content">
      Long text wraps after it hits the max width of the component
    </CompoundButton>
  </div>
);

WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text wraps after it hits the max width of the component.',
    },
  },
};
