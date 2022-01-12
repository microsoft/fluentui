import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
// import { OptionGroupContext } from '../../contexts/OptionGroupContext';
import { ListboxContext } from '../../contexts/ListboxContext';
import type { OptionProps, OptionSlots, OptionState } from './Option.types';

/**
 * Array of all shorthand properties listed in OptionSlots
 */
export const optionShorthandProps: (keyof OptionSlots)[] = [
  'root',
  // TODO add shorthand property names
];

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
  const { registerOption, unRegisterOption, activeId } = useContextSelector(ListboxContext, ctx => ({
    activeId: ctx.activeId,
    registerOption: ctx.registerOption,
    unRegisterOption: ctx.unRegisterOption,
  }));
  const { id } = props;

  // register option data with context
  React.useEffect(() => {
    // TODO: fix types for id
    registerOption({ id: id as string, value: 'placeholder' });

    return () => {
      unRegisterOption(id as string);
    };
  }, [registerOption, unRegisterOption, id]);

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'option',
      id,
      ...props,
    }),
    isActive: id === activeId,
  };
};
