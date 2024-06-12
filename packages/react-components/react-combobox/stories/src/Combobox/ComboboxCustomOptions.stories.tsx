import * as React from 'react';
import { Combobox, makeStyles, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { ComboboxProps, OptionProps, OptionGroupProps } from '@fluentui/react-components';
import { CheckmarkCircle20Filled } from '@fluentui/react-icons';

const CustomOption = (props: OptionProps) => {
  return <Option {...props} checkIcon={<CheckmarkCircle20Filled />} />;
};

const CustomOptionGroup = (props: Partial<OptionGroupProps> & { options: string[] }) => {
  const { label, options, ...optionGroupProps } = props;
  const labelSlot = typeof label === 'object' ? label : { children: label };

  return (
    <OptionGroup label={{ style: { fontStyle: 'italic' }, ...labelSlot }} {...optionGroupProps}>
      {options.map(option => (
        <CustomOption key={option} disabled={option === 'Ferret'}>
          {option}
        </CustomOption>
      ))}
    </OptionGroup>
  );
};

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
  listbox: {
    maxHeight: '200px',
  },
});

export const CustomOptions = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        listbox={{ className: styles.listbox }}
        placeholder="Select an animal"
        {...props}
      >
        <CustomOptionGroup label="Land" options={land} />
        <CustomOptionGroup label="Sea" options={water} />
      </Combobox>
    </div>
  );
};

CustomOptions.parameters = {
  docs: {
    description: {
      story:
        'Options and OptionGroups can be extended and customized.' +
        'Here `OptionGroup` is wrapped in `CustomOptionGroup`,' +
        'which adds a custom label style and takes an `options` array prop which is mapped to child Option elements.' +
        '`Option` is also wrapped in `CustomOption`, which adds a custom check icon.',
    },
  },
};
