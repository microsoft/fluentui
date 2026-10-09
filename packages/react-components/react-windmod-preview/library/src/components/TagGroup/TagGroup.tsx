'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTagGroup,
  useTagGroup,
  useTagGroupContextValues,
} from '@fluentui/react-headless-components-preview/tag-group';

import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { TagGroupContextProvider } from './TagGroupContext';
import { useTagGroupStyles } from './useTagGroupStyles';

/**
 * A TagGroup is a container for Tags that share a look and a dismiss handler. Windmod TagGroup:
 * the headless tag group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TagGroup: ForwardRefComponent<TagGroupProps> = React.forwardRef(
  ({ appearance = 'filled', size = 'medium', ...rest }, ref) => {
    // Look props belong to windmod — the headless hook neither accepts nor resolves them. Defaults
    // mirror @fluentui/react-tags' styled useTagGroup. Everything else stays in `rest`: `disabled`
    // and `dismissible` are behaviour the base hook publishes to the Tags through Griffel's own
    // context, and pulling either out here would silently stop it reaching them.
    const base = useTagGroup(rest, ref);
    const state: TagGroupState = { ...base, appearance, size };

    const styled = useTagGroupStyles(state);
    // Two contexts, two audiences. The Griffel values are built from the styled state so a Griffel
    // Tag nested here receives the look too — the headless state omits both, and Griffel's Tag
    // renders with no size bucket at all when they are absent. The windmod context is the reader
    // half the headless surface does not export; windmod Tag consumes it.
    const contextValues = useTagGroupContextValues(styled);
    const look = React.useMemo(() => ({ appearance, size }), [appearance, size]);

    return <TagGroupContextProvider value={look}>{renderTagGroup(styled, contextValues)}</TagGroupContextProvider>;
  },
);

TagGroup.displayName = 'TagGroup';
