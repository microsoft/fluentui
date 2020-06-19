import { useImperativeHandle, useRef } from 'react';
import { tokensToStyleObject } from '@fluentui/react-theme-provider';
import { ButtonProps, ButtonState } from './Button.types';
/**
 * The useButton hook processes the Button component props and returns state.
 * @param props
 */
export const useButton = (props: ButtonProps): ButtonState => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      buttonRef.current?.focus();
    },
  }));

  return {
    ...props,
    buttonRef,
    style: {
      ...props.style,
      ...tokensToStyleObject(props.tokens, '--button'),
    },
  };
};
