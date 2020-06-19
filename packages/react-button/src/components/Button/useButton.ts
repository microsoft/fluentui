import { tokensToStyleObject } from '@fluentui/react-theme-provider';
import { ButtonProps, ButtonState } from './Button.types';
import { ComposePreparedOptions } from '@fluentui/react-compose';

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props
 */
export const useButton = (
  props: ButtonProps,
  ref: React.RefObject<HTMLElement>,
  options: ComposePreparedOptions,
): ButtonState => {
  const rootRef = appendRef;
  return {
    ...props,
    style: {
      ...props.style,
      ...tokensToStyleObject(props.tokens, '--button'),
    },
  };
};
