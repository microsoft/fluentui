import * as React from 'react';
import { useFlex } from './useFlex';
import { FlexProps } from './Flex.types';
import { renderFlex } from './renderFlex';
import { useFlexStyles } from './useFlexStyles';

/**
 * TODO: Component docs
 * {@docCategory Flex }
 */
export const Flex: React.FunctionComponent<FlexProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  FlexProps
>((props, ref) => {
  const state = useFlex(props, ref);

  useFlexStyles(state);
  return renderFlex(state);
});

Flex.displayName = 'Flex';
