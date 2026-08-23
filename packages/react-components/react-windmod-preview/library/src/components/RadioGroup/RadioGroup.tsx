'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderRadioGroup,
  useRadioGroup,
  useRadioGroupContextValues,
} from '@fluentui/react-headless-components-preview/radio-group';

import type { RadioGroupProps, RadioGroupState } from './RadioGroup.types';
import { useRadioGroupStyles } from './useRadioGroupStyles';

/**
 * A RadioGroup presents a set of options where only one can be selected. Windmod RadioGroup: the
 * headless radio group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const RadioGroup: ForwardRefComponent<RadioGroupProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-radio's styled useRadioGroup.
  const { layout = 'vertical', ...rest } = props;

  // `layout` has to be back in the state before the context hook reads it: it is the only route
  // by which a child Radio learns that horizontal-stacked puts its label below the indicator.
  const state: RadioGroupState = { ...useRadioGroup(rest, ref), layout };

  const styled = useRadioGroupStyles(state);
  const contextValues = useRadioGroupContextValues(styled);

  return renderRadioGroup(styled, contextValues);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<RadioGroupProps>;

RadioGroup.displayName = 'RadioGroup';
