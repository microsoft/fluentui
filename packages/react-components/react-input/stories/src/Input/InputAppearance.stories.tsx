import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, mergeClasses, tokens, useId, Input, Label } from '@fluentui/react-components';

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
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingVerticalXXL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingVerticalXXL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const Appearance = (): JSXElement => {
  const idPrefix = 'input-appearance-story';
  const inputIds = {
    default: useId(idPrefix),
    underline: useId(idPrefix),
    filledLighter: useId(idPrefix),
    filledDarker: useId(idPrefix),
  };

  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Label htmlFor={inputIds.default}>Outline appearance (default)</Label>
        <Input appearance="outline" id={inputIds.default} />
      </div>
      <div className={styles.field}>
        <Label htmlFor={inputIds.underline}>Underline appearance</Label>
        <Input appearance="underline" id={inputIds.underline} />
      </div>
      <div className={mergeClasses(styles.field, styles.filledLighter)}>
        <Label htmlFor={inputIds.filledLighter}>Filled lighter appearance (on Background 3)</Label>
        <Input appearance="filled-lighter" id={inputIds.filledLighter} placeholder="Accessible Placeholder" />
      </div>
      <div className={mergeClasses(styles.field, styles.filledDarker)}>
        <Label htmlFor={inputIds.filledDarker}>Filled darker appearance (on Background 1)</Label>
        <Input appearance="filled-darker" id={inputIds.filledDarker} placeholder="Accessible Placeholder" />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'An input can have different appearances.\n' +
        'The colors adjacent to the input should have a sufficient contrast. ' +
        'For `filled-lighter` and `filled-darker` inputs without another identifying visual cue, ' +
        'provide a descriptive placeholder with at least 4.5:1 contrast against the input background.',
    },
  },
};
