import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { makeStyles, ax } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

/**
 * Note, this file is written as a monolith for now to ease development.
 * It will be split to separate files later.
 */

// =================================================
// Types
// =================================================

type ButtonSelectors = {
  iconOnly?: boolean;
  primary?: boolean;
  size?: string;
  textOnly?: boolean;
  textWithIcon?: boolean;
};

type Slot = {
  className?: string;
  children?: React.ReactChildren | Array<React.ReactChildren>;
};

type ButtonState = {
  icon?: Slot;
  content?: Slot;
  className?: string;
};

type ButtonTokens = {
  // TODO: these are not in the global/alias theme currently
  height: string;
  paddingX: string;
  paddingY: string;
  minWidth: string;
  maxWidth: string;

  // TODO: what do we want to do with tokens for slots, just prefix them with slot name?
  iconWidth: string;
  iconHeight: string;
  iconSpacing: string;

  color: string;
  content2Color: string;

  background: string;
  backgroundHover: string;
  backgroundPressed: string;
  backgroundActive: string;

  borderColor: string;
  borderColorHover: string;
  borderColorActive: string;
  borderWidth: string;
  borderRadius: string;

  shadow: string;
  shadowPressed: string;
};

type ButtonVariants = 'base' | 'textOnly' | 'iconOnly' | 'primary' | 'small' | 'large';

type ButtonVariantTokens = {
  [variant in ButtonVariants]: Partial<ButtonTokens>;
};

// =================================================
// Theme Values
// =================================================

// TODO: These are named in design specs but not hoisted to global/alias yet.
//       We're tracking these here to determine how we can hoist them.
const buttonSpacing = {
  smaller: '4px',
  small: '6px',
  large: '12px',
};

// =================================================
// Theme Values
// =================================================

// We do not want a combinatorial explosion of component variables for variants (bg, bgPrimary, etc)
// We want a fixed interface of variables for a given component and to alter those between variants
export const makeButtonTokens = (theme: Theme): ButtonVariantTokens => ({
  base: {
    // TODO: these are not in the global/alias theme currently
    // When they are shown in the token UI, we need to make it clear there is no global/alias mapping support
    height: '32px',
    paddingX: buttonSpacing.large,
    paddingY: '0',
    minWidth: '96px',
    maxWidth: '280px',

    color: theme.alias.color.neutral.neutralForeground1,
    content2Color: theme.alias.color.neutral.neutralForeground2,
    background: theme.alias.color.neutral.neutralBackground1,
    backgroundPressed: theme.alias.color.neutral.neutralBackground1,

    borderRadius: theme.global.borderRadius.medium,
    borderWidth: theme.global.strokeWidth.thin,
    borderColor: theme.alias.color.neutral.neutralStroke1,

    backgroundHover: theme.alias.color.neutral.neutralBackground1Hover,
    borderColorHover: theme.alias.color.neutral.neutralStroke1Hover,

    backgroundActive: theme.alias.color.neutral.neutralBackground1Pressed,
    borderColorActive: theme.alias.color.neutral.neutralStroke1Pressed,

    iconSpacing: buttonSpacing.small,
    iconWidth: '20px',
    iconHeight: '20px',
  },
  textOnly: {},
  // TODO: Would be ideal to automate a check to ensure when a variant is accessed, all the tokens are accessed as well.
  //       If not, it means there is cruft in the variant tokens definition.
  //       All tokens in a variant should be mapped to some style property.
  iconOnly: {
    paddingX: buttonSpacing.small,
    paddingY: buttonSpacing.small,
    // TODO: we already have min/max width, should we really introduce a "width" as well?
    minWidth: '32px',
    maxWidth: '32px',
  },
  primary: {
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    // TODO: spec calls out "shadow 4 __darker__", are we missing tokens?

    background: theme.alias.color.brand.brandBackground,
    borderColor: 'transparent',
    backgroundHover: theme.alias.color.brand.brandBackgroundHover,
    backgroundPressed: theme.alias.color.brand.brandBackgroundPressed,

    // TODO: spec calls out "shadow 2 __darker__", are we missing tokens?
    shadow: theme.alias.shadow.shadow4,
    shadowPressed: theme.alias.shadow.shadow2,
  },
  // TODO: fix size before prerelease
  small: {},
  large: {},
});

// =================================================
// Hooks
// =================================================

