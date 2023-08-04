import * as React from 'react';
import {
  ExtractSlotProps,
  getNativeElementProps,
  isResolvedShorthand,
  resolveShorthand,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useTreeItemContext_unstable, useTreeContext_unstable } from '../../contexts';
import type { TreeItemLayoutProps, TreeItemLayoutSlots, TreeItemLayoutState } from './TreeItemLayout.types';
import { Checkbox, CheckboxProps } from '@fluentui/react-checkbox';
import { Radio, RadioProps } from '@fluentui/react-radio';
import { TreeItemChevron } from '../TreeItemChevron';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

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
  const { main, iconAfter, iconBefore, as = 'span' } = props;

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);

  const [isActionsVisibleExternal, actionsShorthand]: [boolean | undefined, TreeItemLayoutSlots['actions']] =
    isResolvedShorthand(props.actions)
      ? // .visible prop should not be propagated to the DOM
        [props.actions.visible, { ...props.actions, visible: undefined }]
      : [undefined, props.actions];

  const isActionsVisible = useTreeItemContext_unstable(ctx => ctx.isActionsVisible) || isActionsVisibleExternal;
  const isAsideVisible = useTreeItemContext_unstable(ctx => ctx.isAsideVisible);
  const selectionRef = useTreeItemContext_unstable(ctx => ctx.selectionRef);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);
  const actionsRef = useTreeItemContext_unstable(ctx => ctx.actionsRef);
  const checked = useTreeItemContext_unstable(ctx => ctx.checked);
  const isBranch = useTreeItemContext_unstable(ctx => ctx.itemType === 'branch');

  const expandIcon = resolveShorthand(props.expandIcon, {
    required: isBranch,
    defaultProps: {
      children: <TreeItemChevron />,
      'aria-hidden': true,
    },
  });

  const expandIconRefs = useMergedRefs(expandIcon?.ref, expandIconRef);
  if (expandIcon) {
    expandIcon.ref = expandIconRefs;
  }

  const arrowNavigationProps = useArrowNavigationGroup({
    circular: true,
    axis: 'horizontal',
  });
  const actions = isActionsVisible
    ? resolveShorthand(actionsShorthand, {
        defaultProps: {
          ...arrowNavigationProps,
          role: 'toolbar',
        } as ExtractSlotProps<TreeItemLayoutSlots['actions']>,
      })
    : undefined;

  const actionsRefs = useMergedRefs(actions?.ref, actionsRef);
  if (actions) {
    actions.ref = actionsRefs;
  }

  return {
    components: {
      root: 'div',
      expandIcon: 'div',
      iconBefore: 'div',
      main: 'div',
      iconAfter: 'div',
      actions: 'div',
      aside: 'div',
      // Casting here to a union between checkbox and radio
      selector: (selectionMode === 'multiselect' ? Checkbox : Radio) as React.ElementType<CheckboxProps | RadioProps>,
    },
    buttonContextValue: { size: 'small' },
    root: getNativeElementProps(as, { ...props, ref: useMergedRefs(ref, layoutRef) }),
    iconBefore: resolveShorthand(iconBefore, { defaultProps: { 'aria-hidden': true } }),
    main: resolveShorthand(main, { required: true }),
    iconAfter: resolveShorthand(iconAfter, { defaultProps: { 'aria-hidden': true } }),
    aside: isAsideVisible ? resolveShorthand(props.aside) : undefined,
    actions,
    expandIcon,
    selector: resolveShorthand(props.selector, {
      required: selectionMode !== 'none',
      defaultProps: {
        checked,
        tabIndex: -1,
        'aria-hidden': true,
        ref: selectionRef,
      },
    }),
  };
};
