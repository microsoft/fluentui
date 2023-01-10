import { getNativeElementProps } from '@fluentui/react-utilities';
import * as React from 'react';
import { ToolbarRadioGroupProps, ToolbarRadioGroupState } from './ToolbarRadioGroup.types';

/**
 * Given user props, defines default props for the Group
 * @param props - User provided props to the Group component.
 * @param ref - User provided ref to be passed to the Group component.
 */
export const useToolbarRadioGroup_unstable = (
  props: ToolbarRadioGroupProps,
  ref: React.Ref<HTMLDivElement>,
): ToolbarRadioGroupState => {
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps<React.HTMLAttributes<HTMLDivElement>>('div', {
      ref,
      role: 'radiogroup',
      ...props,
    }),
  };
};
