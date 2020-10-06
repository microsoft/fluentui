import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { SplitButtonProps } from './SplitButton.types';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonClasses } from './useSplitButtonClasses';
import { Button } from '../Button/index';
import { MenuButton } from '../MenuButton/index';

export const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>((props, ref) => {
  const { state, render } = useSplitButton(props, ref, {
    button: { as: Button },
    menuButton: { as: MenuButton, iconOnly: true, icon: <ChevronDownIcon /> },
  });

  useSplitButtonClasses(state);

  // TODO remove any
  /**
   * Type 'SplitButtonState' has no properties in common with type '{
   *  style?: CSSProperties | undefined; tokens?: string | { [key: string]: any; }
   *  | undefined; }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useInlineTokens(state as any, '--button');

  return render(state);
});

SplitButton.displayName = 'SplitButton';
