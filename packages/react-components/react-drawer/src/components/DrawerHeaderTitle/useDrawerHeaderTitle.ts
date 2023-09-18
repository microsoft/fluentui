import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';

import type { DrawerHeaderTitleProps, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';
import { useDialogTitle_unstable } from '@fluentui/react-dialog';

/**
 * @internal
 * Create the shorthand for the heading element.
 * @param props - props from this instance of DrawerHeaderTitle
 */
const useHeadingProps = ({ children, heading }: DrawerHeaderTitleProps) => {
  const resolvedHeading = slot.resolveShorthand(heading) || {};
  const { root: titleProps } = useDialogTitle_unstable(resolvedHeading, React.createRef());

  return slot.optional(titleProps, {
    defaultProps: {
      ...titleProps,
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
      getNativeElementProps('div', {
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
