'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { TagProps } from './Tag.types';
import { useTag } from './useTag';
import { useTagContextValues } from './useTagContextValues';
import { renderTag } from './renderTag';

/**
 * A visual representation of an attribute that can be optionally dismissed.
 */
export const Tag: ForwardRefComponent<TagProps> = React.forwardRef((props, ref) => {
  const state = useTag(props, ref);
  const contextValues = useTagContextValues(state);
  return renderTag(state, contextValues);
});

Tag.displayName = 'Tag';
