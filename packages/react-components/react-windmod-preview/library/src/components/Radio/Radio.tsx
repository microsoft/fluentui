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
  return renderRadio(useRadioStyles(useRadio(props, ref)));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<RadioProps>;

Radio.displayName = 'Radio';
