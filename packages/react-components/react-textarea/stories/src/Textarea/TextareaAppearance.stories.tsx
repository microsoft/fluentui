import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, mergeClasses, tokens, Textarea } from '@fluentui/react-components';

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
        <Textarea appearance="outline" placeholder="type here..." resize="both" />
      </Field>

      <Field
        className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}
        label="Filled darker appearance (on Background 1)"
      >
        <Textarea appearance="filled-darker" placeholder="type here..." resize="both" />
      </Field>

      <Field
        className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}
        label="Filled lighter appearance (on Background 3)"
      >
        <Textarea appearance="filled-lighter" placeholder="type here..." resize="both" />
      </Field>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'Textarea can have different appearances.\n' +
        'Fluent design guidance places `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on ' +
        '`colorNeutralBackground1`; these surface choices are not WCAG requirements. ' +
        'Placeholder and value text need at least 4.5:1 contrast against the textarea background. ' +
        'Visible text can identify a control without a contrasting boundary, but readability alone does not ensure identification. ' +
        'When no other cue identifies an empty control, provide a boundary with at least 3:1 contrast against its surroundings.',
    },
  },
};
