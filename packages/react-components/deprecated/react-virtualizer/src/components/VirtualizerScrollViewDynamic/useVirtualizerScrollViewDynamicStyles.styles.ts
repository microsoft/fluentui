'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { useVirtualizerStyles_unstable, virtualizerClassNames } from '../Virtualizer/useVirtualizerStyles.styles';
import { makeStyles, mergeClasses } from '@griffel/react';

const virtualizerScrollViewDynamicClassName = 'fui-Virtualizer-Scroll-View-Dynamic';

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
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
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const useVirtualizerScrollViewDynamicStyles_unstable = (
  state: VirtualizerScrollViewDynamicState,
): VirtualizerScrollViewDynamicState => {
  const styles = useStyles();

  // Default virtualizer styles base
  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal).
  // VirtualizerScrollViewDynamicState adds a `container` slot, so Virtualizer's `components` map is
  // NARROWER than this one; it is dropped off the return so this component keeps its own.
  //
  // The merge is deferred to the RETURN rather than reassigning `state` here: the writes below
  // are still mutations at F1, and `react-hooks/immutability` stops reporting them once `state`
  // names a locally-created object — which would silently retire the disables F5 has to delete
  // on evidence.
  const { components: virtualizerComponents, ...composedVirtualizer } = useVirtualizerStyles_unstable(state);

  const containerStyle =
    state.axis === 'horizontal'
      ? state.reversed
        ? styles.horizontalReversed
        : styles.horizontal
      : state.reversed
        ? styles.verticalReversed
        : styles.vertical;

  // Add container styles
  // eslint-disable-next-line react-hooks/immutability -- deprecated package, not worth refactoring
  state.container.className = mergeClasses(
    virtualizerScrollViewDynamicClassNames.container,
    styles.base,
    containerStyle,
    state.container.className,
  );

  return { ...state, ...composedVirtualizer };
};
