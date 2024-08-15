import * as React from 'react';
import { Dropdown, makeStyles, Option, tokens, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '20px',
    maxWidth: '400px',
    '> div': {
      display: 'grid',
      gridTemplateRows: 'repeat(1fr)',
      justifyItems: 'start',
      gap: '2px',
      // need padding to see the background color for filled variants
      padding: '5px 20px 10px',
    },
  },
  // filledLighter and filledDarker appearances depend on particular background colors
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
    '> h3': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
    '> h3': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
});

export const Appearance = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <h3>Outline</h3>
        <label id={`${dropdownId}-outline`}>Select an animal</label>
        <Dropdown aria-labelledby={`${dropdownId}-outline`} placeholder="-" appearance="outline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Underline</h3>
        <label id={`${dropdownId}-underline`}>Select an animal</label>
        <Dropdown aria-labelledby={`${dropdownId}-underline`} placeholder="-" appearance="underline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={styles.filledDarker}>
        <h3>Filled Darker</h3>
        <label id={`${dropdownId}-filledDarker`}>Select an animal</label>
        <Dropdown aria-labelledby={`${dropdownId}-filledDarker`} placeholder="-" appearance="filled-darker" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={styles.filledLighter}>
        <h3>Filled Lighter</h3>
        <label id={`${dropdownId}-filledLighter`}>Select an animal</label>
        <Dropdown
          aria-labelledby={`${dropdownId}-filledLighter`}
          placeholder="-"
          appearance="filled-lighter"
          {...props}
        >
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A Dropdown can have the following `appearance` variants:\n' +
        '- `outline` (default): has a border around all four sides.\n' +
        '- `underline`: only has a bottom border.\n' +
        '- `filled-darker`: no border, only a subtle background color difference against a white page.\n' +
        '- `filled-lighter`: no border, and a white background.\n',
    },
  },
};
