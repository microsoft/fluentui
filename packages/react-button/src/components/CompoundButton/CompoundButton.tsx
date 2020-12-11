import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { CompoundButtonProps } from './CompoundButton.types';
import { useCompoundButton } from './useCompoundButton';
import {
  useCompoundButtonStyles,
  useCompoundButtonContentStyles,
  useCompoundButtonContentContainerStyles,
  useCompoundButtonIconStyles,
  useCompoundButtonSecondaryContentStyles,
  CompoundButtonClassNames,
} from './useCompoundButtonClasses';
import { renderCompoundButton } from './renderCompoundButton';

/**
 * Define a styled CompoundButton, using the `useCompoundButton` hook.
 * {@docCategory Button}
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const state = useCompoundButton(props, ref);

  state.className = useCompoundButtonStyles(state, CompoundButtonClassNames.root, state.className);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = useCompoundButtonContentStyles(
    state,
    CompoundButtonClassNames.content,
    (state.content as any).className,
  );
  (state.contentContainer as any).className = useCompoundButtonContentContainerStyles(
    state,
    CompoundButtonClassNames.contentContainer,
    (state.contentContainer as any).className,
  );
  (state.icon as any).className = useCompoundButtonIconStyles(
    state,
    CompoundButtonClassNames.icon,
    (state.icon as any).className,
  );
  (state.secondaryContent as any).className = useCompoundButtonSecondaryContentStyles(
    state,
    CompoundButtonClassNames.secondaryContent,
    (state.secondaryContent as any).className,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useInlineTokens(state, '--button');

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
