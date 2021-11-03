import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { SelectProps, SelectSlots, SelectState } from './Select.types';

/**
 * Array of all shorthand properties listed as the keys of SelectSlots
 */
export const selectShorthandProps: (keyof SelectSlots)[] = ['select', 'icon', 'root'];

/**
 * Create the state required to render Select.
 *
 * The returned state can be modified with hooks such as useSelectStyles,
 * before being passed to renderSelect.
 *
 * @param props - props from this instance of Select
 * @param ref - reference to root HTMLSelectElement of Select
 */
export const useSelect = (props: SelectProps, ref: React.Ref<HTMLElement>): SelectState => {
  const { select, icon, size, appearance, inline } = props;

  return {
    size,
    appearance,
    inline,
    components: {
      root: 'span',
      select: 'select',
      icon: 'span',
    },
    select: resolveShorthand(select, { required: true }),
    icon: resolveShorthand(icon, { required: true }),
    root: getNativeElementProps('span', {
      ref,
      ...props,
    }),
  };
};
