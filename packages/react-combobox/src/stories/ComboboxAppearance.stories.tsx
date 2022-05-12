import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { Combobox, ComboboxProps, Option } from '../index';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    maxWidth: '400px',
    '> div': {
      // Stack the label above the field (with 2px gap per the design system)
      display: 'flex',
      flexDirection: 'column',
      ...shorthands.gap('2px'),
      // Align the examples horizontally to all match the extra padding on filled examples (below)
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  // filledLighter and filledDarker appearances depend on particular background colors
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius('20px'),
    ...shorthands.padding('20px'),
  },
  // By default this will match the example background, so don't add padding above
  filledDarker: { backgroundColor: tokens.colorNeutralBackground1, paddingBottom: '20px' },
});

export const Appearance = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <label id={`${comboId}-outline`}>Outline</label>
        <Combobox aria-labelledby={`${comboId}-outline`} placeholder="Select a color" appearance="outline" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label id={`${comboId}-underline`}>Underline</label>
        <Combobox
          aria-labelledby={`${comboId}-underline`}
          placeholder="Select a color"
          appearance="underline"
          {...props}
        >
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div className={styles.filledDarker}>
        <label id={`${comboId}-filledDarker`}>Filled Darker</label>
        <Combobox
          aria-labelledby={`${comboId}-filledDarker`}
          placeholder="Select a color"
          appearance="filledDarker"
          {...props}
        >
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div className={styles.filledLighter}>
        <label id={`${comboId}-filledLighter`}>Filled Lighter</label>
        <Combobox
          aria-labelledby={`${comboId}-filledLighter`}
          placeholder="Select a color"
          appearance="filledLighter"
          {...props}
        >
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A Combobox can have the following `appearance` variants:\n' +
        '- `outline` (default): has a border around all four sides.\n' +
        '- `underline`: only has a bottom border.\n' +
        '- `filledDarker`: no border, only a subtle background color difference against a white page.\n' +
        '- `filledLighter`: no border, and a white background.\n',
    },
  },
};
