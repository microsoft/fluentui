import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverTitle_unstable } from './useTeachingPopoverTitle';
import { renderTeachingPopoverTitle_unstable } from './renderTeachingPopoverTitle';
import { useTeachingPopoverTitleStyles_unstable } from './useTeachingPopoverTitleStyles.styles';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';

/**
 * TeachingPopoverTitle component - TODO: add more docs
 */
export const TeachingPopoverTitle: ForwardRefComponent<TeachingPopoverTitleProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverTitle_unstable(props, ref);

  useTeachingPopoverTitleStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useTeachingPopoverTitleStyles_unstable')(state);
  return renderTeachingPopoverTitle_unstable(state);
});

TeachingPopoverTitle.displayName = 'TeachingPopoverTitle';
