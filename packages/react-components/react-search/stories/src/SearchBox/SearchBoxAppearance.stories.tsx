import * as React from 'react';
import { Field, makeStyles, mergeClasses, SearchBox, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
  filledLighterLabel: {
    color: tokens.colorNeutralForegroundInverted2,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
  filledDarkerLabel: {
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
      <Field className={styles.fieldWrapper} label="Outline appearance (default)">
        <SearchBox appearance="outline" />
      </Field>

      <Field className={styles.fieldWrapper} label="Underline appearance">
        <SearchBox appearance="underline" />
      </Field>

      <Field
        className={mergeClasses(styles.fieldWrapper, styles.filledLighter)}
        label={{ children: 'Filled lighter appearance', className: styles.filledLighterLabel }}
      >
        <SearchBox appearance="filled-lighter" />
      </Field>

      <Field
        className={mergeClasses(styles.fieldWrapper, styles.filledDarker)}
        label={{ children: 'Filled darker appearance', className: styles.filledDarkerLabel }}
      >
        <SearchBox appearance="filled-darker" />
      </Field>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A SearchBox can have different appearances.\n' +
        `The colors adjacent to the SearchBox should have a sufficient contrast. Particularly, the color of SearchBox with
      filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
      surrounding color to pass accessibility requirements.`,
    },
  },
};
