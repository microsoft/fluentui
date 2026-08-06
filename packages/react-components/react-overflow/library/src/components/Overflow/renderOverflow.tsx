import * as React from 'react';
import { applyTriggerPropsToChildren, getTriggerChild } from '@fluentui/react-utilities';
import { OverflowContext } from '../../overflowContext';
import type { OverflowComponentState, OverflowContextValues } from './Overflow.types';

/**
 * Render the final JSX of Overflow.
 *
 * Griffel-free so it can be reused by headless consumers; all class merging happens in
 * `useOverflowStyles_unstable`.
 */
export const renderOverflow_unstable = (
  state: OverflowComponentState,
  contextValues: OverflowContextValues,
): React.ReactElement => {
  const child = getTriggerChild<HTMLElement>(state.children);

  const clonedChild = applyTriggerPropsToChildren(state.children, {
    ref: state.ref,
    className: state.className ?? child?.props.className,
  });

  return <OverflowContext.Provider value={contextValues.overflow}>{clonedChild}</OverflowContext.Provider>;
};
