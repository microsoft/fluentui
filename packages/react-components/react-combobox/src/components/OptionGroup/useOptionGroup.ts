import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { OptionGroupProps, OptionGroupState } from './OptionGroup.types';

/**
 * Create the state required to render OptionGroup.
 *
 * The returned state can be modified with hooks such as useOptionGroupStyles_unstable,
 * before being passed to renderOptionGroup_unstable.
 *
 * @param props - props from this instance of OptionGroup
 * @param ref - reference to root HTMLElement of OptionGroup
 */
export const useOptionGroup_unstable = (props: OptionGroupProps, ref: React.Ref<HTMLElement>): OptionGroupState => {
  const labelId = useId('group-label');
  const { label } = props;

  return {
    components: {
      root: 'div',
      label: 'span',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      role: 'group',
      'aria-labelledby': label ? labelId : undefined,
      ...props,
    }),
    label: resolveShorthand(label, {
      defaultProps: {
        id: labelId,
        role: 'presentation',
      },
    }),
  };
};
