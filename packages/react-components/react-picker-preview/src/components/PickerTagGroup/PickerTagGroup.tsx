import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { usePickerTagGroup_unstable } from './usePickerTagGroup';
import type { PickerTagGroupProps } from './PickerTagGroup.types';
import { useTagGroupContextValues_unstable } from '@fluentui/react-tags';
import { renderPickerTagGroup_unstable } from './renderPickerTagGroup';
import { usePickerTagGroupStyles_unstable } from './usePickerTagGroupStyles.styles';

/**
 * PickerTagGroup component - TODO: add more docs
 */
export const PickerTagGroup: ForwardRefComponent<PickerTagGroupProps> = React.forwardRef((props, ref) => {
  const state = usePickerTagGroup_unstable(props, ref);

  usePickerTagGroupStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('usePickerTagGroupStyles_unstable')(state);
  return renderPickerTagGroup_unstable(state, useTagGroupContextValues_unstable(state));
});

PickerTagGroup.displayName = 'PickerTagGroup';
