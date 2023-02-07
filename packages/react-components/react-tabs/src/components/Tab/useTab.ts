import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
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
  const { content, disabled: tabDisabled = false, icon, value } = props;

  const appearance = useTabListContext_unstable(ctx => ctx.appearance);
  const reserveSelectedTabSpace = useTabListContext_unstable(ctx => ctx.reserveSelectedTabSpace);
  const listDisabled = useTabListContext_unstable(ctx => ctx.disabled);
  const selected = useTabListContext_unstable(ctx => ctx.selectedValue === value);
  const onRegister = useTabListContext_unstable(ctx => ctx.onRegister);
  const onUnregister = useTabListContext_unstable(ctx => ctx.onUnregister);
  const onSelect = useTabListContext_unstable(ctx => ctx.onSelect);
  const size = useTabListContext_unstable(ctx => ctx.size);
  const vertical = useTabListContext_unstable(ctx => !!ctx.vertical);
  const disabled = listDisabled || tabDisabled;

  const innerRef = React.useRef<HTMLElement>(null);
  const onClick = useEventCallback((event: SelectTabEvent) => onSelect(event, { value }));

  React.useEffect(() => {
    onRegister({
      value,
      ref: innerRef,
    });

    return () => {
      onUnregister({ value, ref: innerRef });
    };
  }, [onRegister, onUnregister, innerRef, value]);

  const iconShorthand = resolveShorthand(icon);
  const contentShorthand = resolveShorthand(content, { required: true, defaultProps: { children: props.children } });
  return {
    components: {
      root: 'button',
      icon: 'span',
      content: 'span',
    },
    root: getNativeElementProps('button', {
      ref: useMergedRefs(ref, innerRef),
      role: 'tab',
      type: 'button',
      // aria-selected undefined indicates it is not selectable
      // according to https://www.w3.org/TR/wai-aria-1.1/#aria-selected
      'aria-selected': disabled ? undefined : `${selected}`,
      ...props,
      disabled,
      onClick,
    }),
    icon: iconShorthand,
    iconOnly: Boolean(iconShorthand?.children && !contentShorthand.children),
    content: contentShorthand,
    appearance,
    contentReservedSpaceClassName: reserveSelectedTabSpace ? '' : undefined,
    disabled,
    selected,
    size,
    value,
    vertical,
  };
};
