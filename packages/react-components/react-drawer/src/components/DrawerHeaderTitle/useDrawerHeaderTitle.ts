import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleProps, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';
import { useDialogTitle_unstable } from '@fluentui/react-dialog';

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

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    heading: resolveShorthand(props.heading, {
      required: true,
      defaultProps: {
        ...heading,
        className: undefined, // remove className from heading
      },
    }),
    action: resolveShorthand(props.action, {
      defaultProps: action,
    }),
  };
};
