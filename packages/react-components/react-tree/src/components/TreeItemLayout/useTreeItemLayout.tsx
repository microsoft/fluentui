import * as React from 'react';
import {
  ExtractSlotProps,
  getNativeElementProps,
  isResolvedShorthand,
  resolveShorthand,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { Checkbox } from '@fluentui/react-checkbox';
import { Radio } from '@fluentui/react-radio';
import type { TreeItemLayoutProps, TreeItemLayoutSlots, TreeItemLayoutState } from './TreeItemLayout.types';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import { TreeItemChevron } from '../TreeItemChevron';
import { useTreeContext_unstable } from '../../contexts/treeContext';

/**
 * Create the state required to render TreeItemLayout.
 *
 * The returned state can be modified with hooks such as useTreeItemLayoutStyles_unstable,
 * before being passed to renderTreeItemLayout_unstable.
 *
 * @param props - props from this instance of TreeItemLayout
 * @param ref - reference to root HTMLElement of TreeItemLayout
 */
export const useTreeItemLayout_unstable = (
  props: TreeItemLayoutProps,
  ref: React.Ref<HTMLElement>,
): TreeItemLayoutState => {
  const { content, iconAfter, iconBefore, expandIcon, as = 'span', aside, actions } = props;

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);
  const isActionsVisibleContext = useTreeItemContext_unstable(ctx => ctx.isActionsVisible);
  const isAsideVisible = useTreeItemContext_unstable(ctx => ctx.isAsideVisible);
  const isActionsVisible = (isResolvedShorthand(actions) ? actions.visible : undefined) ?? isActionsVisibleContext;
  const isBranch = useTreeItemContext_unstable(ctx => ctx.itemType === 'branch');
  const checked = useTreeItemContext_unstable(ctx => ctx.checked);
  // TODO: Check if it is a branch or leaf and set accordingly as below:
  // const checked = useDataGridContext_unstable(ctx => {
  //   if (isHeader && ctx.selection.selectionMode === 'multiselect') {
  //     return ctx.selection.allRowsSelected ? true : ctx.selection.someRowsSelected ? 'mixed' : false;
  //   }

  //   return ctx.selection.isRowSelected(rowId);
  // });

  const defaultChecked = useTreeItemContext_unstable(ctx => ctx.defaultChecked);
  const selection = useTreeContext_unstable(ctx => ctx.selection);
  const actionsRef = useMergedRefs(
    isResolvedShorthand(actions) ? actions.ref : undefined,
    useTreeItemContext_unstable(ctx => ctx.actionsRef),
  );

  return {
    components: {
      root: 'div',
      expandIcon: 'div',
      checkboxIndicator: Checkbox,
      radioIndicator: Radio,
      iconBefore: 'div',
      content: 'div',
      iconAfter: 'div',
      actions: 'div',
      aside: 'div',
    },
    buttonContextValue: { size: 'small' },
    root: getNativeElementProps(as, { ...props, ref: useMergedRefs(ref, layoutRef) }),
    iconBefore: resolveShorthand(iconBefore, { defaultProps: { 'aria-hidden': true } }),
    content: resolveShorthand(content, { required: true }),
    iconAfter: resolveShorthand(iconAfter, { defaultProps: { 'aria-hidden': true } }),
    aside: isAsideVisible ? resolveShorthand(aside) : undefined,
    actions: isActionsVisible
      ? resolveShorthand<ExtractSlotProps<TreeItemLayoutSlots['actions']>>(
          // visible props should not be propagated to the DOM
          isResolvedShorthand(actions) ? { ...actions, visible: undefined } : actions,
          {
            defaultProps: { ref: actionsRef },
          },
        )
      : undefined,
    expandIcon: resolveShorthand(expandIcon, {
      required: isBranch,
      defaultProps: {
        children: <TreeItemChevron />,
        'aria-hidden': true,
        ref: useMergedRefs(isResolvedShorthand(expandIcon) ? expandIcon.ref : undefined, expandIconRef),
      },
    }),
    selection,
    'aria-checked': selection === 'checkbox' ? checked : undefined,
    'aria-selected': selection === 'radio' && checked !== 'mixed' ? checked : undefined,
    checkboxIndicator: resolveShorthand(props.checkboxIndicator, {
      required: selection === 'checkbox',
      defaultProps: {
        checked,
        defaultChecked,
        tabIndex: -1,
      },
    }),
    radioIndicator: resolveShorthand(props.radioIndicator, {
      required: selection === 'radio',
      defaultProps: { checked, defaultChecked, input: { name: useId('tree-selection-radio') }, tabIndex: -1 },
    }),
  };
};
