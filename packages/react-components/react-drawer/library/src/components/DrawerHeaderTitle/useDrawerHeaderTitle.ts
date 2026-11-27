'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useDialogContext_unstable } from '@fluentui/react-dialog';

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
  // `children` stays in `rest` so a root render function still reaches the root slot.
  // `dangerouslySetInnerHTML` is omitted because the renderer composes the root children.
  const { heading, action, dangerouslySetInnerHTML: _dangerouslySetInnerHTML, ...rest } = props;
  const { children } = props;
  const headingId = useDialogContext_unstable(ctx => ctx.dialogTitleId);

  return {
    components: {
      root: 'div',
      heading: 'h2',
      action: 'div',
    },

    root: slot.always(
      {
        ref,
        ...rest,
      },
      { elementType: 'div' },
    ),
    heading: slot.optional(heading, {
      defaultProps: {
        id: headingId,
        children,
      },
      renderByDefault: true,
      elementType: 'h2',
    }),
    action: slot.optional(action, {
      elementType: 'div',
    }),
  };
};
