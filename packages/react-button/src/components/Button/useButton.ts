import { tokensToStyleObject } from '@fluentui/react-theme-provider';
import { ButtonProps, ButtonState } from './Button.types';

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props - Button props to derive state from.
 */
export const useButton = (props: ButtonProps): ButtonState => {
  return {
    ...props,
    style: { ...props.style, ...tokensToStyleObject(props.tokens, '--button') },
  };
};
