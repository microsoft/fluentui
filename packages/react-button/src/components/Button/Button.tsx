import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
// import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
// import { useButtonClasses } from './useButtonClasses';
import { renderButton } from './renderButton';
import { makeStyles, ax } from '@fluentui/react-make-styles';
import { teamsLightTheme } from '@fluentui/react-theme';

// import { Theme } from '@fluentui/react-theme';

type ButtonSelectors = {
  primary?: boolean;
  textOnly?: boolean;
  iconOnly?: boolean;
};

const useRootClasses = makeStyles<ButtonSelectors>([
  [
    null,
    // TODO: why is theme not typed here?
    {
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

      borderRadius: teamsLightTheme.global.borderRadius.medium,
      borderWidth: teamsLightTheme.global.strokeWidth.thin,
      borderColor: teamsLightTheme.alias.color.neutral.neutralStroke1,
      background: teamsLightTheme.alias.color.neutral.neutralBackground1,
      ':hover': {
        background: teamsLightTheme.alias.color.neutral.neutralBackground1Hover,
        borderColor: teamsLightTheme.alias.color.neutral.neutralStroke1Hover,
        cursor: 'pointer',
      },
      ':active': {
        borderColor: teamsLightTheme.alias.color.neutral.neutralStroke1Pressed,
      },
      // TODO: what to do with "selected"? Is this toggle button or some kind of active state?
      // '.active': teamsLightTheme.alias.color.neutral.neutralStroke1Pressed,
    },
  ],
  [
    ({ primary }: ButtonSelectors) => primary,
    (/*theme: Theme*/) => {
      // eslint-disable-next-line no-console
      console.log(teamsLightTheme);
      return {
        background: teamsLightTheme.alias.color.brand.brandBackground,
        color: teamsLightTheme.alias.color.neutral.neutralForegroundInvertedAccessible,
        ':hover': teamsLightTheme.alias.color.brand.brandBackgroundHover,
        ':active': teamsLightTheme.alias.color.brand.brandBackgroundPressed,
        // TODO: what to do with "selected"? Is this toggle button or some kind of active state?
        // '.active': teamsLightTheme.alias.color.brand.brandBackgroundSelected,

        // TODO: spec calls out "shadow 4 __darker__", are we missing tokens?
        boxShadow: teamsLightTheme.alias.shadow.shadow4,
      };
    },
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
      width: `var(--button-height)`,
      textAlign: 'center',
    },
  ],
]);

const useContentClasses = makeStyles([
  [
    null,
    (/*theme: Theme*/) => ({
      textOverflow: 'ellipsis',
      display: 'inline-block',
      // border: '1px solid gray',
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

  // TODO: fix children check for "empty" slots once useButton() updated
  const hasContent = !!state?.content?.children;
  const hasIcon = !!state?.icon?.children;

  const styleSelectors = {
    primary: props.primary,
    iconOnly: hasIcon && !hasContent,
    textOnly: hasContent && !hasIcon,
  };

  console.log(styleSelectors, state);

  // TODO: don't require "selectors"
  // TODO: rename "selectors" to "matchers", its CSS in JS and not CSS

  state.className = ax(state.className, useRootClasses(styleSelectors));
  state.content.className = ax(state.content.className, useContentClasses(styleSelectors));

  // useButtonClasses(state);
  // useInlineTokens(state, '--button');

  return renderButton(state);
});

Button.displayName = 'Button';
