import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { AppItemProps, AppItemState } from './AppItem.types';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { useNavContext_unstable } from '../NavContext';

/**
 * Create the state required to render AppItem.
 *
 * The returned state can be modified with hooks such as useAppItemStyles_unstable,
 * before being passed to renderAppItem_unstable.
 *
 * @param props - props from this instance of AppItem
 * @param ref - reference to root HTMLDivElement of AppItem
 */
export const useAppItem_unstable = (
  props: AppItemProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): AppItemState => {
  const { icon, as, href } = props;
  const rootElementType = as || (href ? 'a' : 'button');

  const { density = 'medium' } = useNavContext_unstable();

  const root = slot.always<ARIAButtonSlotProps<'a'>>(
    getIntrinsicElementProps(
      rootElementType,
      useARIAButtonProps(rootElementType, {
        ...props,
      }),
    ),
    {
      elementType: rootElementType,
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: rootElementType,
      },
    },
  );

  return {
    components: {
      root: rootElementType,
      icon: 'span',
    },
    root,
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
    density,
  };
};
