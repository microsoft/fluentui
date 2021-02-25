import { ButtonState, ButtonStyleSelectors, ButtonVariantTokens } from './Button.types';
import { ax, makeStyles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

// TODO: These are named in design specs but not hoisted to global/alias yet.
//       We're tracking these here to determine how we can hoist them.
const buttonSpacing = {
  smallest: '2px',
  smaller: '4px',
  small: '6px',
  medium: '8px',
  large: '12px',
  larger: '16px',
};

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

    fontWeight: theme.global.type.fontWeights.semibold,
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],

    iconSpacing: buttonSpacing.small,
    iconWidth: '20px',
    iconHeight: '20px',
  },
  disabled: {
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    content2Color: theme.alias.color.neutral.neutralForegroundDisabled,
  },
  small: {
    paddingX: buttonSpacing.medium,
    borderRadius: theme.global.borderRadius.small,
    // TODO: design spec says minWidth "can be toggled off", consider prop like compact?
    minWidth: '64px',
    height: '24px',
    fontSize: theme.global.type.fontSizes.base[200],
    lineHeight: theme.global.type.fontSizes.base[200],
    fontWeight: theme.global.type.fontWeights.regular,
  },
  large: {
    paddingX: buttonSpacing.larger,
    height: '40px',
    borderRadius: theme.global.borderRadius.medium,
    fontSize: theme.global.type.fontSizes.base[400],
    // TODO: 24px is not on the global ramp of line heights
    //       22px = theme.global.type.lineHeights.base[400]
    //       28px = theme.global.type.lineHeights.base[500]
    lineHeight: '24px',
    iconWidth: '24px',
    iconHeight: '24px',
    iconSpacing: buttonSpacing.small,
  },
  // TODO: Would be ideal to automate a check to ensure when a variant is accessed, all the tokens are accessed as well.
  //       If not, it means there is cruft in the variant tokens definition.
  //       All tokens in a variant should be mapped to some style property.
  iconOnly: {
    paddingX: buttonSpacing.small,
    paddingY: buttonSpacing.small,
    minWidth: '32px',
    maxWidth: '32px',
  },
  // TODO: combinatorial "variants" is wrong, we already have iconOnly and small.
  //       we essentially need to update component token mappings based on variant matchers.
  //       fow the sake of progress for now, we're extending variants to have combinations.
  iconOnlySmall: {
    paddingX: buttonSpacing.smallest,
    paddingY: buttonSpacing.smallest,
    borderRadius: theme.global.borderRadius.small,
    minWidth: '24px',
    maxWidth: '24px',
  },
  iconOnlyLarge: {
    paddingX: buttonSpacing.small,
    paddingY: buttonSpacing.small,
    borderRadius: theme.global.borderRadius.medium,
    minWidth: '40px',
    maxWidth: '40px',
  },
  primary: {
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

    background: theme.alias.color.brand.brandBackground,
    borderColor: 'transparent',
    borderColorHover: 'transparent',
    borderColorActive: 'transparent',

    backgroundHover: theme.alias.color.brand.brandBackgroundHover,
    backgroundPressed: theme.alias.color.brand.brandBackgroundPressed,

    // TODO: spec calls out "shadow 4 __brand__", are we missing tokens?
    shadow: theme.alias.shadow.shadow4,

    // TODO: spec calls out "shadow 2 __darker__", are we missing tokens?
    shadowPressed: theme.alias.shadow.shadow2,
  },
  primaryDisabled: {
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    // borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    content2Color: theme.alias.color.neutral.neutralForegroundDisabled,
    shadow: 'none',
    shadowPressed: 'none',
  },
});

