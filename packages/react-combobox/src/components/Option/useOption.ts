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
  React.Children.forEach(children, child => {
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
export const useOption_unstable = (props: OptionProps, ref: React.Ref<HTMLElement>): OptionState => {
  const { id, fluentKey: key, disabled, value } = props;

  // context values
  const idBase = useContextSelector(ListboxContext, ctx => ctx.idBase);
  const onOptionClick = useContextSelector(ListboxContext, ctx => ctx.onOptionClick);
  const registerOption = useContextSelector(ListboxContext, ctx => ctx.registerOption);
  const selectedOptions = useContextSelector(ListboxContext, ctx => ctx.selectedOptions);

  // use the id if provided, otherwise construct id from key & idBase
  const optionId = id || key ? `${idBase}-${key}` : '';

  // current active option?
  const active = useContextSelector(ListboxContext, ctx => {
    return ctx.activeOption?.id !== undefined && ctx.activeOption?.id === optionId;
  });

  const selected = key ? !!selectedOptions.find(option => option.key === key) : false;
  const optionValue = getValueString(value, props.children);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    key && onOptionClick(event, { key, id: optionId, value: optionValue });
    props.onClick?.(event);
  };

  // register option data with context
  React.useEffect(() => {
    if (key && optionId) {
      return registerOption({ key, id: optionId, value: optionValue });
    }
  }, [registerOption, optionId, key, optionValue]);

  return {
    components: {
      root: 'div',
      checkIcon: 'span',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'option',
      'aria-selected': `${selected}`,
      id: optionId,
      ...props,
      onClick,
    }),
    checkIcon: resolveShorthand(props.checkIcon, {
      required: true,
      defaultProps: {
        'aria-hidden': 'true',
        children: 'x',
      },
    }),
    active,
    selected,
  };
};
