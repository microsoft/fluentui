import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
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
  let heading = slot.resolveShorthand(props.heading);

  if (!heading) {
    heading = {
      children: props.children,
    };
  }

  return {
    components: {
      root: 'div',
      heading: 'h2',
      action: 'div',
    },

    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    heading: slot.optional(getNativeElementProps(heading.as ?? 'h2', heading), {
      defaultProps: {
        children: props.children,
      },
      renderByDefault: true,
      elementType: 'h2',
    }),
    action: slot.optional(props.action, {
      elementType: 'div',
    }),
  };
};
