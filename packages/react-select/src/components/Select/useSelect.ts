import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
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
 * @param ref - reference to the `<select>` element in Select
 */
export const useSelect = (props: SelectProps, ref: React.Ref<HTMLSelectElement>): SelectState => {
  const { select, icon, root, size, appearance, inline } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'select',
    excludedPropNames: ['appearance', 'inline', 'size'],
  });

  return {
    size,
    appearance,
    inline,
    components: {
      root: 'span',
      select: 'select',
      icon: 'span',
    },
    select: resolveShorthand(select, {
      required: true,
      defaultProps: {
        ref,
        ...nativeProps.primary,
      },
    }),
    icon: resolveShorthand(icon, { required: true }),
    root: resolveShorthand(root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
  };
};