const useRootClasses = makeStyles<ButtonStyleSelectors>([
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
    ({ size }) => size === 'small',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        padding: `${buttonTokens.small.paddingX} ${buttonTokens.small.paddingY}`,
        minWidth: buttonTokens.small.minWidth,
        height: buttonTokens.small.height,
        borderRadius: buttonTokens.small.borderRadius,
      };
    },
  ],
  [
    ({ size }) => size === 'large',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        gap: buttonTokens.large.iconSpacing,
        padding: `${buttonTokens.large.paddingX} ${buttonTokens.large.paddingY}`,
        height: buttonTokens.large.height,
        borderRadius: buttonTokens.large.borderRadius,
      };
    },
  ],
  [
    ({ disabled }) => disabled,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        background: buttonTokens.disabled.background,
        borderColor: buttonTokens.disabled.borderColor,
        color: buttonTokens.disabled.color,
        ':hover': {
          background: buttonTokens.disabled.background,
          borderColor: buttonTokens.disabled.borderColor,
          cursor: 'default',
        },
        ':active': {
          background: buttonTokens.disabled.background,
          borderColor: buttonTokens.disabled.borderColor,
        },
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
        borderColor: buttonTokens.primary.borderColor,
        // TODO: spec calls out "shadow 4 __darker__", are we missing tokens?
        boxShadow: buttonTokens.primary.shadow,

        ':hover': {
          background: buttonTokens.primary.backgroundHover,
          borderColor: buttonTokens.primary.borderColorHover,
        },

        ':active': {
          background: buttonTokens.primary.backgroundPressed,
          // TODO: spec calls out "shadow 2 __darker__", are we missing tokens?
          boxShadow: buttonTokens.primary.shadow,
          borderColor: buttonTokens.primary.borderColorActive,
        },

        // TODO: focus
      };
    },
  ],
  [
    ({ primary, disabled }) => primary && disabled,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        background: buttonTokens.primaryDisabled.background,
        color: buttonTokens.primaryDisabled.color,
        boxShadow: buttonTokens.primaryDisabled.shadow,
        ':hover': {
          background: buttonTokens.primaryDisabled.background,
          cursor: 'default',
        },
        ':active': {
          boxShadow: buttonTokens.primaryDisabled.shadowPressed,
        },
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
    ({ iconOnly, size }) => iconOnly && size === 'small',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        padding: `${buttonTokens.iconOnlySmall.paddingX} ${buttonTokens.iconOnlySmall.paddingY}`,
        minWidth: buttonTokens.iconOnlySmall.minWidth,
        maxWidth: buttonTokens.iconOnlySmall.maxWidth,
        borderRadius: buttonTokens.iconOnlySmall.borderRadius,
      };
    },
  ],
  [
    ({ iconOnly, size }) => iconOnly && size === 'large',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        padding: `${buttonTokens.iconOnlyLarge.paddingX} ${buttonTokens.iconOnlyLarge.paddingY}`,
        minWidth: buttonTokens.iconOnlyLarge.minWidth,
        maxWidth: buttonTokens.iconOnlyLarge.maxWidth,
        borderRadius: buttonTokens.iconOnlyLarge.borderRadius,
      };
    },
  ],
  // TODO: add disabled before ship prerelease
]);

const useChildrenClasses = makeStyles<ButtonStyleSelectors>([
  [
    null,
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        // TODO: This is "Body, Strong (?)" token in the design spec (14px size, 20px line, semibold weight)
        //      There are some type aliases in the figma not in our theme as well, not sure if this maps to alias or not
        fontWeight: buttonTokens.base.fontWeight,
        fontSize: buttonTokens.base.fontSize,
        lineHeight: buttonTokens.base.lineHeight,
      };
    },
  ],
  [
    ({ size }) => size === 'small',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        fontSize: buttonTokens.small.fontSize,
        fontWeight: buttonTokens.small.fontWeight,
        lineHeight: buttonTokens.small.lineHeight,
      };
    },
  ],
  [
    ({ size }) => size === 'large',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        fontSize: buttonTokens.large.fontSize,
        lineHeight: buttonTokens.large.lineHeight,
      };
    },
  ],
]);

const useIconClasses = makeStyles<ButtonStyleSelectors>([
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
  [
    ({ size }) => size === 'large',
    theme => {
      const buttonTokens = makeButtonTokens(theme);

      return {
        width: buttonTokens.large.iconWidth,
        height: buttonTokens.large.iconHeight,
      };
    },
  ],
]);

export const useButtonStyles = (state: ButtonState, selectors: ButtonStyleSelectors) => {
  state.className = ax(state.className, useRootClasses(selectors));

  state.children = state.children || { className: '' };
  state.icon = state.icon || { className: '' };

  state.children.className = ax(state.children.className, useChildrenClasses(selectors));
  state.icon.className = ax(state.icon.className, useIconClasses(selectors));
};
