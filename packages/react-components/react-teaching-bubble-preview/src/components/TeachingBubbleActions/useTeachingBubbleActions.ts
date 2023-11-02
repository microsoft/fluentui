import * as React from 'react';
import { getIntrinsicElementProps } from '@fluentui/react-utilities';
import type { TeachingBubbleActionsProps, TeachingBubbleActionsState } from './TeachingBubbleActions.types';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingBubbleActions properties
 * @param ref - reference to root HTMLElement of TeachingBubbleActions
 */
export const useTeachingBubbleActions_unstable = (
  props: TeachingBubbleActionsProps,
  ref: React.Ref<HTMLElement>,
): TeachingBubbleActionsState => {
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
