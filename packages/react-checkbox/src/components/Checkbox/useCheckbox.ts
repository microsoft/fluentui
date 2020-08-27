import * as React from 'react';
import { mergeSlotProp } from '@fluentui/react-compose';
import { useControllableValue, useId, useMergedRefs, useWarnings } from '@uifabric/react-hooks';
import { useFocusRects } from '@uifabric/utilities';
import { ICheckboxProps, ICheckboxState } from './Checkbox.types';

export const useCheckbox = (props: ICheckboxProps, forwardedRef: React.Ref<HTMLElement>): ICheckboxState => {
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
  } = props;

  const id = useId('checkbox-', props.id);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRootRefs: React.Ref<HTMLElement> = useMergedRefs(rootRef, forwardedRef);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);
  const [isIndeterminate, setIsIndeterminate] = useControllableValue(props.indeterminate, props.defaultIndeterminate);

  useFocusRects(rootRef);
  useDebugWarning(props);
  useComponentRef(props, isChecked, isIndeterminate, inputRef);

  const onChange = (ev: React.ChangeEvent<HTMLElement>): void => {
    if (isIndeterminate) {
      // If indeterminate, clicking the checkbox *only* removes the indeterminate state (or if
      // controlled, lets the consumer know to change it by calling onChange). It doesn't
      // change the checked state.
      setIsChecked(!!isChecked, ev);
      setIsIndeterminate(false);
    } else {
      setIsChecked(!isChecked, ev);
    }
  };

  const handledProps: ICheckboxState = {
    ...props,
    ref: mergedRootRefs,
    checked: isChecked,
    indeterminate: isIndeterminate,
    input: {
      type: 'checkbox',
      ...inputProps,
      ref: inputRef,
      checked: !!isChecked,
      disabled,
      name,
      id,
      title,
      onChange,
      'data-ktp-execute-target': true,
      'aria-disabled': disabled,
      'aria-label': ariaLabel || label,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-posinset': ariaPositionInSet,
      'aria-setsize': ariaSetSize,
      'aria-checked': isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false',
    },
    checkbox: {
      'data-ktp-target': true,
    },
    container: {
      htmlFor: id,
    },
    label: mergeSlotProp(props.label, {
      title: props.title,
      'aria-hidden': 'true',
    }),
  };

  return handledProps;
};

function useDebugWarning(props: ICheckboxProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: 'Checkbox',
      props,
      mutuallyExclusive: {
        checked: 'defaultChecked',
        indeterminate: 'defaultIndeterminate',
      },
    });
  }
}

function useComponentRef(
  props: ICheckboxProps,
  isChecked: boolean | undefined,
  isIndeterminate: boolean | undefined,
  checkBoxRef: React.RefObject<HTMLInputElement>,
) {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get checked() {
        return !!isChecked;
      },
      get indeterminate() {
        return !!isIndeterminate;
      },
      focus() {
        if (checkBoxRef.current) {
          checkBoxRef.current.focus();
        }
      },
    }),
    [checkBoxRef, isChecked, isIndeterminate],
  );
}
