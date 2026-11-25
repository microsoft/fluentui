'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { LabelProps } from './Label.types';
import { useLabel } from './useLabel';
import { renderLabel } from './renderLabel';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A label component that associates text with form elements.
 */
export const Label: ForwardRefComponent<LabelProps> = /*#__PURE__*/ composeComponent('Label', useLabel, renderLabel);
