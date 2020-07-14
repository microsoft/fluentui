import { useImperativeHandle, useRef } from 'react';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';
import { useFocusRects } from '@uifabric/utilities';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { ButtonProps, ButtonState } from './Button.types';
import { useButtonBehavior } from './useButtonBehavior';

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props - Button props to derive state from.
 */
export const useButton = (
  props: ButtonProps,
  ref: React.RefObject<HTMLElement>,
  options: ComposePreparedOptions,
): ButtonState => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useImperativeHandle(props.componentRef, () => ({
    focus: () => buttonRef.current?.focus(),
  }));
  useFocusRects(ref);

  const buttonBehaviorProps = useButtonBehavior(props, ref);
  const { onKeyDown } = buttonBehaviorProps;

  return {
    ...buttonBehaviorProps,
    ...props,
    onKeyDown,
    buttonRef,
    style: getStyleFromPropsAndOptions(props, options, '--button'),
  };
};
