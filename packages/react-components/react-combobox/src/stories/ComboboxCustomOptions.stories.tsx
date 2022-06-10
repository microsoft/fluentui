import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { CheckmarkCircle20Filled } from '@fluentui/react-icons';
import { Combobox, ComboboxProps, Option, OptionProps, OptionGroup, OptionGroupProps } from '../index';

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

export const CustomOptions = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  return (
    <>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        <CustomOptionGroup label="Land" options={land} />
        <CustomOptionGroup label="Sea" options={water} />
      </Combobox>
    </>
  );
};

CustomOptions.parameters = {
  docs: {
    description: {
      story: 'Options and OptionGroups can be extended and customized.',
    },
  },
};
