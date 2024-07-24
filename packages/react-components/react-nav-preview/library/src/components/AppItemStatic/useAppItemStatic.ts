import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { AppItemStaticProps, AppItemStaticState } from './AppItemStatic.types';

/**
 * Create the state required to render AppItemStatic.
 *
 * The returned state can be modified with hooks such as useAppItemStaticStyles_unstable,
 * before being passed to renderAppItemStatic_unstable.
 *
 * @param props - props from this instance of AppItemStatic
 * @param ref - reference to root HTMLDivElement of AppItemStatic
 */
export const useAppItemStatic_unstable = (
  props: AppItemStaticProps,
  ref: React.Ref<HTMLDivElement>,
): AppItemStaticState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
