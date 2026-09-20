import * as React from 'react';
import {} from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-modern-components-preview/toggle-button';

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
} as const;

export const WithLongText = (): React.ReactNode => {
  return (
    <div style={styles.wrapper}>
      <ToggleButton>Short text</ToggleButton>
      <ToggleButton style={styles.longText}>Long text wraps after it hits the max width of the component</ToggleButton>
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
