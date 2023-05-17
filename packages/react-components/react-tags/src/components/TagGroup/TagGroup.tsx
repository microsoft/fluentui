import * as React from 'react';
import { useTagGroup_unstable } from './useTagGroup';
import { renderTagGroup_unstable } from './renderTagGroup';
import { useTagGroupStyles_unstable } from './useTagGroupStyles.styles';
import type { TagGroupProps } from './TagGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagGroupContextValue_unstable } from './useTagGroupContextValue';

/**
 * TagGroup component - TODO: add more docs
 */
export const TagGroup: ForwardRefComponent<TagGroupProps> & (<TItem>(props: TagGroupProps<TItem>) => JSX.Element) =
  React.forwardRef((props, ref) => {
    const state = useTagGroup_unstable(props, ref);

    useTagGroupStyles_unstable(state);

    return renderTagGroup_unstable(state, useTagGroupContextValue_unstable(state));
  }) as ForwardRefComponent<TagGroupProps> & (<TItem>(props: TagGroupProps<TItem>) => JSX.Element);

TagGroup.displayName = 'TagGroup';
