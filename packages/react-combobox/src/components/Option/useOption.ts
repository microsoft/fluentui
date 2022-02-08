import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
import { ListboxContext } from '../../contexts/ListboxContext';
import type { OptionProps, OptionState } from './Option.types';

// TODO: refine this more
function getValueString(value: string | undefined, children: React.ReactNode) {
  if (value) {
    return value;
  }

  let valueString = '';
  React.Children.map(children, child => {
    if (typeof child === 'string') {
      valueString += child;
    }
  });
  return valueString;
}

/**
 * Create the state required to render Option.
 *
 * The returned state can be modified with hooks such as useOptionStyles_unstable,
 * before being passed to renderOption_unstable.
 *
 * @param props - props from this instance of Option
 * @param ref - reference to root HTMLElement of Option
 */
export const useOption = (props: OptionProps, ref: React.Ref<HTMLElement>): OptionState => {
  const { activeId, onOptionClick, registerOption, selectedKeys, unRegisterOption } = useContextSelector(
    ListboxContext,
    ctx => ({
      activeId: ctx.activeId,
      onOptionClick: ctx.onOptionClick,
      registerOption: ctx.registerOption,
      selectedKeys: ctx.selectedKeys,
      unRegisterOption: ctx.unRegisterOption,
    }),
  );
  const { id, disabled, value } = props;
  const selected = id ? selectedKeys.indexOf(id) > -1 : false;

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onOptionClick(id || '');
    props.onClick?.(event);
  };

  // register option data with context
  React.useEffect(() => {
    // TODO: fix types for id/move to using required itemKey prop
    const optionValue = getValueString(value, props.children);
    registerOption({ id: id as string, value: optionValue });

    return () => {
      unRegisterOption(id as string);
    };
  }, [registerOption, unRegisterOption, id, value, props.children]);

  return {
    components: {
      root: 'div',
      check: 'span',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'option',
      'aria-selected': `${selected}`,
      id,
      ...props,
      onClick,
    }),
    check: resolveShorthand(props.check, {
      required: true,
      defaultProps: {
        'aria-hidden': 'true',
        children: 'x',
      },
    }),
    isActive: id === activeId,
    selected,
  };
};
