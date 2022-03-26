import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TabProps, TabState } from './Tab.types';
import { TabListContext } from '../TabList/TabListContext';
import { useContextSelector } from '@fluentui/react-context-selector';
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
  const { content, disabled: tabDisabled, icon, value } = props;

  const {
    appearance,
    listDisabled,
    selectedValue,
    onRegister,
    onUnregister,
    onSelect,
    size,
    vertical,
  } = useContextSelector(TabListContext, ctx => ({
    appearance: ctx.appearance,
    listDisabled: ctx.disabled,
    selectedValue: ctx.selectedValue,
    onRegister: ctx.onRegister,
    onUnregister: ctx.onUnregister,
    onSelect: ctx.onSelect,
    size: ctx.size,
    vertical: !!ctx.vertical,
  }));

  const disabled = listDisabled || tabDisabled;

  const innerRef = React.useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(ref, innerRef);
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
      ref: mergedRef,
      role: 'tab',
      tabIndex: 0,
      ...props,
      disabled,
      onClick,
    }),
    icon: iconShorthand,
    iconOnly: Boolean(iconShorthand?.children && !contentShorthand.children),
    content: contentShorthand,
    appearance,
    disabled,
    selectedValue,
    size,
    value,
    vertical,
  };
};
