'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import { useToolbarRadioGroup } from './useToolbarRadioGroup';
import { renderToolbarRadioGroup } from './renderToolbarRadioGroup';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A radio group component used inside a Toolbar to group mutually exclusive toggle controls.
 */
export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = /*#__PURE__*/ composeComponent(
  'ToolbarRadioGroup',
  useToolbarRadioGroup,
  renderToolbarRadioGroup,
);
