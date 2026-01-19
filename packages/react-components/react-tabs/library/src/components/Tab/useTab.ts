'use client';

import * as React from 'react';
import { type TabsterDOMAttribute, useTabsterAttributes } from '@fluentui/react-tabster';
import { mergeCallbacks, useEventCallback, useMergedRefs, slot, omit } from '@fluentui/react-utilities';
import type { TabProps, TabState, TabBaseProps, TabBaseState } from './Tab.types';
import { useTabListContext_unstable } from '../TabList';
import type { SelectTabEvent } from '../TabList';

/**
 * Create the state required to render Tab.
 *
 * The returned state can be modified with hooks such as useTabStyles_unstable,
 * before being passed to renderTab_unstable.
 *
 * @internal
 * @param props - props from this instance of Tab
 * @param ref - reference to root HTMLElement of Tab
 */
export const useTab_unstable = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  const { content } = props;

  const state = useTabBase_unstable(props, ref);
  const focusAttributes = useTabFocusAttributes_unstable(state);

  const appearance = useTabListContext_unstable(ctx => ctx.appearance);
  const reserveSelectedTabSpace = useTabListContext_unstable(ctx => ctx.reserveSelectedTabSpace);
  const size = useTabListContext_unstable(ctx => ctx.size ?? 'medium');

  const contentReservedSpace: typeof content =
    content && typeof content === 'object' ? omit(content, ['ref' as keyof typeof content]) : content;

  return {
    ...state,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: { ...state.components, contentReservedSpace: 'span' },
    root: {
      ...state.root,
      ...focusAttributes,
    },
    contentReservedSpace: slot.optional(contentReservedSpace, {
      renderByDefault: !state.selected && !state.iconOnly && reserveSelectedTabSpace,
      defaultProps: { children: props.children },
      elementType: 'span',
    }),
    appearance,
    size,
  };
};

/**
 * Create the based state required to render Tab without design specifics and focus attributes.
 *
 * @param props - props from this instance of Tab
 * @param ref - reference to root HTMLElement of Tab
 */
export const useTabBase_unstable = (props: TabBaseProps, ref: React.Ref<HTMLElement>): TabBaseState => {
  const { content, disabled: tabDisabled = false, icon, onClick, onFocus, value, ...rest } = props;

  const selectTabOnFocus = useTabListContext_unstable(ctx => ctx.selectTabOnFocus);
  const listDisabled = useTabListContext_unstable(ctx => ctx.disabled);
  const selected = useTabListContext_unstable(ctx => ctx.selectedValue === value);
  const onRegister = useTabListContext_unstable(ctx => ctx.onRegister);
  const onUnregister = useTabListContext_unstable(ctx => ctx.onUnregister);
  const onSelect = useTabListContext_unstable(ctx => ctx.onSelect);
  const vertical = useTabListContext_unstable(ctx => !!ctx.vertical);
  const disabled = listDisabled || tabDisabled;

  const innerRef = React.useRef<HTMLElement>(null);
  const onSelectCallback = (event: SelectTabEvent) => onSelect(event, { value });
  const onTabClick = useEventCallback(mergeCallbacks(onClick, onSelectCallback));
  const onTabFocus = useEventCallback(mergeCallbacks(onFocus, onSelectCallback));

  React.useEffect(() => {
    onRegister({
      value,
      ref: innerRef,
    });

    return () => {
      onUnregister({ value, ref: innerRef });
    };
  }, [onRegister, onUnregister, innerRef, value]);

  const iconSlot = slot.optional(icon, { elementType: 'span' });
  const contentSlot = slot.always(content, {
    defaultProps: { children: props.children },
    elementType: 'span',
  });
  const iconOnly = Boolean(iconSlot?.children && !contentSlot.children);
  return {
    components: { root: 'button', icon: 'span', content: 'span', contentReservedSpace: 'span' },
    root: slot.always(
      {
        ref: useMergedRefs(ref, innerRef),
        role: 'tab',
        type: 'button',
        // aria-selected undefined indicates it is not selectable
        // according to https://www.w3.org/TR/wai-aria-1.1/#aria-selected
        'aria-selected': disabled ? undefined : (`${selected}` as 'true' | 'false'),
        value,
        ...rest,
        disabled,
        onClick: onTabClick,
        onFocus: selectTabOnFocus ? onTabFocus : onFocus,
      },
      { elementType: 'button' },
    ) as TabBaseState['root'],
    icon: iconSlot,
    iconOnly,
    content: contentSlot,
    disabled,
    selected,
    value,
    vertical,
  };
};

/**
 * Hook to return focus attributes to a Tab based on selected state.
 * Should be applied on the button with role="tab".
 *
 * @internal
 */
export const useTabFocusAttributes_unstable = ({ selected }: Pick<TabBaseState, 'selected'>): TabsterDOMAttribute => {
  return useTabsterAttributes({
    focusable: { isDefault: selected },
  });
};
