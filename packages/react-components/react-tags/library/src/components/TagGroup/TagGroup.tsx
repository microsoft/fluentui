import * as React from 'react';
import { useTagGroup_unstable } from './useTagGroup';
import { renderTagGroup_unstable } from './renderTagGroup';
import { useTagGroupStyles_unstable } from './useTagGroupStyles.styles';
import type { TagGroupProps } from './TagGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTagGroupContextValues_unstable } from './useTagGroupContextValues';

/**
 * TagGroup component - a container for multiple tags.
 * Provides context to size or dismiss children tags.
 */
export const TagGroup: ForwardRefComponent<TagGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagGroup_unstable(props, ref);

  useTagGroupStyles_unstable(state);

  useCustomStyleHook_unstable('useTagGroupStyles_unstable')(state);

  return renderTagGroup_unstable(state, useTagGroupContextValues_unstable(state));
});

TagGroup.displayName = 'TagGroup';
