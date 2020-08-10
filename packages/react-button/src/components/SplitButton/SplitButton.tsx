import * as React from 'react';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { ChevronDownIcon } from '@fluentui/react-icons';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { ContextualMenu, useFocusRects } from 'office-ui-fabric-react';
import { useButtonClasses } from '../Button/Button';
import { useMenuButtonClasses } from '../MenuButton/MenuButton';
import { SplitButtonProps } from './SplitButton.types';
import * as classes from './SplitButton.scss';
import { useSplitButton } from './useSplitButton';

export const useSplitButtonClasses = makeClasses(classes);

const button = (props: React.HTMLAttributes<HTMLButtonElement>) => <button {...props}>{props.children}</button>;
const divider = (props: React.HTMLAttributes<HTMLButtonElement>) => <span {...props}>{props.children}</span>;

export const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>((props, ref) => {
  const { state, render } = useSplitButton(props, ref, {
    menuIcon: { as: ChevronDownIcon },
    menu: { as: ContextualMenu },

    button: { as: button },
    divider: { as: divider },
    menuButton: { as: button },
  });

  // Styling hooks.
  useButtonClasses(state);
  useMenuButtonClasses(state);
  useSplitButtonClasses(state);
  useFocusRects(state.ref);

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
