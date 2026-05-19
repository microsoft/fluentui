'use client';

import * as React from 'react';
import { useInteractionTagPrimaryBase_unstable } from '@fluentui/react-tags';

import type {
  InteractionTagPrimaryContextValues,
  InteractionTagPrimaryProps,
  InteractionTagPrimaryState,
} from './InteractionTagPrimary.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for an InteractionTagPrimary component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInteractionTagPrimary`.
 */
export const useInteractionTagPrimary = (
  props: InteractionTagPrimaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagPrimaryState => {
  'use no memo';

  const state: InteractionTagPrimaryState = useInteractionTagPrimaryBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-selected'] = stringifyDataAttribute(state.selected);
  state.root['data-has-secondary-action'] = stringifyDataAttribute(state.hasSecondaryAction);

  return state;
};

const emptyAvatarContext = { size: undefined, shape: undefined } as const;

/**
 * Returns the avatar context values consumed by the canonical InteractionTagPrimary
 * renderer. The headless flavour passes no avatar size/shape - consumers style
 * the media slot themselves.
 */
export const useInteractionTagPrimaryContextValues = (
  _state: InteractionTagPrimaryState,
): InteractionTagPrimaryContextValues => {
  const avatar = React.useMemo(() => emptyAvatarContext, []);
  return { avatar };
};
