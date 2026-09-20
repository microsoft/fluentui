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

export const ReadOnly = (): React.ReactNode => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Read-Only</Label>
      <SpinButton readOnly id={id} />
    </div>
  );
};

ReadOnly.parameters = {
  docs: {
    description: {
      story: [
        'SpinButton can be read-only which prevents user input',
        'but still allows the component to be focused and read by assistive technologies.',
        'This is different from disabled, which prevents all interaction with the component.',
      ].join(' '),
    },
  },
};
