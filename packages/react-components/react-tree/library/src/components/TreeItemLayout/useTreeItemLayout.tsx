import * as React from 'react';
import {
  getIntrinsicElementProps,
  isResolvedShorthand,
  useMergedRefs,
  slot,
  useEventCallback,
  elementContains,
  useControllableState,
} from '@fluentui/react-utilities';
import { useTreeItemContext_unstable, useTreeContext_unstable } from '../../contexts';
import type {
  TreeItemLayoutActionSlotProps,
  TreeItemLayoutActionVisibilityChangeData,
  TreeItemLayoutProps,
  TreeItemLayoutState,
} from './TreeItemLayout.types';
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
  'use no memo';

  const { main, iconAfter, iconBefore } = props;

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);

  const [isActionsVisibleFromProps, onActionVisibilityChange]: [
    TreeItemLayoutActionSlotProps['visible'],
    TreeItemLayoutActionSlotProps['onVisibilityChange'],
  ] = isResolvedShorthand(props.actions)
    ? // .visible .onVisibilityChange prop should not be propagated to the DOM
      [props.actions.visible, props.actions.onVisibilityChange]
    : [undefined, undefined];

  const [isActionsVisible, setIsActionsVisible] = useControllableState({
    state: isActionsVisibleFromProps,
    initialState: false,
  });
  const selectionRef = useTreeItemContext_unstable(ctx => ctx.selectionRef);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);
  const actionsRef = useTreeItemContext_unstable(ctx => ctx.actionsRef);
  const actionsRefInternal = React.useRef<HTMLDivElement>(null);
  const treeItemRef = useTreeItemContext_unstable(ctx => ctx.treeItemRef);
  const subtreeRef = useTreeItemContext_unstable(ctx => ctx.subtreeRef);
  const checked = useTreeItemContext_unstable(ctx => ctx.checked);
  const isBranch = useTreeItemContext_unstable(ctx => ctx.itemType === 'branch');

  // FIXME: Asserting is required here, as converting this to RefObject on context type would be a breaking change
  assertIsRefObject(treeItemRef);
  // FIXME: Asserting is required here, as converting this to RefObject on context type would be a breaking change
  assertIsRefObject(subtreeRef);

  const setActionsVisibleIfNotFromSubtree = React.useCallback(
    (event: MouseEvent | FocusEvent) => {
      const isTargetFromSubtree = Boolean(
        subtreeRef.current && elementContains(subtreeRef.current, event.target as Node),
      );
      if (!isTargetFromSubtree) {
        onActionVisibilityChange?.(event, {
          visible: true,
          event,
          type: event.type,
        } as Extract<TreeItemLayoutActionVisibilityChangeData, { event: typeof event }>);
        setIsActionsVisible(true);
      }
    },
    [subtreeRef, setIsActionsVisible, onActionVisibilityChange],
  );

  const setActionsInvisibleIfNotFromSubtree = React.useCallback(
    (event: FocusEvent | MouseEvent) => {
      const isRelatedTargetFromActions = Boolean(
        actionsRefInternal.current && elementContains(actionsRefInternal.current, event.relatedTarget as Node),
      );
      if (isRelatedTargetFromActions) {
        onActionVisibilityChange?.(event, {
          visible: true,
          event,
          type: event.type,
        } as Extract<TreeItemLayoutActionVisibilityChangeData, { event: typeof event }>);
        setIsActionsVisible(true);
        return;
      }
      const isTargetFromSubtree = Boolean(
        subtreeRef.current && elementContains(subtreeRef.current, event.target as Node),
      );
      if (!isTargetFromSubtree) {
        onActionVisibilityChange?.(event, {
          visible: false,
          event,
          type: event.type,
        } as Extract<TreeItemLayoutActionVisibilityChangeData, { event: typeof event }>);
        setIsActionsVisible(false);
        return;
      }
    },
    [subtreeRef, setIsActionsVisible, onActionVisibilityChange],
  );

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
    ? slot.optional(props.actions, {
        defaultProps: { ...arrowNavigationProps, role: 'toolbar' },
        elementType: 'div',
      })
    : undefined;
  delete actions?.visible;
  delete actions?.onVisibilityChange;
  const actionsRefs = useMergedRefs(actions?.ref, actionsRef, actionsRefInternal);
  const handleActionsBlur = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (isResolvedShorthand(props.actions)) {
      props.actions.onBlur?.(event);
    }
    const isRelatedTargetFromActions = Boolean(elementContains(event.currentTarget, event.relatedTarget as Node));
    onActionVisibilityChange?.(event, {
      visible: isRelatedTargetFromActions,
      event,
      type: event.type,
    } as Extract<TreeItemLayoutActionVisibilityChangeData, { event: typeof event }>);
    setIsActionsVisible(isRelatedTargetFromActions);
  });
  if (actions) {
    actions.ref = actionsRefs;
    actions.onBlur = handleActionsBlur;
  }

  const hasActions = Boolean(props.actions);

  React.useEffect(() => {
    if (treeItemRef.current && hasActions && isActionsVisibleFromProps === undefined) {
      const treeItemElement = treeItemRef.current;

      const handleMouseOver = setActionsVisibleIfNotFromSubtree;
      const handleMouseOut = setActionsInvisibleIfNotFromSubtree;
      const handleFocus = setActionsVisibleIfNotFromSubtree;
      const handleBlur = setActionsInvisibleIfNotFromSubtree;

      treeItemElement.addEventListener('mouseover', handleMouseOver);
      treeItemElement.addEventListener('mouseout', handleMouseOut);
      treeItemElement.addEventListener('focus', handleFocus);
      treeItemElement.addEventListener('blur', handleBlur);

      return () => {
        treeItemElement.removeEventListener('mouseover', handleMouseOver);
        treeItemElement.removeEventListener('mouseout', handleMouseOut);
        treeItemElement.removeEventListener('focus', handleFocus);
        treeItemElement.removeEventListener('blur', handleBlur);
      };
    }
  }, [
    hasActions,
    treeItemRef,
    isActionsVisibleFromProps,
    setActionsVisibleIfNotFromSubtree,
    setActionsInvisibleIfNotFromSubtree,
  ]);

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
    aside: !isActionsVisible
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

function assertIsRefObject<Value>(ref?: React.Ref<Value>): asserts ref is React.RefObject<Value> {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof ref !== 'object' || ref === null || !('current' in ref)) {
      throw new Error(`
        @fluentui/react-tree [${useTreeItemLayout_unstable.name}]:
        Internal Error: contextual ref is not a RefObject! Please report this bug immediately, as contextual refs should be RefObjects.
      `);
    }
  }
}
