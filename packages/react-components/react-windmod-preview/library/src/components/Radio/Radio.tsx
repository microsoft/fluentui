'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderRadio, useRadio } from '@fluentui/react-headless-components-preview/radio-group';

import type { RadioProps } from './Radio.types';
import { useRadioStyles } from './useRadioStyles';

/**
 * A Radio is one option of a RadioGroup. Windmod Radio: the headless radio decorated with the
 * Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef((props, ref) => {
  const state = useRadio(props, ref);
  const styled = useRadioStyles(state);

  return renderRadio(styled);
});

Radio.displayName = 'Radio';
