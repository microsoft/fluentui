import * as React from 'react';
import { useButton } from '../Button/useButton';
import { ButtonProps } from '../Button/Button.types';
import { useFocusRects } from '@uifabric/utilities';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import * as commandBarButtonClasses from './CommandBarButton.scss';
import { useButtonClasses } from '../Button/useButtonClasses';

// Create a hook to resolve classnames.
export const useCommandBarButtonClasses = makeClasses(commandBarButtonClasses);

/**
 * Define a styled Button, using the `useButton` hook.
 */
export const CommandBarButton = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { render, state } = useButton(props, ref);

  // Apply styling.
  useButtonClasses(state);
  useCommandBarButtonClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--button');

  // Render component.
  return render(state);
});

CommandBarButton.displayName = 'CommandBarButton';
