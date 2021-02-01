import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { SplitButtonProps } from './SplitButton.types';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonClasses } from './useSplitButtonClasses';
import { Button } from '../Button/index';
import { MenuButton } from '../MenuButton/index';
import { renderSplitButton } from './renderSplitButton';

/**
 * Define a styled SplitButton, using the `useSplitButton` hook.
 * {@docCategory Button}
 */
export const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>((props, ref) => {
  const state = useSplitButton(props, ref, {
    button: { as: Button },
    menuButton: { as: MenuButton, iconOnly: true, icon: <ChevronDownIcon /> },
  });

  useSplitButtonClasses(state);

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
