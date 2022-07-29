import * as React from 'react';
import { makeStyles, shorthands, useId } from '@fluentui/react-components';
import { CheckmarkCircle20Filled } from '@fluentui/react-icons';
import { Combobox, Option, OptionGroup } from '@fluentui/react-combobox';
import type { ComboboxProps, OptionProps, OptionGroupProps } from '@fluentui/react-combobox';

const CustomOption = (props: OptionProps) => {
  return <Option {...props} checkIcon={<CheckmarkCircle20Filled />} />;
};

const CustomOptionGroup = (props: Partial<OptionGroupProps> & { options: string[] }) => {
  const labelSlot = typeof props.label === 'object' ? props.label : { children: props.label };

  return (
    <OptionGroup label={{ style: { fontStyle: 'italic' }, ...labelSlot }}>
      {props.options.map(option => (
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
    ...shorthands.gap('2px'),
    maxWidth: '400px',
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
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        <CustomOptionGroup label="Land" options={land} />
        <CustomOptionGroup label="Sea" options={water} />
      </Combobox>
    </div>
  );
};

CustomOptions.parameters = {
  docs: {
    description: {
      story: 'Options and OptionGroups can be extended and customized.',
    },
  },
};
