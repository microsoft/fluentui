import * as React from 'react';
import { applyTriggerPropsToChildren, useMergedRefs } from '@fluentui/react-utilities';
import { useOverflowItem } from '../../useOverflowItem';
import { OverflowItemProps } from './OverflowItem.types';

/**
 * Attaches overflow item behavior to its child registered with the OverflowContext.
 * It does not render an element of its own.
 */
export const OverflowItem = React.forwardRef((props: OverflowItemProps, ref) => {
  const { id, groupId, priority, children } = props;

  const containerRef = useOverflowItem(id, priority, groupId);
  return applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref),
  });
});
