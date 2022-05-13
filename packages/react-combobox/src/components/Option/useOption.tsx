import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
import { CheckmarkFilled, CheckboxUncheckedFilled, CheckboxCheckedFilled } from '@fluentui/react-icons';
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
  const { disabled, value } = props;
  const optionRef = React.useRef<HTMLElement>(null);
  const optionValue = getValueString(value, props.children);

  // context values
  const multiselect = useContextSelector(ListboxContext, ctx => ctx.multiselect);
  const onOptionClick = useContextSelector(ListboxContext, ctx => ctx.onOptionClick);
  const registerOption = useContextSelector(ListboxContext, ctx => ctx.registerOption);
  const selected = useContextSelector(ListboxContext, ctx => {
    const selectedOptions = ctx.selectedOptions;

    return !!optionValue && !!selectedOptions.find(o => o === optionValue);
  });

  // use the id if provided, otherwise use a generated id
  const defaultId = useId('fluent-option');
  const id = React.useMemo(() => {
    return props.id || defaultId;
  }, [props.id, defaultId]);

  // current active option?
  const active = useContextSelector(ListboxContext, ctx => {
    return ctx.activeOption?.id !== undefined && ctx.activeOption?.id === id;
  });

  // check icon
  let CheckIcon = <CheckmarkFilled />;
  if (multiselect) {
    CheckIcon = selected ? <CheckboxCheckedFilled /> : <CheckboxUncheckedFilled />;
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onOptionClick(event, { id, disabled, value: optionValue });
    props.onClick?.(event);
  };

  // register option data with context
  React.useEffect(() => {
    if (id && optionRef.current) {
      return registerOption({ id, disabled, value: optionValue }, optionRef.current);
    }
  }, [registerOption, id, disabled, optionValue]);

  return {
    components: {
      root: 'div',
      checkIcon: 'span',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, optionRef),
      role: 'option',
      'aria-disabled': disabled ? 'true' : undefined,
      'aria-selected': `${selected}`,
      id,
      ...props,
      onClick,
    }),
    checkIcon: resolveShorthand(props.checkIcon, {
      required: true,
      defaultProps: {
        'aria-hidden': 'true',
        children: CheckIcon,
      },
    }),
    active,
    disabled,
    multiselect,
    selected,
  };
};
