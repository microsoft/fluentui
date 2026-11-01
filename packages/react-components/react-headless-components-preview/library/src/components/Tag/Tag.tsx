'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { TagProps } from './Tag.types';
import { useTag } from './useTag';
import { useTagContextValues } from './useTagContextValues';
import { renderTag } from './renderTag';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A visual representation of an attribute that can be optionally dismissed.
 */
export const Tag: ForwardRefComponent<TagProps> = /*#__PURE__*/ composeComponent(
  'Tag',
  useTag,
  renderTag,
  useTagContextValues,
);
