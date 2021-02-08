import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps, ButtonState } from './Button.types';
// import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
// import { useButtonClasses } from './useButtonClasses';
import { renderButton } from './renderButton';
import { makeStyles, ax } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

type ButtonSelectors = {
  textOnly?: boolean;
  iconOnly?: boolean;
};

const useRootClasses = makeStyles<ButtonSelectors>([
  [
    null,
    // TODO: why is theme not typed here?
    (theme: Theme) => ({
      // TODO: how to define and access component variables that do not have globals/aliases?
      //       consider IE11 friendly way
      '--button-height': '32px',
      '--button-paddingX': '12px',
      '--button-minWidth': '96px',
      '--button-maxWidth': '280px',

      '--button-iconOnly-paddingX': '6px',

      display: 'flex',
      alignItems: 'center',

      padding: '0 var(--button-paddingX)',
      height: 'var(--button-height)',
    }),
  ],
  [
    // TODO: why do I have to type selectors when the generic is passed to makeStyles<ButtonSelectors>?
    ({ textOnly }: ButtonSelectors) => textOnly,
    {
      // TODO:  CSS in JS styles are not typed
      minWidth: `var(--button-minWidth)`,
      maxWidth: `var(--button-maxWidth)`,
    },
  ],
  [
    // TODO: why do I have to type selectors when the generic is passed to makeStyles<ButtonSelectors>?
    ({ iconOnly }: ButtonSelectors) => iconOnly,
    {
      // TODO: Update button variables here or make dedicated iconOnly variables?
      padding: `var(--button-iconOnly-paddingX)`,
    },
  ],
]);

const useContentClasses = makeStyles([
  [
    null,
    (theme: Theme) => ({
      textOverflow: 'ellipsis',
      display: 'inline-block',
      border: '1px solid gray',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }),
  ],
]);

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);
  const styleSelectors = {
    // TODO: iconOnly selector not working...
    iconOnly: !!state.icon && !(state.content || state.children),
    textOnly: !!(state.content || state.children) && !state.icon,
  };

  // TODO: don't require "selectors"
  // TODO: rename "selectors" to "matchers", its CSS in JS and not CSS

  state.className = ax(state.className, useRootClasses(styleSelectors));
  state.content.className = ax(state.content.className, useContentClasses(styleSelectors));

  // useButtonClasses(state);
  // useInlineTokens(state, '--button');

  return renderButton(state);
});

Button.displayName = 'Button';
