import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  useEventCallback,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import type { TabProps, TabState } from './Tab.types';
import { useTabListContext_unstable } from '../TabList/TabListContext';
import { SelectTabEvent } from '../TabList/TabList.types';

/**
 * Create the state required to render Tab.
 *
 * The returned state can be modified with hooks such as useTabStyles_unstable,
 * before being passed to renderTab_unstable.
 *
 * @param props - props from this instance of Tab
 * @param ref - reference to root HTMLElement of Tab
 */
export const useTab_unstable = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  const { content, disabled: tabDisabled = false, icon, onClick, onFocus, value } = props;

  const appearance = useTabListContext_unstable(ctx => ctx.appearance);
  const reserveSelectedTabSpace = useTabListContext_unstable(ctx => ctx.reserveSelectedTabSpace);
  const selectTabOnFocus = useTabListContext_unstable(ctx => ctx.selectTabOnFocus);
  const listDisabled = useTabListContext_unstable(ctx => ctx.disabled);
  const selected = useTabListContext_unstable(ctx => ctx.selectedValue === value);
  const onRegister = useTabListContext_unstable(ctx => ctx.onRegister);
  const onUnregister = useTabListContext_unstable(ctx => ctx.onUnregister);
  const onSelect = useTabListContext_unstable(ctx => ctx.onSelect);
  const size = useTabListContext_unstable(ctx => ctx.size);
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
      getIntrinsicElementProps('button', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLButtonElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLButtonElement>,
        role: 'tab',
        type: 'button',
        // aria-selected undefined indicates it is not selectable
        // according to https://www.w3.org/TR/wai-aria-1.1/#aria-selected
        'aria-selected': disabled ? undefined : (`${selected}` as 'true' | 'false'),
        ...props,
        disabled,
        onClick: onTabClick,
        onFocus: selectTabOnFocus ? onTabFocus : onFocus,
      }),
      { elementType: 'button' },
    ),
    icon: iconSlot,
    iconOnly,
    content: contentSlot,
    contentReservedSpace: slot.optional(content, {
      renderByDefault: !selected && !iconOnly && reserveSelectedTabSpace,
      defaultProps: { children: props.children },
      elementType: 'span',
    }),
    appearance,
    disabled,
    selected,
    size,
    value,
    vertical,
  };
};
