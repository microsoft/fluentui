import * as React from 'react';
import { Dropdown, makeStyles, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { DropdownProps, OptionProps, OptionGroupProps } from '@fluentui/react-components';
import {
  AnimalCat24Filled,
  AnimalDog24Filled,
  AnimalRabbit24Filled,
  AnimalTurtle24Filled,
  FoodFish24Filled,
  CheckboxChecked24Regular,
} from '@fluentui/react-icons';

const animalIcons = {
  Cat: AnimalCat24Filled,
  Dog: AnimalDog24Filled,
  Rabbit: AnimalRabbit24Filled,
  Turtle: AnimalTurtle24Filled,
  Fish: FoodFish24Filled,
};

const useCustomOptionStyles = makeStyles({
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  icon: { flex: '0 0 auto' },
  text: { flex: '1 1 auto' },
});

type CustomOptionProps = Partial<OptionProps> & { animal: keyof typeof animalIcons };

const CustomOption = (props: CustomOptionProps) => {
  const { animal, ...optionProps } = props;
  const Icon = animalIcons[animal];
  const styles = useCustomOptionStyles();
  return (
    <Option text={animal} className={styles.option} checkIcon={<CheckboxChecked24Regular />} {...optionProps}>
      <Icon className={styles.icon} />
      <span className={styles.text}>{animal}</span>
    </Option>
  );
};

const CustomOptionGroup = (props: Partial<OptionGroupProps> & { options: (keyof typeof animalIcons)[] }) => {
  const { label, options, ...optionGroupProps } = props;
  const labelSlot = typeof label === 'object' ? label : { children: label };

  return (
    <OptionGroup label={{ style: { fontStyle: 'italic' }, ...labelSlot }} {...optionGroupProps}>
      {options.map(option => (
        <CustomOption key={option} animal={option} />
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

export const CustomOptions = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown');
  const land = ['Cat', 'Dog', 'Rabbit'] as (keyof typeof animalIcons)[];
  const water = ['Fish', 'Turtle'] as (keyof typeof animalIcons)[];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={dropdownId}>Best pet</label>
      <Dropdown
        aria-labelledby={dropdownId}
        listbox={{ className: styles.listbox }}
        placeholder="Select an animal"
        {...props}
      >
        <CustomOptionGroup label="Land" options={land} />
        <CustomOptionGroup label="Sea" options={water} />
      </Dropdown>
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
        '`Option` is also wrapped in `CustomOption`, which adds a custom check icon and animal icon.' +
        'The `text` prop is added to `<Option>`, since the children of `<Option>` are not a simple string.',
    },
  },
};
