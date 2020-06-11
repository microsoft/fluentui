import { ButtonProps, ButtonState } from './Button.types';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { tokensToStyleObject } from '@fluentui/react-theme-provider';

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props
 */
export const useButton = (props: ButtonProps, options: ComposePreparedOptions): ButtonState => ({
  ...props,
  style: { ...props.style, ...tokensToStyleObject(props.tokens, '--button') },
});