const useRootClasses = makeStyles<ButtonSelectors>([
  [
    null,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        ':global(:root)': {
          // TODO: how to define and access component variables that do not have globals/aliases?
          //       consider IE11 friendly way
          '--button-height': '32px',
          '--button-paddingX': '12px',
          '--button-minWidth': '96px',
          '--button-maxWidth': '280px',

          '--button-iconOnly-padding': '6px',
        },

        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: buttonTokens.base.iconSpacing,
        // // TODO: 1) ask designers what our vertical align strategy is
        // //       2) enforce with conformance for inline elements
        verticalAlign: 'text-bottom',
        margin: 0,

        padding: `${buttonTokens.base.paddingY} ${buttonTokens.base.paddingX}`,
        height: buttonTokens.base.height,

        minWidth: buttonTokens.base.minWidth,
        maxWidth: buttonTokens.base.maxWidth,

        color: buttonTokens.base.color,
        borderStyle: 'solid',
        borderRadius: buttonTokens.base.borderRadius,
        borderWidth: buttonTokens.base.borderWidth,
        borderColor: buttonTokens.base.borderColor,
        background: buttonTokens.base.background,

        outline: 'none',
        ':hover': {
          background: buttonTokens.base.backgroundHover,
          borderColor: buttonTokens.base.borderColorHover,
          cursor: 'pointer',
        },
        ':active': {
          background: buttonTokens.base.backgroundActive,
          borderColor: buttonTokens.base.borderColorActive,
          outline: 'none',
        },
        // TODO: this is for toggle button only. Use here in regular button?
        // '.active': theme.alias.color.neutral.neutralStroke1Pressed,
      };
    },
  ],
  [
    ({ primary }) => primary,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        background: buttonTokens.primary.background,
        color: buttonTokens.primary.color,
        border: buttonTokens.primary.borderColor,
        // TODO: spec calls out "shadow 4 __darker__", are we missing tokens?
        boxShadow: buttonTokens.primary.shadow,

        ':hover': {
          background: buttonTokens.primary.backgroundHover,
        },

        ':active': {
          background: buttonTokens.primary.backgroundPressed,
          // TODO: spec calls out "shadow 2 __darker__", are we missing tokens?
          boxShadow: buttonTokens.primary.shadow,
        },

        // TODO: focus
      };
    },
  ],
  [
    ({ textOnly }) => textOnly,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        minWidth: buttonTokens.textOnly.minWidth,
        maxWidth: buttonTokens.textOnly.maxWidth,
      };
    },
  ],
  [
    ({ iconOnly }) => iconOnly,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        padding: buttonTokens.iconOnly.paddingX,
        minWidth: buttonTokens.iconOnly.minWidth,
        maxWidth: buttonTokens.iconOnly.maxWidth,
      };
    },
  ],
  [
    ({ size }) => size === 'small',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        padding: `${buttonTokens.small.paddingX} ${buttonTokens.small.paddingY}`,
        minWidth: buttonTokens.small.minWidth,
        maxWidth: buttonTokens.small.maxWidth,
      };
    },
  ],
  [
    ({ size }) => size === 'large',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        padding: `${buttonTokens.small.paddingX} ${buttonTokens.small.paddingY}`,
        minWidth: buttonTokens.small.minWidth,
        maxWidth: buttonTokens.small.maxWidth,
      };
    },
  ],
  // TODO: add disabled before ship prerelease
]);

const useContentClasses = makeStyles<ButtonSelectors>([
  [
    null,
    theme => ({
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      // TODO: This is "Body, Strong (?)" token in the design spec (14px size, 20px line, semibold weight)
      //       There are some type aliases in the figma not in our theme as well, not sure if this maps to alias or not
      fontWeight: theme.global.type.fontWeights.semibold,
      fontSize: theme.global.type.fontSizes.base[300],
      lineHeight: theme.global.type.lineHeights.base[300],
    }),
  ],
]);

const useIconClasses = makeStyles<ButtonSelectors>([
  [
    null,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: buttonTokens.base.iconHeight,
        width: buttonTokens.base.iconWidth,
      };
    },
  ],
]);

const useButtonClasses = (state: ButtonState, selectors: ButtonSelectors) => {
  state.className = ax(state.className, useRootClasses(selectors));

  state.content = state.content || { className: '' };
  state.icon = state.icon || { className: '' };

  state.content.className = ax(state.content.className, useContentClasses(selectors));
  state.icon.className = ax(state.icon.className, useIconClasses(selectors));
};

// =================================================
// Component
// =================================================

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  // TODO: fix children check for "empty" slots once useButton() updated
  const hasContent = !!state.content.children;
  const hasIcon = !!state.icon.children;

  const iconOnly = hasIcon && !hasContent;
  const styleSelectors = {
    primary: props.primary,
    iconOnly: iconOnly,
    textOnly: hasContent && !hasIcon,
    textWithIcon: hasIcon && hasContent,
    size: props.size,
  };

  useButtonClasses(state, styleSelectors);

  return renderButton(state);
});

Button.displayName = 'Button';
