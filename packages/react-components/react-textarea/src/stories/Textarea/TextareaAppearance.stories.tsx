import * as React from 'react';
import { makeStyles, shorthands, tokens, useId, Label, Textarea } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',

    '> div': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: tokens.spacingVerticalMNudge,
      ...shorthands.padding(tokens.spacingHorizontalMNudge),
    },

    '> div > label': {
      marginBottom: tokens.spacingHorizontalXXS,
      marginLeft: tokens.spacingHorizontalMNudge,
    },
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
});

export const Appearance = () => {
  const outlineId = useId('textarea-outline');
  const filledDarkerId = useId('textarea-filleddarker');
  const filledLighterId = useId('textarea-filledlighter');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div>
        <Label htmlFor={outlineId}>Textarea with Outline appearance.</Label>
        <Textarea id={outlineId} appearance="outline" placeholder="type here..." resize="both" />
      </div>

      <div className={styles.filledDarker}>
        <Label htmlFor={filledDarkerId}>Textarea with Filled Darker appearance.</Label>
        <Textarea id={filledDarkerId} appearance="filled-darker" placeholder="type here..." resize="both" />
      </div>

      <div className={styles.filledLighter}>
        <Label htmlFor={filledLighterId}>Textarea with Filled Lighter appearance.</Label>
        <Textarea id={filledLighterId} appearance="filled-lighter" placeholder="type here..." resize="both" />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        `Textarea can have different appearances.\n` +
        `The colors adjacent to the Textarea should have a sufficient contrast. Particularly, the color of input with
      filled darker and lighter styles needs to provide a contrast ratio greater than 3 to 1 against the immediate
      surrounding color to pass accessibility requirement.`,
    },
  },
};
