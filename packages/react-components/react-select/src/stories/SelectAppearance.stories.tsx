import * as React from 'react';
import { Select } from '../index';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    ...shorthands.padding(tokens.spacingVerticalMNudge, tokens.spacingHorizontalMNudge),
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

      <div className={mergeClasses(styles.field, styles.filledLighter)}>
        <label htmlFor={`${selectId}-filledLighter`}>Filled Lighter</label>
        <Select id={`${selectId}-filledLighter`} appearance="filledLighter">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>

      <div className={mergeClasses(styles.field, styles.filledDarker)}>
        <label htmlFor={`${selectId}-filledDarker`}>Filled Darker</label>
        <Select id={`${selectId}-filledDarker`} appearance="filledDarker">
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
        `Select can have different appearances.\n` +
        `The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with
    filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
    surrounding color to pass accessibility requirements.`,
    },
  },
};
