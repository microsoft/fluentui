import * as React from 'react';
import { useTag_unstable } from './useTag';
import { renderTag_unstable } from './renderTag';
import { useTagStyles_unstable } from './useTagStyles';
import type { TagProps } from './Tag.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Tag component - TODO: add more docs
 */
export const Tag: ForwardRefComponent<TagProps> = React.forwardRef((props, ref) => {
  const state = useTag_unstable(props, ref);

  useTagStyles_unstable(state);
  return renderTag_unstable(state);
});

Tag.displayName = 'Tag';
