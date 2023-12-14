import * as React from 'react';
import { getIntrinsicElementProps } from '@fluentui/react-utilities';
import type { TeachingPopoverActionsProps, TeachingPopoverActionsState } from './TeachingPopoverActions.types';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverActions properties
 * @param ref - reference to root HTMLElement of TeachingPopoverActions
 */
export const useTeachingPopoverActions_unstable = (
  props: TeachingPopoverActionsProps,
  ref: React.Ref<HTMLElement>,
): TeachingPopoverActionsState => {
  const { as } = props;

  return {
    components: {
      root: 'div',
    },
    root: getIntrinsicElementProps(as || 'div', {
      ref: ref as React.Ref<HTMLDivElement>,
      ...props,
    }),
  };
};
