import * as React from 'react';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';
import { useFocusRects } from '@uifabric/utilities';
import { CardProps, CardState } from './Card.types';
import { useCardBehavior } from './useCardBehavior';

/**
 * The useCard hook processes the Card component props and returns state.
 * @param props - Card props to derive state from.
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLElement>, options: ComposePreparedOptions): CardState => {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  useFocusRects(cardRef);

  const cardBehaviorProps = useCardBehavior(props);

  return {
    ...cardBehaviorProps,
    cardRef,
    style: getStyleFromPropsAndOptions(props, options, '--card'),
  };
};
