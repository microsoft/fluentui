import { ButtonProps } from './Button.types';
import { mergeProps, ComposePreparedOptions } from '@fluentui/react-compose';
import { tokensToStyleObject } from '@fluentui/react-theme-provider';

/**
 * The useButton hook processes the Button component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useButton = (props: ButtonProps, options: ComposePreparedOptions) => {
  const { tokens, ...state } = props;

  // This this go into mergeProps?
  if (tokens) {
    // tslint:disable-next-line: no-any
    state.style = { ...props.style, ...tokensToStyleObject(tokens as Record<string, any>, '--button') };
  }

  return mergeProps<ButtonProps>(props, options);
};
