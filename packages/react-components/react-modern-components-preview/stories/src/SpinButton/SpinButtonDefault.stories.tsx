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

export const Default = (): React.ReactNode => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Default SpinButton</Label>
      <SpinButton defaultValue={10} min={0} max={20} id={id} />
    </div>
  );
};
