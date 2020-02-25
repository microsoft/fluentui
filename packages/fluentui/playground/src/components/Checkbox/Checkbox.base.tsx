import * as React from 'react';
import { ICheckboxProps, ICheckboxSlots } from './Checkbox.types';
import { useCheckbox } from './useCheckbox';

export const CheckboxBase: React.FunctionComponent<ICheckboxProps> = (props: ICheckboxProps) => {
  const { children, slots } = props;
  const { root: Root = 'label', input: Input = 'input', icon: Icon = 'i' } = (slots || {}) as ICheckboxSlots;

  const { slotProps = {} } = useCheckbox(props);

  return (
    <Root {...slotProps.root}>
      <Input {...slotProps.input} />
      <Icon {...slotProps.icon} />
      {children}
    </Root>
  );
};
