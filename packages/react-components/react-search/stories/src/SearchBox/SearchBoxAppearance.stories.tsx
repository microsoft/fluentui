import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, mergeClasses, SearchBox, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    gap: tokens.spacingVerticalMNudge,
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    paddingBlock: tokens.spacingVerticalMNudge,
  },
  filledFields: {
    padding: tokens.spacingVerticalXXL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.base}>
      <Field className={styles.field} label="Outline appearance (default)">
        <SearchBox appearance="outline" />
      </Field>

      <Field className={styles.field} label="Underline appearance">
        <SearchBox appearance="underline" />
      </Field>

      <Field
        className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}
        label="Filled lighter appearance (on Background 3)"
      >
        <SearchBox appearance="filled-lighter" placeholder="Search" />
      </Field>

      <Field
        className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}
        label="Filled darker appearance (on Background 1)"
      >
        <SearchBox appearance="filled-darker" placeholder="Search" />
      </Field>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A SearchBox can have different appearances.\n' +
        'Fluent design guidance places `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on ' +
        '`colorNeutralBackground1`; these surface choices are not WCAG requirements. ' +
        'Placeholder and value text need at least 4.5:1 contrast against the input background. ' +
        'Without another identifying visual cue, provide a descriptive placeholder when empty and value text when populated. ' +
        'Keep a persistent visible label and a sufficiently contrasting focus indicator.',
    },
  },
};
