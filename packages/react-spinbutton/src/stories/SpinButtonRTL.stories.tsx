import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { FluentProvider } from '@fluentui/react-provider';
import { makeStyles } from '@griffel/react';

const useLayout = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2px',
  },
});

export const RTL = () => {
  const layoutStyles = useLayout();
  const id = useId();

  return (
    <FluentProvider dir="rtl" className={layoutStyles.root}>
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
