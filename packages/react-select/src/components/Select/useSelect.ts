import * as React from 'react';
import { ChevronDown16Regular, ChevronDown20Regular, ChevronDown24Regular } from '@fluentui/react-icons';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import type { SelectProps, SelectState } from './Select.types';

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
  const { size = 'medium', appearance = 'outline', inline = false } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'select',
    excludedPropNames: ['appearance', 'inline', 'size'],
  });

  // Use the default down arrow if none is provided
  const DefaultSelectIcon =
    size === 'small' ? ChevronDown16Regular : size === 'medium' ? ChevronDown20Regular : ChevronDown24Regular;

  return {
    size,
    appearance,
    inline,
    components: {
      root: 'span',
      select: 'select',
      icon: 'span',
    },
    select: resolveShorthand(props.select, {
      required: true,
      defaultProps: {
        ref,
        ...nativeProps.primary,
      },
    }),
    icon: resolveShorthand(props.icon, {
      required: true,
      defaultProps: {
        children: <DefaultSelectIcon />,
      },
    }),
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
  };
};
