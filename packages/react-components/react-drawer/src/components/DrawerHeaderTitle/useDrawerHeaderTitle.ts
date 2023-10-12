import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useDialogContext_unstable } from '@fluentui/react-dialog';

import type { DrawerHeaderTitleProps, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

/**
 * @internal
 * Create the shorthand for the heading element.
 * @param props - props from this instance of DrawerHeaderTitle
 */
const useHeadingProps = ({ children, heading }: DrawerHeaderTitleProps) => {
  const id = useDialogContext_unstable(ctx => ctx.dialogTitleId);

  return slot.optional(heading, {
    defaultProps: {
      id,
      children,
    },
    renderByDefault: true,
    elementType: 'h2',
  });
};

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
  const headingProps = useHeadingProps(props);

  return {
    components: {
      root: 'div',
      heading: 'h2',
      action: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    heading: headingProps,
    action: slot.optional(props.action, {
      elementType: 'div',
    }),
  };
};
