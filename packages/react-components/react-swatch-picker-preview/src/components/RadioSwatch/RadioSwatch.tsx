import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useRadioSwatch_unstable } from './useRadioSwatch';
import { renderRadioSwatch_unstable } from './renderRadioSwatch';
import { useRadioSwatchStyles_unstable } from './useRadioSwatchStyles.styles';
import type { RadioSwatchProps } from './RadioSwatch.types';

/**
 * RadioSwatch component - TODO: add more docs
 */
export const RadioSwatch: ForwardRefComponent<RadioSwatchProps> = React.forwardRef((props, ref) => {
  const state = useRadioSwatch_unstable(props, ref);

  useRadioSwatchStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useRadioSwatchStyles_unstable')(state);
  return renderRadioSwatch_unstable(state);
});

RadioSwatch.displayName = 'RadioSwatch';
