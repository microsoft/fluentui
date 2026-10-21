'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  isResolvedShorthand,
  useMergedRefs,
  slot,
  useEventCallback,
  elementContains,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import { useTreeItemContext_unstable, useTreeContext_unstable } from '../../contexts';
import type {
  TreeItemLayoutActionSlotProps,
  TreeItemLayoutActionVisibilityChangeData,
  TreeItemLayoutBaseProps,
  TreeItemLayoutBaseState,
  TreeItemLayoutProps,
  TreeItemLayoutState,
} from './TreeItemLayout.types';
import type { CheckboxProps } from '@fluentui/react-checkbox';
import { Checkbox } from '@fluentui/react-checkbox';
import type { RadioProps } from '@fluentui/react-radio';
import { Radio } from '@fluentui/react-radio';
import { TreeItemChevron } from '../TreeItemChevron';
import { useArrowNavigationGroup, useIsNavigatingWithKeyboard } from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

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
  const { selector: selectorProp, ...baseProps } = props;
  const isNavigatingWithKeyboard = useIsNavigatingWithKeyboard();
  const { targetDocument } = useFluent();
  const state = useTreeItemLayoutBase(
    // The base hook only needs to know whether the consumer provided or disabled the selector,
    // the Fluent selector itself is resolved below.
    { ...baseProps, selector: selectorProp === undefined || selectorProp === null ? selectorProp : {} },
    ref,
    targetDocument,
    isNavigatingWithKeyboard,
  );

  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);
  const navigationMode = useTreeContext_unstable(ctx => ctx.navigationMode ?? 'tree');
  const selectionRef = useTreeItemContext_unstable(ctx => ctx.selectionRef);
  const checked = useTreeItemContext_unstable(ctx => ctx.checked);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);

  // Link the selector to the main content unless the consumer provided an accessible name
  const selectorShorthand = isResolvedShorthand(selectorProp) ? selectorProp : undefined;
  const selectorAriaLabelledBy =
    selectorShorthand?.['aria-label'] || selectorShorthand?.['aria-labelledby'] ? undefined : state.main.id;

  const selector = slot.optional(selectorProp, {
    renderByDefault: selectionMode !== 'none',
    defaultProps: {
      checked,
      tabIndex: -1,
      ref: selectionRef,
      'aria-labelledby': selectorAriaLabelledBy,
      // casting here to a union between checkbox and radio
      // since ref is not present on the selector signature
      // FIXME: look into Slot type to see if we can make this work
    } as CheckboxProps | RadioProps,
    elementType: (selectionMode === 'multiselect' ? Checkbox : Radio) as React.ElementType<CheckboxProps | RadioProps>,
  });
  // Checkbox and Radio slot props omit `ref` from their type, but consumers can still provide it.
  const selectorConsumerRef = selector && (selector as typeof selector & { ref?: React.Ref<HTMLInputElement> }).ref;
  const selectorRef = useMergedRefs(selectorConsumerRef, selectionRef);
  const selectorWithRef = selector && { ...selector, ref: selectorRef };

  const arrowNavigationProps = useArrowNavigationGroup({ circular: navigationMode === 'tree', axis: 'horizontal' });
  const expandIcon = state.expandIcon
    ? slot.optional(props.expandIcon, {
        renderByDefault: true,
        defaultProps: {
          'aria-hidden': true,
          children: <TreeItemChevron />,
          ref: expandIconRef,
        },
        elementType: 'div',
      })
    : undefined;
  const expandIconRefWithConsumer = useMergedRefs(expandIcon?.ref, expandIconRef);
  const expandIconWithRef = expandIcon && { ...expandIcon, ref: expandIconRefWithConsumer };

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      // Casting here to a union between checkbox and radio
      selector: (selectionMode === 'multiselect' ? Checkbox : Radio) as React.ElementType<CheckboxProps | RadioProps>,
    },
    buttonContextValue: { size: 'small' },
    // Consumer props keep winning over the navigation attributes, matching the base slot ordering.
    actions: state.actions && { ...arrowNavigationProps, ...state.actions },
    expandIcon: expandIconWithRef,
    selector: selectorWithRef,
  };
};

