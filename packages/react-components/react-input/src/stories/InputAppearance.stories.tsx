import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Input } from '../index';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    ...shorthands.padding(tokens.spacingHorizontalMNudge),
  },
  filledLighter: {
    backgroundColor: '#8a8a8a',
    '> label': {
      color: '#000000',
    },
  },
  filledDarker: {
    backgroundColor: '#8a8a8a',
    '> label': {
      color: '#000000',
    },
  },
});

export const Appearance = () => {
  const outlineId = useId('input-outline');
  const underlineId = useId('input-underline');
  const filledLighterId = useId('input-filledLighter');
  const filledDarkerId = useId('input-filledDarker');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Label htmlFor={outlineId}>Outline Input Appearance (default)</Label>
        <Input appearance="outline" id={outlineId} />
      </div>

      <div className={styles.field}>
        <Label htmlFor={underlineId}>Underline Input Appearance </Label>
        <Input appearance="underline" id={underlineId} />
      </div>

      <div className={mergeClasses(styles.field, styles.filledLighter)}>
        <Label htmlFor={filledLighterId}>Filled Lighter Input Appearance </Label>
        <Input appearance="filledLighter" id={filledLighterId} />
      </div>

      <div className={mergeClasses(styles.field, styles.filledDarker)}>
        <Label htmlFor={filledDarkerId}>Filled Darker Input Appearance </Label>
        <Input appearance="filledDarker" id={filledDarkerId} />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'An input can have different appearances.\n' +
        `The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with
      filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
      surrounding color to pass accessibility requirements.`,
    },
  },
};
