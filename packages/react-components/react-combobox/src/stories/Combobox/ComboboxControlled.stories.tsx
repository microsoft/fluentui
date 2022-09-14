import * as React from 'react';
import { makeStyles, shorthands, useId } from '@fluentui/react-components';
import {
  AnimalCat20Filled,
  AnimalDog20Filled,
  AnimalRabbit20Filled,
  AnimalTurtle20Filled,
  FoodFish20Filled,
} from '@fluentui/react-icons';
import { Combobox, Option } from '@fluentui/react-combobox';
import type { ComboboxProps } from '@fluentui/react-combobox';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
  selection: {
    display: 'flex',
    alignItems: 'center',
  },
});

const iconMap = (icon?: string): React.FunctionComponent | null => {
  switch (icon) {
    case 'Animal Cat':
      return AnimalCat20Filled;
    case 'Animal Dog':
      return AnimalDog20Filled;
    case 'Animal Rabbit':
      return AnimalRabbit20Filled;
    case 'Animal Turtle':
      return AnimalTurtle20Filled;
    case 'Food Fish':
      return FoodFish20Filled;
    default:
      return null;
  }
};

export const Controlled = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-controlled');
  const [value, setValue] = React.useState<string | undefined>();
  const [selectedIcon, setSelectedIcon] = React.useState<string | undefined>();
  const SelectedIcon = iconMap(selectedIcon);
  const options = [
    { name: 'Cat', icon: 'Animal Cat' },
    { name: 'Dog', icon: 'Animal Dog' },
    { name: 'Rabbit', icon: 'Animal Rabbit' },
    { name: 'Fish', icon: 'Food Fish' },
    { name: 'Turtle', icon: 'Animal Turtle' },
  ];
  const styles = useStyles();

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setValue(data.optionValue);
    setSelectedIcon(data.optionData as string | undefined);
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        value={value}
        placeholder="Select an animal"
        onOptionSelect={onSelect}
        {...props}
      >
        {options.map(option => {
          const Icon = iconMap(option.icon);
          return (
            <Option key={option.name} value={option.name} data={option.icon}>
              {Icon ? <Icon /> : null} {option.name}
            </Option>
          );
        })}
      </Combobox>
      {SelectedIcon ? (
        <span className={styles.selection}>
          Selected: <SelectedIcon />
        </span>
      ) : null}
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: "A Combobox's value can be controlled by updating the `value` prop in response to `onOptionSelect`.",
    },
  },
};
