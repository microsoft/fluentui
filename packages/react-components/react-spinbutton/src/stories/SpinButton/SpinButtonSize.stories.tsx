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

    '> div': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: tokens.spacingHorizontalMNudge,
    },

    '> div:first-child': {
      marginTop: '0px',
    },

    '> div label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Size = () => {
  const layoutStyles = useLayoutStyles();
  const smallId = useId('small-id');
  const mediumId = useId('medium-id');

  return (
    <div className={layoutStyles.base}>
      <div>
        <Label htmlFor={smallId}>Small</Label>
        <SpinButton size="small" id={smallId} />
      </div>

      <div>
        <Label htmlFor={mediumId}>Medium (default)</Label>
        <SpinButton id={mediumId} />
      </div>
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
