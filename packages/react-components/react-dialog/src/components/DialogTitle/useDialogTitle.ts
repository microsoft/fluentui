import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DialogTitleProps, DialogTitleState } from './DialogTitle.types';

/**
 * Create the state required to render DialogTitle.
 *
 * The returned state can be modified with hooks such as useDialogTitleStyles_unstable,
 * before being passed to renderDialogTitle_unstable.
 *
 * @param props - props from this instance of DialogTitle
 * @param ref - reference to root HTMLElement of DialogTitle
 */
export const useDialogTitle_unstable = (props: DialogTitleProps, ref: React.Ref<HTMLElement>): DialogTitleState => {
  const { as = 'div' } = props;
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps(as, {
      ref,
      ...props,
    }),
  };
};
