import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import { VirtualizerScrollViewProps, VirtualizerScrollViewState } from './VirtualizerScrollView.types';

export function useVirtualizerScrollView_unstable(
  props: VirtualizerScrollViewProps,
  virtualizerLength: number,
): VirtualizerScrollViewState {
  const virtualizerState = useVirtualizer_unstable({ ...props, virtualizerLength });

  const setScrollRef = React.useCallback(
    (element: HTMLDivElement) => {
      if (!element || !props.scrollViewRef || props.scrollViewRef.current === element) {
        return;
      }
      props.scrollViewRef.current = element;
    },
    [props.scrollViewRef],
  );

  return {
    ...virtualizerState,
    components: {
      ...virtualizerState.components,
      container: 'div',
    },
    container: resolveShorthand(props.container, {
      required: true,
      defaultProps: {
        ref: setScrollRef,
      },
    }),
  };
}
