import * as React from 'react';

import { makeStyles, tokens, useId, Label } from '@fluentui/react-components';
import { SpinButton } from '@fluentui/react-modern-components-preview/spin-button';

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

export const Uncontrolled = (): React.ReactNode => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Uncontrolled SpinButton</Label>
      <SpinButton defaultValue={10} id={id} />
    </div>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story: `An uncontrolled SpinButton`,
    },
  },
};
