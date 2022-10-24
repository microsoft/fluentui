import * as React from 'react';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <ToggleButton>Default</ToggleButton>
      <ToggleButton appearance="primary">Primary</ToggleButton>
      <ToggleButton appearance="outline">Outline</ToggleButton>
      <ToggleButton appearance="subtle">Subtle</ToggleButton>
      <ToggleButton appearance="transparent">Transparent</ToggleButton>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the toggle button appears with the default style\n' +
        '- `primary`: emphasizes the toggle button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
