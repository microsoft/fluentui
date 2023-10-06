import * as React from 'react';
import {
  ExtractSlotProps,
  getIntrinsicElementProps,
  isResolvedShorthand,
  useMergedRefs,
  slot,
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
  const { main, iconAfter, iconBefore } = props;

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

  const expandIcon = slot.optional(props.expandIcon, {
    renderByDefault: isBranch,
    defaultProps: {
      children: <TreeItemChevron />,
      'aria-hidden': true,
    },
    elementType: 'div',
  });
  const expandIconRefs = useMergedRefs(expandIcon?.ref, expandIconRef);
  if (expandIcon) {
    expandIcon.ref = expandIconRefs;
  }
  const arrowNavigationProps = useArrowNavigationGroup({ circular: true, axis: 'horizontal' });
  const actions = isActionsVisible
    ? slot.optional(actionsShorthand, {
        defaultProps: { ...arrowNavigationProps, role: 'toolbar' } as ExtractSlotProps<TreeItemLayoutSlots['actions']>,
        elementType: 'div',
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
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, layoutRef) as React.Ref<HTMLDivElement>,
      }),
      {
        elementType: 'div',
      },
    ),
    iconBefore: slot.optional(iconBefore, { defaultProps: { 'aria-hidden': true }, elementType: 'div' }),
    main: slot.always(main, { elementType: 'div' }),
    iconAfter: slot.optional(iconAfter, { defaultProps: { 'aria-hidden': true }, elementType: 'div' }),
    aside: isAsideVisible
      ? slot.optional(props.aside, { defaultProps: { 'aria-hidden': true }, elementType: 'div' })
      : undefined,
    actions,
    expandIcon,
    selector: slot.optional(props.selector, {
      renderByDefault: selectionMode !== 'none',
      defaultProps: {
        checked,
        tabIndex: -1,
        'aria-hidden': true,
        ref: selectionRef,
        // casting here to a union between checkbox and radio
        // since ref is not present on the selector signature
        // FIXME: look into Slot type to see if we can make this work
      } as CheckboxProps | RadioProps,
      elementType: (selectionMode === 'multiselect' ? Checkbox : Radio) as React.ElementType<
        CheckboxProps | RadioProps
      >,
    }),
  };
};
