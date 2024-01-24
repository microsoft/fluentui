import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterProps, TeachingPopoverFooterState } from './TeachingPopoverFooter.types';
import { Button } from '@fluentui/react-button';
import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverFooter properties
 * @param ref - reference to root HTMLElement of TeachingPopoverFooter
 */
export const useTeachingPopoverFooter_unstable = (
  props: TeachingPopoverFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverFooterState => {
  const appearance = useTeachingPopoverContext_unstable(context => context.appearance);

  const secondary = slot.optional(props.secondary, {
    defaultProps: {
      appearance: appearance === 'brand' ? 'primary' : undefined,
      children: props.strings.secondary,
    },
    renderByDefault: true,
    elementType: Button,
  });

  const primary = slot.always(props.primary, {
    defaultProps: {
      appearance: appearance === 'brand' ? undefined : 'primary',
      children: props.strings.primary,
    },
    elementType: Button,
  });

  return {
    appearance,
    components: {
      root: 'div',
      primary: Button,
      secondary: Button,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    secondary,
    primary,
  };
};
