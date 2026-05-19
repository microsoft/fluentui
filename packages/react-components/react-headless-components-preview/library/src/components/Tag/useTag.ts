'use client';

import * as React from 'react';
import { useTagBase_unstable } from '@fluentui/react-tags';

import type { TagContextValues, TagProps, TagState } from './Tag.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Tag component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTag`.
 */
export const useTag = (props: TagProps, ref: React.Ref<HTMLSpanElement | HTMLButtonElement>): TagState => {
  'use no memo';

  const state: TagState = useTagBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-dismissible'] = stringifyDataAttribute(state.dismissible);
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};

const emptyAvatarContext = { size: undefined, shape: undefined } as const;

/**
 * Returns the avatar context values passed to the canonical Tag renderer.
 * The headless flavour does not impose a size/shape on a nested Avatar - consumers
 * style the avatar themselves via the `media` slot.
 */
export const useTagContextValues = (_state: TagState): TagContextValues => {
  const avatar = React.useMemo(() => emptyAvatarContext, []);
  return { avatar };
};
