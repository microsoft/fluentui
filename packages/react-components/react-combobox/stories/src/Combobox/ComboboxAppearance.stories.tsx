import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, mergeClasses, Option, tokens, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

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

export const Appearance = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <label id={`${comboId}-outline`}>Outline</label>
        <Combobox aria-labelledby={`${comboId}-outline`} placeholder="Select a color" appearance="outline" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div className={styles.field}>
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

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}>
        <label id={`${comboId}-filledDarker`}>Filled Darker (on Background 1)</label>
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

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}>
        <label id={`${comboId}-filledLighter`}>Filled Lighter (on Background 3)</label>
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
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A Combobox can have the following `appearance` variants:\n' +
        '- `outline` (default): has a border around all four sides.\n' +
        '- `underline`: only has a bottom border.\n' +
        '- `filled-darker`: a darker filled background.\n' +
        '- `filled-lighter`: a lighter filled background.\n\n' +
        'Fluent recommends `colorNeutralBackground3` surroundings for `filled-lighter` and ' +
        '`colorNeutralBackground1` for `filled-darker`; these surface choices are not WCAG requirements. ' +
        'Without another identifying visual cue, filled controls need a descriptive placeholder or displayed value ' +
        'that identifies the editable/selectable control, with normal-size text contrast of at least 4.5:1 against its own fill. ' +
        'A boundary needed to identify an empty control must contrast at least 3:1 against the adjacent background.',
    },
  },
};
