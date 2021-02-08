import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps, ButtonState } from './Button.types';
// import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
// import { useButtonClasses } from './useButtonClasses';
import { renderButton } from './renderButton';
import { makeStyles, ax } from '@fluentui/react-make-styles';

const useClasses = makeStyles([[null, { background: 'red' }]]);

const useButtonClasses = (state: ButtonState, matcher: Partial<ButtonProps>) => {
  // TODO: don't require "selectors"
  // TODO: rename "selectors" to "matchers", its CSS in JS and not CSS
  const classes = useClasses(matcher);
  state.className = ax(state.className, classes);
};

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);
  useButtonClasses(state, {});

  // useButtonClasses(state);
  // useInlineTokens(state, '--button');

  return renderButton(state);
});

Button.displayName = 'Button';
