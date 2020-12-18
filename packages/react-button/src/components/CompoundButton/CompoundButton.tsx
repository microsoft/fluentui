import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';
import {
  useCompoundButtonStyles,
  useCompoundButtonContentStyles,
  useCompoundButtonContentContainerStyles,
  useCompoundButtonIconStyles,
  useCompoundButtonSecondaryContentStyles,
  CompoundButtonClassNames,
} from './useCompoundButtonClasses';
import { CompoundButtonProps } from './CompoundButton.types';

/**
 * Define a styled CompoundButton, using the `useCompoundButton` hook.
 * {@docCategory Button}
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const state = useCompoundButton(props, ref);

  state.className = useCompoundButtonStyles(
    state,
    {
      componentName: 'Button',
      tokens: state.tokens,
    },
    CompoundButtonClassNames.root,
    state.className,
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = useCompoundButtonContentStyles(
    state,
    {
      tokens: state.tokens,
    },
    CompoundButtonClassNames.content,
    (state.content as any).className,
  );
  (state.contentContainer as any).className = useCompoundButtonContentContainerStyles(
    state,
    {
      tokens: state.tokens,
    },
    CompoundButtonClassNames.contentContainer,
    (state.contentContainer as any).className,
  );
  (state.icon as any).className = useCompoundButtonIconStyles(
    state,
    {
      tokens: state.tokens,
    },
    CompoundButtonClassNames.icon,
    (state.icon as any).className,
  );
  (state.secondaryContent as any).className = useCompoundButtonSecondaryContentStyles(
    state,
    {
      tokens: state.tokens,
    },
    CompoundButtonClassNames.secondaryContent,
    (state.secondaryContent as any).className,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useInlineTokens(state, '--button');

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
