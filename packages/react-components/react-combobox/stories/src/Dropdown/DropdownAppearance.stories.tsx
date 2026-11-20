import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, mergeClasses, Option, tokens, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Appearance = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={`${dropdownId}-outline`}>Outline appearance (default)</label>
        <Dropdown id={`${dropdownId}-outline`} placeholder="Select an animal" appearance="outline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${dropdownId}-underline`}>Underline appearance</label>
        <Dropdown id={`${dropdownId}-underline`} placeholder="Select an animal" appearance="underline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}>
        <label htmlFor={`${dropdownId}-filledDarker`}>Filled darker appearance (on Background 1)</label>
        <Dropdown
          id={`${dropdownId}-filledDarker`}
          placeholder="Select an animal"
          appearance="filled-darker"
          {...props}
        >
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}>
        <label htmlFor={`${dropdownId}-filledLighter`}>Filled lighter appearance (on Background 3)</label>
        <Dropdown
          id={`${dropdownId}-filledLighter`}
          placeholder="Select an animal"
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
        '- `filled-darker`: a darker filled background.\n' +
        '- `filled-lighter`: a lighter filled background.\n\n' +
        'Fluent recommends `colorNeutralBackground3` surroundings for `filled-lighter` and ' +
        '`colorNeutralBackground1` for `filled-darker`; these surface choices are not WCAG requirements. ' +
        'Without another identifying visual cue, filled controls need a descriptive placeholder or displayed value ' +
        'that identifies the selectable control, with normal-size text contrast of at least 4.5:1 against its own fill. ' +
        'Keep a persistent visible label and a sufficiently contrasting focus indicator.',
    },
  },
};
