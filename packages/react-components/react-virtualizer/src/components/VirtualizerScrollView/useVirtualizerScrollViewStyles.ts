import { VirtualizerScrollViewState } from './VirtualizerScrollView.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { VirtualizerScrollViewSlots } from './VirtualizerScrollView.types';
import { useVirtualizerStyles_unstable, virtualizerClassNames } from '../Virtualizer/useVirtualizerStyles';
import { makeStyles, mergeClasses } from '@griffel/react';

const virtualizerScrollViewClassName = 'fui-Virtualizer-Scroll-View';

export const virtualizerScrollViewClassNames: SlotClassNames<VirtualizerScrollViewSlots> = {
  ...virtualizerClassNames,
  container: `${virtualizerScrollViewClassName}__container`,
};

const useStyles = makeStyles({
  base: {
    display: 'flex',
    width: '100%',
    height: '100%',
    overflowAnchor: 'none',
  },
  vertical: {
    flexDirection: 'column',
    overflowAnchor: 'none',
    overflowY: 'auto',
  },
  horizontal: {
    flexDirection: 'row',
    overflowX: 'auto',
  },
  verticalReversed: {
    flexDirection: 'column-reverse',
    overflowY: 'auto',
  },
  horizontalReversed: {
    flexDirection: 'row-reverse',
    overflowX: 'auto',
  },
});

/**
 * Apply styling to the Virtualizer states
 */
export const useVirtualizerScrollViewStyles_unstable = (
  state: VirtualizerScrollViewState,
): VirtualizerScrollViewState => {
  const styles = useStyles();

  // For now - just return default style mods
  useVirtualizerStyles_unstable(state);

  const containerStyle =
    state.axis === 'horizontal'
      ? state.reversed
        ? styles.horizontalReversed
        : styles.horizontal
      : state.reversed
      ? styles.verticalReversed
      : styles.vertical;

  state.container.className = mergeClasses(
    virtualizerScrollViewClassNames.container,
    styles.base,
    containerStyle,
    state.container.className,
  );

  return state;
};
