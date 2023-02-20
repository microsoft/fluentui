import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import { ChevronDownRegular } from '@fluentui/react-icons';
import type { SelectProps, SelectState } from './Select.types';
import { useOverrides_unstable as useOverrides } from '@fluentui/react-shared-contexts';

/**
 * Create the state required to render Select.
 *
 * The returned state can be modified with hooks such as useSelectStyles,
 * before being passed to renderSelect.
 *
 * @param props - props from this instance of Select
 * @param ref - reference to the `<select>` element in Select
 */
export const useSelect_unstable = (props: SelectProps, ref: React.Ref<HTMLSelectElement>): SelectState => {
  const overrides = useOverrides();

  const {
    defaultValue,
    value,
    select,
    icon,
    root,
    appearance = overrides.inputDefaultAppearance ?? 'outline',

    onChange,
    size = 'medium',
  } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'select',
    excludedPropNames: ['appearance', 'defaultValue', 'onChange', 'size', 'value'],
  });

  const state: SelectState = {
    size,
    appearance,
    components: {
      root: 'span',
      select: 'select',
      icon: 'span',
    },
    select: resolveShorthand(select, {
      required: true,
      defaultProps: {
        defaultValue,
        value,
        ref,
        ...nativeProps.primary,
      },
    }),
    icon: resolveShorthand(icon, {
      required: true,
      defaultProps: { children: <ChevronDownRegular /> },
    }),
    root: resolveShorthand(root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
  };

  state.select.onChange = useEventCallback(event => {
    onChange?.(event, { value: (event.target as HTMLSelectElement).value });
  });

  return state;
};
