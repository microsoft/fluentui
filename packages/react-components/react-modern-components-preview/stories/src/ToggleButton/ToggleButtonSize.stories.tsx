import * as React from 'react';
import {} from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-modern-components-preview/toggle-button';

const styles = {
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
} as const;

export const Size = (): React.ReactNode => {
  return (
    <div style={styles.wrapper}>
      <ToggleButton size="small">Size: small</ToggleButton>
      <ToggleButton size="medium">Size: medium</ToggleButton>
      <ToggleButton size="large">Size: large</ToggleButton>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A toggle button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
