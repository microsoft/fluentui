import * as React from 'react';
import { useTagGroup_unstable } from './useTagGroup';
import { renderTagGroup_unstable } from './renderTagGroup';
import { useTagGroupStyles_unstable } from './useTagGroupStyles.styles';
import type { TagGroupProps } from './TagGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TagGroup component - TODO: add more docs
 */
export const TagGroup: ForwardRefComponent<TagGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagGroup_unstable(props, ref);

  useTagGroupStyles_unstable(state);
  return renderTagGroup_unstable(state);
});

TagGroup.displayName = 'TagGroup';
