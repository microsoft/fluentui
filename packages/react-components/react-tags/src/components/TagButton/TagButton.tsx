import * as React from 'react';
import { useTagButton_unstable } from './useTagButton';
import { renderTagButton_unstable } from './renderTagButton';
import { useTagButtonStyles_unstable } from './useTagButtonStyles.styles';
import type { TagButtonProps } from './TagButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagContextValues_unstable } from '../../utils/useTagContextValues';

/**
 * TagButton component - TODO: add more docs
 */
export const TagButton: ForwardRefComponent<TagButtonProps> = React.forwardRef((props, ref) => {
  const state = useTagButton_unstable(props, ref);

  useTagButtonStyles_unstable(state);
  return renderTagButton_unstable(state, useTagContextValues_unstable(state));
});

TagButton.displayName = 'TagButton';
