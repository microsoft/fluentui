import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import { CompoundButtonProps } from './CompoundButton.types';
import { useCompoundButton } from './useCompoundButton';
import {
  /*useCompoundButtonClasses*/
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

  state.className = css(CompoundButtonClassNames.root, state.className, useCompoundButtonStyles(state));
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = css(
    CompoundButtonClassNames.content,
    (state.content as any).className,
    useCompoundButtonContentStyles(state),
  );
  (state.contentContainer as any).className = css(
    CompoundButtonClassNames.contentContainer,
    (state.contentContainer as any).className,
    useCompoundButtonContentContainerStyles(state),
  );
  (state.icon as any).className = css(
    CompoundButtonClassNames.icon,
    (state.icon as any).className,
    useCompoundButtonIconStyles(state),
  );
  (state.secondaryContent as any).className = css(
    CompoundButtonClassNames.secondaryContent,
    (state.secondaryContent as any).className,
    useCompoundButtonSecondaryContentStyles(state),
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */
  // useCompoundButtonClasses(state);
  useInlineTokens(state, '--button');

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
