import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { useVirtualizerStyles_unstable, virtualizerClassNames } from '../Virtualizer/useVirtualizerStyles.styles';
import { makeStyles, mergeClasses } from '@griffel/react';

const virtualizerScrollViewDynamicClassName = 'fui-Virtualizer-Scroll-View-Dynamic';

export const virtualizerScrollViewDynamicClassNames: SlotClassNames<VirtualizerScrollViewDynamicSlots> = {
  ...virtualizerClassNames,
  container: `${virtualizerScrollViewDynamicClassName}__container`,
};

const useStyles = makeStyles({
  base: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  vertical: {
    flexDirection: 'column',
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
export const useVirtualizerScrollViewDynamicStyles_unstable = (
  state: VirtualizerScrollViewDynamicState,
): VirtualizerScrollViewDynamicState => {
  'use no memo';

  const styles = useStyles();

  // Default virtualizer styles base
  useVirtualizerStyles_unstable(state);

  const containerStyle =
    state.axis === 'horizontal'
      ? state.reversed
        ? styles.horizontalReversed
        : styles.horizontal
      : state.reversed
      ? styles.verticalReversed
      : styles.vertical;

  // Add container styles
  state.container.className = mergeClasses(
    virtualizerScrollViewDynamicClassNames.container,
    styles.base,
    containerStyle,
    state.container.className,
  );

  return state;
};
