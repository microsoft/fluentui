/** @jsxRuntime classic */
/** @jsx createElement */
import { assertSlots } from '@fluentui/react-utilities';
import { TeachingPopoverButtonSlots, type TeachingPopoverButtonState } from './TeachingPopoverButton.types';
import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Renders a TeachingPopoverButton component is rendered as a default react-button with extended styles/props
 */
export const renderTeachingPopoverButton_unstable = (state: TeachingPopoverButtonState) => {
  assertSlots<TeachingPopoverButtonSlots>(state);

  return renderButton_unstable(state);
};