/**
 * Base state hook for TreeItemLayout, free of any focus management runtime and of the Fluent
 * components used for the selector, the expand icon and the actions.
 *
 * The selector slot is rendered as a native `input`, of type `checkbox` in multiselect mode and
 * `radio` in single selection mode, the expand icon has no default content, and the Tabster driven
 * arrow key navigation of the actions is layered on by the wrapping `useTreeItemLayout_unstable` hook.
 *
 * @param props - props from this instance of TreeItemLayout
 * @param ref - reference to root HTMLElement of TreeItemLayout
 */
export const useTreeItemLayoutBase_unstable = (
  props: TreeItemLayoutBaseProps,
  ref: React.Ref<HTMLElement>,
): TreeItemLayoutBaseState => {
  const { targetDocument } = useFluent();
  const isNavigatingWithKeyboard = useDOMKeyboardNavigation(targetDocument, Boolean(props.actions));

  return useTreeItemLayoutBase(props, ref, targetDocument, isNavigatingWithKeyboard);
};

function useTreeItemLayoutBase(
  props: TreeItemLayoutBaseProps,
  ref: React.Ref<HTMLElement>,
  targetDocument: Document | undefined,
  isNavigatingWithKeyboard: () => boolean,
): TreeItemLayoutBaseState {
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

  const mainShorthand = isResolvedShorthand(main) ? main : undefined;
  const mainContentId = useId('fui-TreeItemLayout__main-', mainShorthand?.id);

  // Link the selector to the main content unless the consumer provided an accessible name
  const selectorShorthand = isResolvedShorthand(props.selector) ? props.selector : undefined;
  const selectorAriaLabelledBy =
    selectorShorthand?.['aria-label'] || selectorShorthand?.['aria-labelledby'] ? undefined : mainContentId;

  // The mixed state of a native checkbox can only be set through its `indeterminate` DOM property.
  const selectorInputRef = React.useRef<HTMLInputElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (selectorInputRef.current) {
      selectorInputRef.current.indeterminate = checked === 'mixed';
    }
  });

  const selectorSlot = slot.optional(props.selector, {
    renderByDefault: selectionMode !== 'none',
    defaultProps: {
      type: selectionMode === 'multiselect' ? 'checkbox' : 'radio',
      checked: checked === true,
      tabIndex: -1,
      'aria-labelledby': selectorAriaLabelledBy,
      // Changes bubble up to the tree item, which owns the selection state.
      onChange: noop,
    },
    elementType: 'input',
  });
  const selectorRef = useMergedRefs(selectorSlot?.ref, selectionRef, selectorInputRef);
  const selector = selectorSlot && { ...selectorSlot, ref: selectorRef };
  const mainSlot = slot.always(main, {
    defaultProps: { id: selector ? mainContentId : undefined },
    elementType: 'div',
  });

  // FIXME: Asserting is required here, as converting this to RefObject on context type would be a breaking change
  // eslint-disable-next-line react-hooks/refs
  assertIsRefObject(treeItemRef);
  // FIXME: Asserting is required here, as converting this to RefObject on context type would be a breaking change
  // eslint-disable-next-line react-hooks/refs
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
        if (event.defaultPrevented) {
          return;
        }
        setIsActionsVisible(true);
      }
    },
    [subtreeRef, setIsActionsVisible, onActionVisibilityChange],
  );

  const hasActions = Boolean(props.actions);

  const setActionsInvisibleIfNotFromSubtree = React.useCallback(
    (event: FocusEvent | MouseEvent) => {
      const isRelatedTargetFromActions = () =>
        Boolean(actionsRefInternal.current && elementContains(actionsRefInternal.current, event.relatedTarget as Node));
      const isRelatedTargetFromTreeItem = () =>
        Boolean(treeItemRef.current && elementContains(treeItemRef.current, event.relatedTarget as Node));
      const isTargetFromActions = () => Boolean(actionsRefInternal.current?.contains(event.target as Node));
      if (isRelatedTargetFromActions()) {
        onActionVisibilityChange?.(event, {
          visible: true,
          event,
          type: event.type,
        } as Extract<TreeItemLayoutActionVisibilityChangeData, { event: typeof event }>);
        if (event.defaultPrevented) {
          return;
        }
        setIsActionsVisible(true);
        return;
      }
      if (isTargetFromActions() && isRelatedTargetFromTreeItem()) {
        return;
      }
      // when a mouseout event happens during keyboard interaction
      // we should not hide the actions if the activeElement is the treeitem or an action
      // as the focus on the treeitem takes precedence over the mouseout event
      if (
        event.type === 'mouseout' &&
        isNavigatingWithKeyboard() &&
        (targetDocument?.activeElement === treeItemRef.current ||
          elementContains(actionsRefInternal.current, targetDocument?.activeElement as Node))
      ) {
        return;
      }
      onActionVisibilityChange?.(event, {
        visible: false,
        event,
        type: event.type,
      } as Extract<TreeItemLayoutActionVisibilityChangeData, { event: typeof event }>);
      if (event.defaultPrevented) {
        return;
      }
      setIsActionsVisible(false);
    },
    [setIsActionsVisible, onActionVisibilityChange, treeItemRef, isNavigatingWithKeyboard, targetDocument],
  );

  const expandIconSlot = slot.optional(props.expandIcon, {
    renderByDefault: isBranch,
    defaultProps: {
      'aria-hidden': true,
    },
    elementType: 'div',
  });
  const expandIconRefs = useMergedRefs(expandIconSlot?.ref, expandIconRef);
  const expandIcon = expandIconSlot && { ...expandIconSlot, ref: expandIconRefs };
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

  const actionsRefs = useMergedRefs(actionsRef, actionsRefInternal);
  const actions = isActionsVisible
    ? slot.optional(props.actions, {
        defaultProps: {
          role: 'toolbar',
          ref: actionsRefs,
          onBlur: handleActionsBlur,
        },
        elementType: 'div',
      })
    : undefined;

  React.useEffect(() => {
    if (treeItemRef.current && hasActions) {
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
  }, [hasActions, treeItemRef, setActionsVisibleIfNotFromSubtree, setActionsInvisibleIfNotFromSubtree]);

  return {
    components: {
      root: 'div',
      expandIcon: 'div',
      iconBefore: 'div',
      main: 'div',
      iconAfter: 'div',
      actions: 'div',
      aside: 'div',
      selector: 'input',
    },
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
    iconBefore: slot.optional(iconBefore, { elementType: 'div' }),
    main: mainSlot,
    iconAfter: slot.optional(iconAfter, { elementType: 'div' }),
    aside: !isActionsVisible ? slot.optional(props.aside, { elementType: 'div' }) : undefined,
    actions,
    expandIcon,
    selector,
  };
}

