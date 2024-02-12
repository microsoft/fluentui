import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { usePickerList_unstable } from './usePickerList';
import { renderPickerList_unstable } from './renderPickerList';
import { usePickerListStyles_unstable } from './usePickerListStyles.styles';
import type { PickerListProps } from './PickerList.types';

/**
 * PickerList component - TODO: add more docs
 */
export const PickerList: ForwardRefComponent<PickerListProps> = React.forwardRef((props, ref) => {
  const state = usePickerList_unstable(props, ref);

  usePickerListStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('usePickerListStyles_unstable')(state);
  return renderPickerList_unstable(state);
});

PickerList.displayName = 'PickerList';
