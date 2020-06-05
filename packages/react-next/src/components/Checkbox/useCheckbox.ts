import * as React from 'react';
import { ICheckboxProps, ICheckboxSlots, ICheckboxSlotProps } from './Checkbox.types';
import { ComposePreparedOptions, mergeProps } from '@fluentui/react-compose';
import { useControllableValue, useId, useMergedRefs } from '@uifabric/react-hooks';
import { useFocusRects, warnMutuallyExclusive } from '../../Utilities';

export const useCheckbox = (
  props: ICheckboxProps,
  options: ComposePreparedOptions,
  forwardedRef: React.Ref<HTMLDivElement>,
): { state: ICheckboxProps; slots: ICheckboxSlots; slotProps: ICheckboxSlotProps } => {
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

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRootRefs = useMergedRefs(rootRef, forwardedRef);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);
  const [isIndeterminate, setIsIndeterminate] = useControllableValue(props.indeterminate, props.defaultIndeterminate);

  useFocusRects(rootRef);
  useDebugWarning(props);
  useComponentRef(props, isChecked, isIndeterminate, inputRef);

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

  const handledProps = {
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
      'aria-disabled': disabled,
      'aria-label': ariaLabel || label,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-posinset': ariaPositionInSet,
      'aria-setsize': ariaSetSize,
      'aria-checked': isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false',
    },
    checkmark: {
      iconName: 'CheckMark',
      ...checkmarkIconProps,
    },
    container: {
      htmlFor: id,
    },
    text: {
      title: props.title,
      'aria-hidden': 'true',
    },
  };

  // TODO: improve typing for mergeProps
  return mergeProps<ICheckboxProps>(handledProps, options) as {
    state: ICheckboxProps;
    slots: ICheckboxSlots;
    slotProps: ICheckboxSlotProps;
  };
};

function useDebugWarning(props: ICheckboxProps) {
  if (process.env.NODE_ENV !== 'production') {
    // This is a build-time conditional that will be constant at runtime
    // tslint:disable-next-line:react-hooks-nesting
    React.useEffect(() => {
      warnMutuallyExclusive('Checkbox', props, {
        checked: 'defaultChecked',
        indeterminate: 'defaultIndeterminate',
      });
    }, []);
  }
}

function useComponentRef(
  props: ICheckboxProps,
  isChecked: boolean | undefined,
  isIndeterminate: boolean | undefined,
  checkBox: React.RefObject<HTMLInputElement>,
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
        if (checkBox.current) {
          checkBox.current.focus();
        }
      },
    }),
    [isChecked, isIndeterminate],
  );
}
