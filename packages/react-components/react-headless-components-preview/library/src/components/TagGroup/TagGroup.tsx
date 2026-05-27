'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { TagGroupProps } from './TagGroup.types';
import { useTagGroup } from './useTagGroup';
import { useTagGroupContextValues } from './useTagGroupContextValues';
import { renderTagGroup } from './renderTagGroup';

/**
 * A container for one or more `Tag` or `InteractionTag` children that
 * coordinates dismissal and selection.
 */
export const TagGroup: ForwardRefComponent<TagGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagGroup(props, ref);
  const contextValues = useTagGroupContextValues(state);
  return renderTagGroup(state, contextValues);
});

TagGroup.displayName = 'TagGroup';
