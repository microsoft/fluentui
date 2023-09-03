import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import { useDialogTitle_unstable } from '@fluentui/react-dialog';

import type { DrawerHeaderTitleProps, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

/**
 * Create the state required to render DrawerHeaderTitle.
 *
 * The returned state can be modified with hooks such as useDrawerHeaderTitleStyles_unstable,
 * before being passed to renderDrawerHeaderTitle_unstable.
 *
 * @param props - props from this instance of DrawerHeaderTitle
 * @param ref - reference to root HTMLElement of DrawerHeaderTitle
 */
export const useDrawerHeaderTitle_unstable = (
  props: DrawerHeaderTitleProps,
  ref: React.Ref<HTMLDivElement>,
): DrawerHeaderTitleState => {
  const { root: heading, action, components: titleComponents } = useDialogTitle_unstable(props, ref);

  return {
    components: {
      root: 'div',
      heading: titleComponents.root,
      action: titleComponents.action,
    },

    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    heading: slot.optional(props.heading, {
      renderByDefault: true,
      defaultProps: {
        ...heading,
        className: undefined, // remove className from heading
      },
      elementType: titleComponents.root,
    }),
    action: slot.optional(props.action, {
      defaultProps: action,
      elementType: titleComponents.action,
    }),
  };
};
