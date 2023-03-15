import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import { VirtualizerScrollViewProps, VirtualizerScrollViewState } from './VirtualizerScrollView.types';
import { useStaticVirtualizerMeasure } from '../../Hooks';

export function useVirtualizerScrollView_unstable(props: VirtualizerScrollViewProps): VirtualizerScrollViewState {
  const { virtualizerLength, bufferItems, bufferSize, useScrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
  });

  const iScrollRef = React.useRef<HTMLElement>(document.body);

  const setScrollRef = React.useCallback((element: HTMLDivElement) => {
    if (!element || !iScrollRef || iScrollRef.current === element) {
      return;
    }
    iScrollRef.current = element;
  }, []);

  useScrollRef(iScrollRef);

  const virtualizerState = useVirtualizer_unstable({
    ...props,
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollViewRef: iScrollRef,
  });

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
