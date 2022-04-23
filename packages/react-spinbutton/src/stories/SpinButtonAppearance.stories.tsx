import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',

    [`> * + *`]: {
      marginTop: '10px',
    },

    [`> div`]: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '2px',
    },
  },
  // ideally should match doc site, #faf9f8
  filledLighter: { backgroundColor: tokens.colorNeutralBackground2 },
  filledDarker: { backgroundColor: tokens.colorNeutralBackground1 },
});

export const Appearance = () => {
  const styles = useStyles();

  const outlineId = useId('outline-id');
  const underlineId = useId('underline-id');
  const filledLighterId = useId('filledLighter-id');
  const filledDarkerId = useId('filledDarker-id');

  return (
    <div className={styles.root}>
      <div>
        <Label htmlFor={outlineId}>Outline (default)</Label>
        <SpinButton id={outlineId} />
      </div>

      <div>
        <Label htmlFor={underlineId}>Underline</Label>
        <SpinButton appearance="underline" id={underlineId} />
      </div>

      <div className={styles.filledLighter}>
        <Label htmlFor={filledLighterId}>Filled Lighter</Label>
        <SpinButton appearance="filledLighter" id={filledLighterId} />
      </div>

      <div className={styles.filledDarker}>
        <Label htmlFor={filledDarkerId}>Filled Darker</Label>
        <SpinButton appearance="filledDarker" id={filledDarkerId} />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: `SpinButton can have different appearances.`,
    },
  },
};
