import * as React from 'react';
import { applyTriggerPropsToChildren, useMergedRefs } from '@fluentui/react-utilities';
import { useOverflowDivider } from '../../useOverflowDivider';
import { OverflowDividerProps } from './OverflowDivider.types';

/**
 * Attaches overflow item behavior to its child registered with the OverflowContext.
 * It does not render an element of its own.
 */
export const OverflowDivider = React.forwardRef((props: OverflowDividerProps, ref) => {
  const { groupId, children } = props;

  const containerRef = useOverflowDivider(groupId);
  return applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref),
  });
});
