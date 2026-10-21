'use client';

import { useRadio } from './useRadio';
import { renderRadio } from './renderRadio';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A Radio component for use inside a RadioGroup.
 */
export const Radio = /*#__PURE__*/ composeComponent('Radio', useRadio, renderRadio);
