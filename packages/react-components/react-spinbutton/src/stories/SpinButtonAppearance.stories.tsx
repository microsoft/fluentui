import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    ...shorthands.padding(tokens.spacingHorizontalMNudge),
  },

  filledLighter: {
    backgroundColor: tokens.colorPaletteBerryForeground1,
    '> label': {
      color: tokens.colorNeutralForegroundInverted,
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorPaletteBerryForeground1,
    '> label': {
      color: tokens.colorNeutralForegroundInverted,
    },
  },
});

export const Appearance = () => {
  const styles = useStyles();

  const outlineId = useId('outline-id');
  const underlineId = useId('underline-id');
  const filledLighterId = useId('filledLighter-id');
  const filledDarkerId = useId('filledDarker-id');

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Label htmlFor={outlineId}>Outline (default)</Label>
        <SpinButton id={outlineId} />
      </div>

      <div className={styles.field}>
        <Label htmlFor={underlineId}>Underline</Label>
        <SpinButton appearance="underline" id={underlineId} />
      </div>

      <div className={mergeClasses(styles.field, styles.filledLighter)}>
        <Label htmlFor={filledLighterId}>Filled Lighter</Label>
        <SpinButton appearance="filled-lighter" id={filledLighterId} />
      </div>

      <div className={mergeClasses(styles.field, styles.filledDarker)}>
        <Label htmlFor={filledDarkerId}>Filled Darker</Label>
        <SpinButton appearance="filled-darker" id={filledDarkerId} />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        `SpinButton can have different appearances.\n` +
        `The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with
      filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
      surrounding color to pass accessibility requirements.`,
    },
  },
};
