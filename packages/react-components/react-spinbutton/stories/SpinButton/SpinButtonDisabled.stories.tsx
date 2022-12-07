import * as React from 'react';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

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

export const Disabled = () => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Disabled</Label>
      <SpinButton disabled id={id} />
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `SpinButton can be disabled.`,
    },
  },
};
