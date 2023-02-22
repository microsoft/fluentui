import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import { VirtualizerScrollViewProps, VirtualizerScrollViewState } from './VirtualizerScrollView.types';

export function useVirtualizerScrollView_unstable(
  props: VirtualizerScrollViewProps,
  ref: React.Ref<HTMLElement>,
): VirtualizerScrollViewState {
  const virtualizerState = useVirtualizer_unstable(props);
  const containerComponent = props.as ?? 'div';

  return {
    ...virtualizerState,
    components: {
      ...virtualizerState.components,
      root: containerComponent,
    },
    root: getNativeElementProps(containerComponent, { ref, ...props }),
  };
}
