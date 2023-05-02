import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { DrawerTitleProps, DrawerTitleState } from './DrawerTitle.types';
import { DialogTitle, DialogTitleProps } from '@fluentui/react-dialog';

/**
 * Create the state required to render DrawerTitle.
 *
 * The returned state can be modified with hooks such as useDrawerTitleStyles_unstable,
 * before being passed to renderDrawerTitle_unstable.
 *
 * @param props - props from this instance of DrawerTitle
 * @param ref - reference to root HTMLElement of DrawerTitle
 */
export const useDrawerTitle_unstable = (props: DrawerTitleProps, ref: React.Ref<HTMLElement>): DrawerTitleState => {
  const rootProps = getNativeElementProps('div', {
    ref,
    ...props,
  });

  const action = React.useMemo(() => {
    if (!props.action) {
      return undefined;
    }

    return resolveShorthand(props.action);
  }, [props.action]);

  return {
    components: {
      root: DialogTitle,
      action: 'div',
    },

    root: resolveShorthand(rootProps, {
      required: true,
      defaultProps: {
        action,
      } as DialogTitleProps,
    }),
    action,
  };
};
