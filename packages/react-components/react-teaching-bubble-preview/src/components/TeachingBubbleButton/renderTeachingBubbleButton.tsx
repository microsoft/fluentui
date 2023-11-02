/** @jsxRuntime classic */
/** @jsx createElement */
import type { TeachingBubbleButtonState } from './TeachingBubbleButton.types';
import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Renders a TeachingBubbleButton component is rendered as a default react-button with extended styles/props
 */
export const renderTeachingBubbleButton_unstable = (state: TeachingBubbleButtonState) => {
  return renderButton_unstable(state);
};