function useDOMKeyboardNavigation(targetDocument: Document | undefined, enabled: boolean): () => boolean {
  const isNavigatingWithKeyboardRef = React.useRef(false);

  React.useEffect(() => {
    if (!targetDocument || !enabled) {
      return;
    }

    const onKeyDown = () => {
      isNavigatingWithKeyboardRef.current = true;
    };
    const onPointerInteraction = () => {
      isNavigatingWithKeyboardRef.current = false;
    };

    targetDocument.addEventListener('keydown', onKeyDown, true);
    targetDocument.addEventListener('pointermove', onPointerInteraction, true);
    targetDocument.addEventListener('pointerdown', onPointerInteraction, true);
    targetDocument.addEventListener('mousemove', onPointerInteraction, true);
    targetDocument.addEventListener('mousedown', onPointerInteraction, true);
    targetDocument.addEventListener('touchstart', onPointerInteraction, true);

    return () => {
      targetDocument.removeEventListener('keydown', onKeyDown, true);
      targetDocument.removeEventListener('pointermove', onPointerInteraction, true);
      targetDocument.removeEventListener('pointerdown', onPointerInteraction, true);
      targetDocument.removeEventListener('mousemove', onPointerInteraction, true);
      targetDocument.removeEventListener('mousedown', onPointerInteraction, true);
      targetDocument.removeEventListener('touchstart', onPointerInteraction, true);
    };
  }, [targetDocument, enabled]);

  return React.useCallback(() => isNavigatingWithKeyboardRef.current, []);
}

function noop() {
  /* noop */
}

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
