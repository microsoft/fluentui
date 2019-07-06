import { useCallback, useImperativeHandle, useRef } from 'react';
import { getControlledDerivedProps, useControlledState } from '../../Foundation';
import { IToggleComponent, IToggleViewProps } from './Toggle.types';

export const useToggleState: IToggleComponent['state'] = props => {
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const [checked, setChecked] = useControlledState(props, 'checked', { defaultPropName: 'defaultChecked', defaultPropValue: false });

  useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      toggleButtonRef.current && toggleButtonRef.current.focus();
    }
  }));

  const { disabled, onChange } = props;

  const _onClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        // Only update the state if the user hasn't provided it.
        setChecked(!checked);

        if (onChange) {
          onChange(ev, !checked);
        }
      }
    },
    [checked, disabled, onChange]
  );

  // TODO: can this be structured with helpers to reduce changes for bugs? (overriding controlled props in output, etc.)
  // TODO: easy ways to minimize unnecessary recreations of viewProps? memoize helper for updating props?
  const viewProps: IToggleViewProps = {
    ...props,
    checked,
    toggleButtonRef,
    onClick: _onClick
  };

  // Derived state should be performed on otherwise finalized viewProps.
  // TODO: Uses of propsTransform must be called after viewProps it depends on are finalized.
  //       Are there any helper ways of doing this to reduce changes of bugs?
  //       Something that would let state functions safely write whatever they want into viewProps without fear:
  //         Return array from here including list of controlled props?
  //         List of controlled props as createComponent option?
  //         updateViewProps functional arg that takes in partial view props and optional controlled prop list?
  viewProps.text = getControlledDerivedProps(viewProps, 'text', viewProps.checked ? viewProps.onText : viewProps.offText);

  return viewProps;
};
