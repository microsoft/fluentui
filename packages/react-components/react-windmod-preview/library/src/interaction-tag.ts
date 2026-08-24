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

/** Headless building blocks, re-exported for consumers composing their own InteractionTag. */
export {
  renderInteractionTag,
  useInteractionTag,
  useInteractionTagContextValues,
} from '@fluentui/react-headless-components-preview/interaction-tag';
