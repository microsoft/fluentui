import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { renderer, Button } from '../Button/index';
import { MenuButton } from '../MenuButton/index';
import { renderSplitButton } from './renderSplitButton';
import { useSplitButton } from './useSplitButton';
import {
  useSplitButtonStyles,
  useSplitButtonButtonStyles,
  useSplitButtonDividerStyles,
  useSplitButtonMenuButtonStyles,
  SplitButtonClassNames,
} from './useSplitButtonClasses';
import { SplitButtonProps } from './SplitButton.types';

/**
 * Define a styled SplitButton, using the `useSplitButton` hook.
 * {@docCategory Button}
 */
export const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>((props, ref) => {
  const state = useSplitButton(props, ref, {
    button: { as: Button },
    menuButton: { as: MenuButton, iconOnly: true, icon: <ChevronDownIcon /> },
  });

  state.className = useSplitButtonStyles(
    state,
    {
      componentName: 'Button',
      tokens: state.tokens,
    },
    SplitButtonClassNames.root,
    state.className,
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.button as any).className = useSplitButtonButtonStyles(
    state,
    {
      tokens: state.tokens,
    },
    SplitButtonClassNames.button,
    (state.button as any).className,
  );
  (state.divider as any).className = useSplitButtonDividerStyles(
    state,
    {
      tokens: state.tokens,
    },
    SplitButtonClassNames.divider,
    (state.divider as any).className,
  );
  (state.menuButton as any).className = useSplitButtonMenuButtonStyles(
    state,
    {
      tokens: state.tokens,
    },
    SplitButtonClassNames.menuButton,
    (state.menuButton as any).className,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  /**
   * Type 'SplitButtonState' has no properties in common with type '{
   *  style?: CSSProperties | undefined; tokens?: string | { [key: string]: any; }
   *  | undefined; }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useInlineTokens(state as any, '--button');

  return renderSplitButton(state);
});

SplitButton.displayName = 'SplitButton';
