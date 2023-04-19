import * as React from 'react';
import { Field, makeStyles, shorthands, tokens, Textarea } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    '> div': {
      marginTop: tokens.spacingVerticalMNudge,
      ...shorthands.padding(tokens.spacingHorizontalMNudge),
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
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Field label="Textarea with Outline appearance.">
        <Textarea appearance="outline" placeholder="type here..." resize="both" />
      </Field>

      <Field label="Textarea with Filled Darker appearance." className={styles.filledDarker}>
        <Textarea appearance="filled-darker" placeholder="type here..." resize="both" />
      </Field>

      <Field label="Textarea with Filled Lighter appearance." className={styles.filledLighter}>
        <Textarea appearance="filled-lighter" placeholder="type here..." resize="both" />
      </Field>
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
