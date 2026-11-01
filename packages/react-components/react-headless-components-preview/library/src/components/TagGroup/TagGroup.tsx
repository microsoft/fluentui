'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { TagGroupProps } from './TagGroup.types';
import { useTagGroup } from './useTagGroup';
import { useTagGroupContextValues } from './useTagGroupContextValues';
import { renderTagGroup } from './renderTagGroup';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A container for one or more `Tag` or `InteractionTag` children that
 * coordinates dismissal and selection.
 */
export const TagGroup: ForwardRefComponent<TagGroupProps> = /*#__PURE__*/ composeComponent(
  'TagGroup',
  useTagGroup,
  renderTagGroup,
  useTagGroupContextValues,
);
