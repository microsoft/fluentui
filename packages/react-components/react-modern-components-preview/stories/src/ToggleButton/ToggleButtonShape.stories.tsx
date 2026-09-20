import * as React from 'react';
import {} from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-modern-components-preview/toggle-button';

const styles = {
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
} as const;

export const Shape = (): React.ReactNode => {
  return (
    <div style={styles.wrapper}>
      <ToggleButton>Rounded</ToggleButton>
      <ToggleButton shape="circular">Circular</ToggleButton>
      <ToggleButton shape="square">Square</ToggleButton>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'A toggle button can be rounded, circular, or square.',
    },
  },
};
