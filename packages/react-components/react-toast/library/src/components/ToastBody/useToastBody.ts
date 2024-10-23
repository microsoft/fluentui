import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ToastBodyProps, ToastBodyState } from './ToastBody.types';
import { useToastContainerContext } from '../../contexts/toastContainerContext';
import { useBackgroundAppearance } from '@fluentui/react-shared-contexts';

/**
 * Create the state required to render ToastBody.
 *
 * The returned state can be modified with hooks such as useToastBodyStyles_unstable,
 * before being passed to renderToastBody_unstable.
 *
 * @param props - props from this instance of ToastBody
 * @param ref - reference to root HTMLElement of ToastBody
 */
export const useToastBody_unstable = (props: ToastBodyProps, ref: React.Ref<HTMLElement>): ToastBodyState => {
  const backgroundAppearance = useBackgroundAppearance();
  const { bodyId } = useToastContainerContext();
  return {
    components: {
      root: 'div',
      subtitle: 'div',
    },
    subtitle: slot.optional(props.subtitle, { elementType: 'div' }),
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        id: bodyId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    backgroundAppearance,
  };
};
