'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RadioProps } from './Radio.types';
import { useRadio } from './useRadio';
import { renderRadio } from './renderRadio';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A Radio component for use inside a RadioGroup.
 */
export const Radio: ForwardRefComponent<RadioProps> = /*#__PURE__*/ composeComponent('Radio', useRadio, renderRadio);
