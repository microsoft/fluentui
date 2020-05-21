import * as React from 'react';
import { ICheckboxProps } from './Checkbox.types';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { mergeProps } from './temp';
import { useControllableValue, useId } from '@uifabric/react-hooks';

export const useCheckbox = (props: ICheckboxProps, options: ComposePreparedOptions) => {
  const {
    disabled,
    inputProps,
    name,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaPositionInSet,
    ariaSetSize,
    title,
    label,
    checkmarkIconProps,
  } = props;

  const id = useId('checkbox-', props.id);
  const checkBox = React.useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);
  const [isIndeterminate, setIsIndeterminate] = useControllableValue(props.indeterminate, props.defaultIndeterminate);

  const onChange = (ev: React.ChangeEvent<HTMLElement>): void => {
    if (!isIndeterminate) {
      setIsChecked(!isChecked, ev);
    } else {
      // If indeterminate, clicking the checkbox *only* removes the indeterminate state (or if
      // controlled, lets the consumer know to change it by calling onChange). It doesn't
      // change the checked state.
      setIsChecked(!!isChecked, ev);
      setIsIndeterminate(false);
    }
  };

  // TODO: typing
  const handledProps: any = {
    as: 'div',
    title: props.title,
    input: {
      type: 'checkbox',
      ...inputProps,
      checked: !!isChecked,
      disabled,
      ref: checkBox,
      name,
      id,
      title,
      onChange,
      'aria-disabled': disabled,
      'aria-label': ariaLabel || label,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-posinset': ariaPositionInSet,
      'aria-setsize': ariaSetSize,
      'aria-checked': isIndeterminate ? 'mixed' : isChecked ? true : false,
    },
    checkmarkIcon: {
      iconName: 'CheckMark',
      ...checkmarkIconProps,
    },
    label: {
      htmlFor: id,
    },
  };

  return mergeProps<any, any, any>(handledProps, options);
};
