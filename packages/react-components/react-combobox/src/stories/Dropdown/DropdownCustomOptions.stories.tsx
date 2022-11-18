import * as React from 'react';
import { makeStyles, shorthands, useId } from '@fluentui/react-components';
import {
  AnimalCat24Filled,
  AnimalDog24Filled,
  AnimalRabbit24Filled,
  AnimalTurtle24Filled,
  FoodFish24Filled,
  CheckboxChecked24Regular,
} from '@fluentui/react-icons';
import { Dropdown, Option, OptionGroup } from '@fluentui/react-combobox';
import type { DropdownProps, OptionProps, OptionGroupProps } from '@fluentui/react-combobox';

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
    ...shorthands.gap('5px'),
  },
  icon: {
    ...shorthands.flex(0, 0, 'auto'),
  },
  text: {
    ...shorthands.flex(1, 1, 'auto'),
  },
});

type CustomOptionProps = Partial<OptionProps> & { animal: keyof typeof animalIcons };

const CustomOption = (props: CustomOptionProps) => {
  const { animal, ...optionProps } = props;
  const Icon = animalIcons[animal];
  const styles = useCustomOptionStyles();
  return (
    <Option value={animal} className={styles.option} checkIcon={<CheckboxChecked24Regular />} {...optionProps}>
      <Icon className={styles.icon} />
      <span className={styles.text}>{animal}</span>
    </Option>
  );
};

const CustomOptionGroup = (props: Partial<OptionGroupProps> & { options: (keyof typeof animalIcons)[] }) => {
  const labelSlot = typeof props.label === 'object' ? props.label : { children: props.label };

  return (
    <OptionGroup label={{ style: { fontStyle: 'italic' }, ...labelSlot }}>
      {props.options.map(option => (
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
    ...shorthands.gap('2px'),
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
        'Options and OptionGroups can be extended and customized. ' +
        'The `value` prop is used here, since the children of `<Option>` include JSX.',
    },
  },
};
