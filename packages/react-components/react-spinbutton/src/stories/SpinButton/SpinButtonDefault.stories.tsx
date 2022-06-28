import * as React from 'react';
import { SpinButton } from '@fluentui/react-spinbutton';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Default = () => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Default SpinButton</Label>
      <SpinButton defaultValue={10} id={id} />
    </div>
  );
};
