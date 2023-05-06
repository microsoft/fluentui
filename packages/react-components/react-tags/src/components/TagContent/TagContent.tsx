import * as React from 'react';
import { useTagContent_unstable } from './useTagContent';
import { renderTagContent_unstable } from './renderTagContent';
import { useTagContentStyles_unstable } from './useTagContentStyles.styles';
import type { TagContentProps } from './TagContent.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagContentContextValues_unstable } from './useTagContentContextValues';

/**
 * TagContent component - TODO: add more docs
 */
export const TagContent: ForwardRefComponent<TagContentProps> = React.forwardRef((props, ref) => {
  const state = useTagContent_unstable(props, ref);
  const contextValues = useTagContentContextValues_unstable(state);
  useTagContentStyles_unstable(state);
  return renderTagContent_unstable(state, contextValues);
});

TagContent.displayName = 'TagContent';
