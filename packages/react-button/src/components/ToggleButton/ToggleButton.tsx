import * as React from 'react';
import { ToggleButtonProps } from './ToggleButton.types';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { useToggleButton } from './useToggleButton';
import { useFocusRects } from '@uifabric/utilities';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import * as toggleButtonClasses from './ToggleButton.scss';
import { useButtonClasses } from '../Button/Button';

export const useToggleButtonClasses = makeClasses(toggleButtonClasses);

/**
 * Define a styled Button, using the `createButton` factory.
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const { render, state } = useToggleButton(props, ref);

  // style stuff
  useButtonClasses(state);
  useToggleButtonClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--button');

  return render(state);
});

ToggleButton.displayName = 'ToggleButton';
