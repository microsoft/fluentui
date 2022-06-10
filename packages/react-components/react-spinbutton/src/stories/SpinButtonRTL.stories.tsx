import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { FluentProvider } from '@fluentui/react-provider';
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

export const RTL = () => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <FluentProvider dir="rtl" className={layoutStyles.base}>
      <Label htmlFor={id}>Right-to-Left Layout</Label>
      <SpinButton id={id} />
    </FluentProvider>
  );
};

RTL.parameters = {
  docs: {
    description: {
      story: `SpinButton supports right-to-left (RTL) layout.`,
    },
  },
};
