'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagContextValues } from '@fluentui/react-headless-components-preview/tag';
import type { TagProps } from './Tag.types';
import { renderTag } from './renderTag';
import { useTag } from './useTag';
import { useTagStyles } from './useTagStyles.styles';

/**
 * A visual representation of an attribute that can be optionally dismissed.
 */
export const Tag: ForwardRefComponent<TagProps> = React.forwardRef((props, ref) => {
  const state = useTag(props, ref);
  const contextValues = useTagContextValues(state);
  useTagStyles(state);
  return renderTag(state, contextValues);
});

Tag.displayName = 'Tag';
