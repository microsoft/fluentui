import { ComposePreparedOptions } from '@fluentui/react-compose';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';
import { useFocusRects } from 'office-ui-fabric-react';
import { ButtonProps, ButtonState } from './Button.types';

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props - Button props to derive state from.
 */
export const useButton = (
  props: ButtonProps,
  ref: React.Ref<HTMLElement>,
  options: ComposePreparedOptions,
): ButtonState => {
  useFocusRects(ref as React.RefObject<HTMLElement>);

  return {
    ...props,
    style: getStyleFromPropsAndOptions(props, options, '--button'),
  };
};
