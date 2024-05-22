import * as React from 'react';
import {
  Combobox,
  makeStyles,
  Option,
  shorthands,
  tokens,
  useId,
  webLightTheme,
  Theme,
  FluentProvider,
} from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const customTheme: Theme = {
  ...webLightTheme,
  ctrlComboboxBorderRadius: '10px',
  comboboxForegroundColor: 'white',
  comboboxPlaceholderForegroundColor: 'teal',

  ctrlComboboxBottomBorderColorRest: 'red',
  ctrlComboboxBottomBorderColorPressed: 'green',

  ctrlComboboxOutlineBackgroundColorRest: 'yellow',
  ctrlComboboxOutlineBorderColorRest: 'purple',
  ctrlComboboxOutlineBorderColorHover: 'orange',
  ctrlComboboxOutlineBottomBorderColor: 'blue',
  ctrlComboBoxOutlineBottomBorderColor: 'violet',

  ctrlComboboxUnderlineBackgroundColor: 'cyan',
  ctrlComboboxUnderlineBottomBorderColor: 'magenta',
};

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('20px'),
    maxWidth: '400px',
    '> div': {
      display: 'grid',
      gridTemplateRows: 'repeat(1fr)',
      justifyItems: 'start',
      ...shorthands.gap('2px'),
      // need padding to see the background color for filled variants
      ...shorthands.padding('5px', '20px', '10px'),
    },
  },
  // filledLighter and filledDarker appearances depend on particular background colors
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
});

export const Appearance = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <>
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
            appearance="filled-darker"
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
            appearance="filled-lighter"
            {...props}
          >
            <Option>Red</Option>
            <Option>Green</Option>
            <Option>Blue</Option>
          </Combobox>
        </div>
      </div>
      <FluentProvider className={styles.root} theme={customTheme}>
        <div>
          <label id={`${comboId}-outline`}>Custom Outline</label>
          <Combobox aria-labelledby={`${comboId}-outline`} placeholder="Select a color" appearance="outline" {...props}>
            <Option>Red</Option>
            <Option>Green</Option>
            <Option>Blue</Option>
          </Combobox>
        </div>

        <div>
          <label id={`${comboId}-underline`}>Custom Underline</label>
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
          <label id={`${comboId}-filledDarker`}>Custom Filled Darker</label>
          <Combobox
            aria-labelledby={`${comboId}-filledDarker`}
            placeholder="Select a color"
            appearance="filled-darker"
            {...props}
          >
            <Option>Red</Option>
            <Option>Green</Option>
            <Option>Blue</Option>
          </Combobox>
        </div>

        <div className={styles.filledLighter}>
          <label id={`${comboId}-filledLighter`}>Custom Filled Lighter</label>
          <Combobox
            aria-labelledby={`${comboId}-filledLighter`}
            placeholder="Select a color"
            appearance="filled-lighter"
            {...props}
          >
            <Option>Red</Option>
            <Option>Green</Option>
            <Option>Blue</Option>
          </Combobox>
        </div>
      </FluentProvider>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A Combobox can have the following `appearance` variants:\n' +
        '- `outline` (default): has a border around all four sides.\n' +
        '- `underline`: only has a bottom border.\n' +
        '- `filled-darker`: no border, only a subtle background color difference against a white page.\n' +
        '- `filled-lighter`: no border, and a white background.\n',
    },
  },
};
