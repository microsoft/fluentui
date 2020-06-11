import { tokensToStyleObject } from '@fluentui/react-theme-provider';
import { ButtonProps, ButtonState } from './Button.types';

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props
 */
export const useButton = (props: ButtonProps): ButtonState => {
  return {
    ...props,
    style: { ...props.style, ...tokensToStyleObject(props.tokens, '--button') },
  };
};
