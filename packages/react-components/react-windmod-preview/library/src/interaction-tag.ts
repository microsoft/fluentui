export { InteractionTag, interactionTagClassNames, useInteractionTagStyles } from './components/InteractionTag';
export type {
  InteractionTagAppearance,
  InteractionTagContextValues,
  InteractionTagProps,
  InteractionTagShape,
  InteractionTagSize,
  InteractionTagSlots,
  InteractionTagState,
} from './components/InteractionTag';

export {
  InteractionTagPrimary,
  interactionTagPrimaryClassNames,
  useInteractionTagPrimaryStyles,
} from './components/InteractionTagPrimary';
export type {
  InteractionTagPrimaryContextValues,
  InteractionTagPrimaryProps,
  InteractionTagPrimarySlots,
  InteractionTagPrimaryState,
} from './components/InteractionTagPrimary';

export {
  InteractionTagSecondary,
  interactionTagSecondaryClassNames,
  useInteractionTagSecondaryStyles,
} from './components/InteractionTagSecondary';
export type {
  InteractionTagSecondaryProps,
  InteractionTagSecondarySlots,
  InteractionTagSecondaryState,
} from './components/InteractionTagSecondary';

/** Headless building blocks, re-exported for consumers composing their own InteractionTag. */
export {
  renderInteractionTag,
  renderInteractionTagPrimary,
  renderInteractionTagSecondary,
  useInteractionTag,
  useInteractionTagContextValues,
  useInteractionTagPrimary,
  useInteractionTagPrimaryContextValues,
  useInteractionTagSecondary,
} from '@fluentui/react-headless-components-preview/interaction-tag';
