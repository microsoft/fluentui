import { useImperativeHandle, useRef } from 'react';
import { tokensToStyleObject } from '@fluentui/react-theme-provider';
import { ButtonProps, ButtonState } from './Button.types';

const getStyle = (props: ButtonProps) => {
  if (props.style || props.tokens) {
    return {
      ...props.style,
      ...tokensToStyleObject(props.tokens, '--button'),
    };
  }

  return undefined;
};

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props - Button props to derive state from.
 */
export const useButton = (props: ButtonProps): ButtonState => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(props.componentRef, () => ({
    focus: () => buttonRef.current?.focus(),
  }));

  return {
    ...props,
    buttonRef,
    style: getStyle(props),
  };
};
