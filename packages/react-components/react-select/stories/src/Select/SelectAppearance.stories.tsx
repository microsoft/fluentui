import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, mergeClasses, Select, tokens, useId } from '@fluentui/react-components';

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
  const selectId = useId();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={`${selectId}-outline`}>Outline</label>
        <Select id={`${selectId}-outline`} appearance="outline">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${selectId}-underline`}>Underline</label>
        <Select id={`${selectId}-underline`} appearance="underline">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}>
        <label htmlFor={`${selectId}-filledLighter`}>Filled Lighter (on Background 3)</label>
        <Select id={`${selectId}-filledLighter`} appearance="filled-lighter">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}>
        <label htmlFor={`${selectId}-filledDarker`}>Filled Darker (on Background 1)</label>
        <Select id={`${selectId}-filledDarker`} appearance="filled-darker">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'Select can have different appearances.\n' +
        'Place filled-lighter on colorNeutralBackground3 and filled-darker on colorNeutralBackground1. ' +
        'Without another identifying visual cue, keep a visible selected option with at least 4.5:1 text contrast ' +
        'against the control background. Native Select does not support a placeholder.',
    },
  },
};
