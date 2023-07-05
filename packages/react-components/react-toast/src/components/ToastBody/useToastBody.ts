import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
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
    subtitle: resolveShorthand(props.subtitle),
    root: getNativeElementProps('div', {
      ref,
      id: bodyId,
      ...props,
    }),
    backgroundAppearance,
  };
};
