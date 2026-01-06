'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';
import {
  useMergedRefs,
  useEventCallback,
  mergeCallbacks,
  getIntrinsicElementProps,
  slot,
} from '@fluentui/react-utilities';
import { MenuGridCellProps, MenuGridCellState } from './MenuGridCell.types';
import { useValidateNesting } from '../../utils/useValidateNesting';

/**
 * Given user props, returns state and render function for a MenuGridCell.
 */
export function useMenuGridCell_unstable(props: MenuGridCellProps, ref: React.Ref<HTMLDivElement>): MenuGridCellState {
  const { visuallyHidden } = props;

  const { dir } = useFluent();
  const validateNestingRef = useValidateNesting('MenuGridCell');

  const onKeyDownWithPrevent = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const CloseArrowKey = dir === 'ltr' ? ArrowLeft : ArrowRight;

    if (event.key === CloseArrowKey) {
      event.preventDefault();
    }
  });
  const onKeyDown = useEventCallback(mergeCallbacks(props.onKeyDown, onKeyDownWithPrevent));

  return {
    visuallyHidden,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, validateNestingRef),
        role: 'gridcell',
        ...props,
        onKeyDown,
      }),
      { elementType: 'div' },
    ),
  };
}
