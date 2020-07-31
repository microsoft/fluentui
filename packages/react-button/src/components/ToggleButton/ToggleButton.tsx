import * as React from 'react';
import { ToggleButtonProps } from './ToggleButton.types';
import { makeClasses } from '@fluentui/react-compose/lib/next';
import { createToggleButton } from './createToggleButton';
import { useFocusRects } from '@uifabric/utilities';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import * as buttonClasses from '../Button/Button.scss';
import * as toggleButtonClasses from './ToggleButton.scss';

const useButtonClasses = makeClasses(buttonClasses);
const useToggleButtonClasses = makeClasses(toggleButtonClasses);

/**
 * Define a styled Button, using the `createButton` factory.
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const { render, state } = createToggleButton(props, ref);

  // style stuff
  useButtonClasses(state);
  useToggleButtonClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state);

  return render(state);
});

ToggleButton.displayName = 'ToggleButton';
