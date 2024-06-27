import * as React from 'react';
import { Field, makeStyles, mergeClasses, tokens, Textarea } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
  invertedLabel: {
    color: tokens.colorNeutralForegroundInverted2,
  },
  fieldWrapper: {
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div className={styles.fieldWrapper}>
        <Field label="Textarea with Outline appearance">
          <Textarea appearance="outline" placeholder="type here..." resize="both" />
        </Field>
      </div>

      <div className={mergeClasses(styles.fieldWrapper, styles.inverted)}>
        <Field label={{ children: 'Textarea with Filled Darker appearance', className: styles.invertedLabel }}>
          <Textarea appearance="filled-darker" placeholder="type here..." resize="both" />
        </Field>
      </div>

      <div className={mergeClasses(styles.fieldWrapper, styles.inverted)}>
        <Field label={{ children: 'Textarea with Filled Lighter appearance', className: styles.invertedLabel }}>
          <Textarea appearance="filled-lighter" placeholder="type here..." resize="both" />
        </Field>
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
