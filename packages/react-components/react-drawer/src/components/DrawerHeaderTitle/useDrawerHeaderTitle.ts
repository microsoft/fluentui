import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleProps, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';
import { DialogTitleProps } from '@fluentui/react-dialog';

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
  ref: React.Ref<HTMLElement>,
): DrawerHeaderTitleState => {
  const { as, children } = props;

  const action = resolveShorthand(props.action);
  const title = resolveShorthand(
    {
      as,
      action,
      children,
    } as DialogTitleProps,
    {
      required: true,
    },
  );

  return {
    components: {
      root: 'div',
      action: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    action,
    title,
  };
};
