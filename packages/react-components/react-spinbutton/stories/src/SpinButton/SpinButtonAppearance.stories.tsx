import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, mergeClasses, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

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

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}>
        <Label htmlFor={filledLighterId}>Filled Lighter (on Background 3)</Label>
        <SpinButton appearance="filled-lighter" id={filledLighterId} placeholder="Enter a number" />
      </div>

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}>
        <Label htmlFor={filledDarkerId}>Filled Darker (on Background 1)</Label>
        <SpinButton appearance="filled-darker" id={filledDarkerId} placeholder="Enter a number" />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'SpinButton can have different appearances.\n' +
        'Fluent design guidance places `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on ' +
        '`colorNeutralBackground1`; these surface choices are not WCAG requirements. ' +
        'Placeholder and value text need at least 4.5:1 contrast against the input background. ' +
        'The filled examples show a placeholder when cleared. ' +
        'Without another identifying visual cue, provide a descriptive placeholder when empty and value text when populated. ' +
        'Keep a persistent visible label and a sufficiently contrasting focus indicator.',
    },
  },
};
