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
  const { content, icon, value } = props;

  const { appearance, selected, onRegister, onUnregister, onSelect, size, vertical } = useContextSelector(
    TabListContext,
    ctx => ({
      appearance: ctx.appearance,
      selected: ctx.selectedValue === value,
      onRegister: ctx.onRegister,
      onUnregister: ctx.onUnregister,
      onSelect: ctx.onSelect,
      size: ctx.size,
      vertical: !!ctx.vertical,
    }),
  );

  const onClick = useEventCallback((event: SelectTabEvent) => onSelect(event, { value }));

  const innerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    onRegister({
      value,
      ref: innerRef,
    });

    return () => {
      onUnregister({ value, ref: innerRef });
    };
  }, [onRegister, onUnregister, innerRef, value]);

  return {
    components: {
      root: 'div',
      icon: 'span',
      content: 'span',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, innerRef),
      role: 'tab',
      tabIndex: 0,
      ...props,
      onClick,
    }),
    icon: resolveShorthand(icon),
    content: resolveShorthand(content, { required: true, defaultProps: { children: props.children } }),
    appearance,
    selected,
    size,
    value,
    vertical,
  };
};
