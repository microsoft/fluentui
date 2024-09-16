import * as React from 'react';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

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
