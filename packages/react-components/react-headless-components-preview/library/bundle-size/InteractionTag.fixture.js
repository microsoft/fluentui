// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  renderInteractionTag,
  renderInteractionTagPrimary,
  renderInteractionTagSecondary,
  useInteractionTag,
  useInteractionTagContext,
  useInteractionTagContextValues,
  useInteractionTagPrimary,
  useInteractionTagPrimaryContextValues,
  useInteractionTagSecondary,
} from '@fluentui/react-headless-components-preview/interaction-tag';

console.log(
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  renderInteractionTag,
  renderInteractionTagPrimary,
  renderInteractionTagSecondary,
  useInteractionTag,
  useInteractionTagContext,
  useInteractionTagContextValues,
  useInteractionTagPrimary,
  useInteractionTagPrimaryContextValues,
  useInteractionTagSecondary,
);

export default {
  name: '@fluentui/react-headless-components-preview/interaction-tag',
};
