import * as React from 'react';
import { resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps, ButtonState } from './Button.types';
import { useButtonState } from './useButtonState';
import { renderButton } from './renderButton';

const NullRender = () => null;

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps = ['icon', 'loader', 'content'];
/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (
  props: ButtonProps,
  ref: React.Ref<HTMLElement>,
  options?: {
    components?: { [k in 'icon' | 'loader' | 'content']?: React.ComponentType };
  },
) => {
  const { components = {} } = options || {};

  const state: ButtonState = {
    // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
    // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref: ref || React.useRef(),
    as: props.href ? 'a' : 'button',
    components: {
      // TODO: this is pretty ugly and verbose, don't want to over abstract but is there a better way to handle this?
      //       This is required because we need to render slots EXCLUSIVELY when user passes slot info.
      //       Some components will have default slots.
      icon: typeof props.icon !== 'undefined' ? components.icon || 'span' : NullRender,
      content: typeof props.content !== 'undefined' ? components.content || 'span' : NullRender,
      // TODO: Sometimes we need to special things with NullRender...
      // loader={null} opted out of loader
      // loader={undefined} as in, user did not pass a loader, default to regular loader if props.loading
      // loader={...} where ... is user's definition, then use their definition
      loader: props.loader !== null ? components.loader || 'span' : NullRender,
    },
    ...resolveShorthandProps<ButtonProps>(props, buttonShorthandProps),
  };

  useButtonState(state);

  return { state, render: renderButton };
};
