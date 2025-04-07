import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { AppItemStaticProps, AppItemStaticState } from './AppItemStatic.types';
import { useNavContext_unstable } from '../NavContext';

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
  const { icon } = props;

  const { density = 'medium' } = useNavContext_unstable();
  return {
    components: {
      root: 'div',
      icon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
    density,
  };
};
