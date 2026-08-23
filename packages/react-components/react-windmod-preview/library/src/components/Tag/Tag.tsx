'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTag, useTag, useTagContextValues } from '@fluentui/react-headless-components-preview/tag';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import type { TagProps, TagState } from './Tag.types';
import { useTagStyles } from './useTagStyles';

/**
 * A Tag represents a keyword or phrase attached to a larger item. Windmod Tag: the headless tag
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Tag: ForwardRefComponent<TagProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-tags' styled useTag.
  const { appearance = 'filled', shape = 'rounded', size = 'medium', ...rest } = props;

  const base = useTag(rest, ref);

  // The headless dismissIcon slot ships no glyph of its own, and the renderer draws it on every
  // dismissible Tag, so an unrestored slot is a correctly-padded empty hole. The slot only exists
  // when the hook decided to build it, so the restoration has to run on the resolved state:
  // materialising it earlier would give a non-dismissible Tag a dismissIcon and silently drop the
  // root's trailing padding. Consumer children always win; `dismissIcon={null}` still removes the slot.
  const dismissIcon: TagState['dismissIcon'] = base.dismissIcon && {
    ...base.dismissIcon,
    children: base.dismissIcon.children ?? <DismissRegular />,
  };

  const state: TagState = { ...base, dismissIcon, appearance, shape, size };

  return renderTag(useTagStyles(state), useTagContextValues(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<TagProps>;

Tag.displayName = 'Tag';
