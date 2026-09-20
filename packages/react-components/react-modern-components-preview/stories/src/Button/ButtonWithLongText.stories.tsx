import * as React from 'react';

import { Button } from '@fluentui/react-modern-components-preview/button';

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
};

export const WithLongText = (): React.ReactNode => {
  return (
    <div style={styles.wrapper}>
      <Button>Short text</Button>
      <Button style={styles.longText}>Long text wraps after it hits the max width of the component</Button>
    </div>
  );
};

WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text wraps after it hits the max width of the component.',
    },
  },
};
