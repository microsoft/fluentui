import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';

const useLayout = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',

    [`> * + label`]: {
      marginTop: '10px',
    },
  },
});

export const Size = () => {
  const layoutStyles = useLayout();
  const smallId = useId('small-id');
  const mediumId = useId('medium-id');

  return (
    <div className={layoutStyles.root}>
      <Label htmlFor={smallId}>Small</Label>
      <SpinButton size="small" id={smallId} />

      <Label htmlFor={mediumId}>Medium (default)</Label>
      <SpinButton id={mediumId} />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: `SpinButton can have different sizes.`,
    },
  },
};
