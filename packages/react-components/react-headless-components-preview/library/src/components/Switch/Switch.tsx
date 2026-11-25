'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SwitchProps } from './Switch.types';
import { useSwitch } from './useSwitch';
import { renderSwitch } from './renderSwitch';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A switch component for toggling values.
 */
export const Switch: ForwardRefComponent<SwitchProps> = /*#__PURE__*/ composeComponent(
  'Switch',
  useSwitch,
  renderSwitch,
);
