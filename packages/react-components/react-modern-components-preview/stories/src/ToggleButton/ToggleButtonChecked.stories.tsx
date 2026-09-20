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

export const Checked = (): React.ReactNode => {
  return (
    <div style={styles.wrapper}>
      <ToggleButton checked={true}>Controlled checked state</ToggleButton>
      <ToggleButton checked={false}>Controlled unchecked state</ToggleButton>
    </div>
  );
};

Checked.parameters = {
  docs: {
    description: {
      story: `A toggle button can be checked or unchecked. Unchecked is default.
      If a checked value is given, the button is 'controlled' and will only change state when the
      props value changes.`,
    },
  },
};
