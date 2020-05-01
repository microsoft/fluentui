import * as React from 'react';
import { useControlledState } from '../../hooks/useControlledState';
import { mergeSlotProps } from '@fluentui/react-theming';
import { ICheckboxProps } from './Checkbox.types';

export interface ICheckboxState {
  onClick: (ev: MouseEvent, checked: boolean) => void;
  isChecked: boolean;
  rootRef: React.Ref<Element>;
}

const useCheckboxState = (userProps: ICheckboxProps): ICheckboxState => {
  const { checked: controlledValue, defaultChecked, disabled, onChange } = userProps;

  const [isChecked, setChecked] = useControlledState(controlledValue, defaultChecked);

  const rootRef = React.useRef<HTMLElement>(null);

  const onCheckboxChange = (ev: MouseEvent, checked: boolean) => {
    if (!disabled && onChange) {
      onChange(ev, !isChecked);

      setChecked(!isChecked);

      if (ev.defaultPrevented) {
        return;
      }
    }
  };

  return {
    onClick: onCheckboxChange,
    isChecked,
    rootRef,
  };
};

export const useCheckbox = (props: ICheckboxProps) => {
  const { disabled } = props;

  const state = useCheckboxState(props);
  const { rootRef, onClick, isChecked } = state;

  const slotProps = mergeSlotProps(props, {
    root: {
      ref: rootRef,
    },
    icon: {},
    input: {
      'aria-disabled': disabled,
      'aria-checked': isChecked,
      onClick,
      ref: rootRef,
      role: 'checkbox',
    },
  });

  return {
    slotProps,
    state,
  };
};
