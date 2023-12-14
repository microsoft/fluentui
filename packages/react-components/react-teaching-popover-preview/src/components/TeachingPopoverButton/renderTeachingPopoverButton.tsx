/** @jsxRuntime classic */
/** @jsx createElement */
import type { TeachingPopoverButtonState } from './TeachingPopoverButton.types';
import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Renders a TeachingPopoverButton component is rendered as a default react-button with extended styles/props
 */
export const renderTeachingPopoverButton_unstable = (state: TeachingPopoverButtonState) => {
  return renderButton_unstable(state);
};
