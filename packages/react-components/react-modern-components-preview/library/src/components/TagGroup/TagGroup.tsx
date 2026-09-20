'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagGroupContextValues } from '@fluentui/react-headless-components-preview/tag-group';
import type { TagGroupProps } from './TagGroup.types';
import { renderTagGroup } from './renderTagGroup';
import { useTagGroup } from './useTagGroup';
import { useTagGroupStyles } from './useTagGroupStyles.styles';

/**
 * A container for tags that coordinates dismissal and selection.
 */
export const TagGroup: ForwardRefComponent<TagGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagGroup(props, ref);
  const contextValues = useTagGroupContextValues(state);
  useTagGroupStyles(state);
  return renderTagGroup(state, contextValues);
});

TagGroup.displayName = 'TagGroup';
