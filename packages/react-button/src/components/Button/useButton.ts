import { ButtonProps } from './Button.types';
import { mergeProps, ComposePreparedOptions } from '@fluentui/react-compose';
import { tokensToStyleObject } from '@fluentui/react-theme-provider';

/**
 * The useButton hook processes the Button component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useButton = (props: ButtonProps, options: ComposePreparedOptions) => {
  const state = {
    ...props,
    style: tokensToStyleObject(props.tokens, '--button'),
  };

  return mergeProps<ButtonProps>(state, options);
};
