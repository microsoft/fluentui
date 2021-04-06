import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
import { ButtonState, ButtonStyleSelectors, ButtonVariantTokens } from './Button.types';

// TODO: These are named in design specs but not hoisted to global/alias yet.
//       We're tracking these here to determine how we can hoist them.
export const buttonSpacing = {
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
    maxWidth: '280px',
    minWidth: '96px',
    paddingX: buttonSpacing.large,
    paddingY: '0',

    background: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,

    borderColor: theme.alias.color.neutral.neutralStroke1,
    borderRadius: theme.global.borderRadius.medium,
    borderWidth: theme.global.strokeWidth.thin,

    // TODO: spec calls out "shadow 4 __lighter__", are we missing tokens?
    shadow: theme.alias.shadow.shadow4,

    fontSize: theme.global.type.fontSizes.base[300],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[300],

    iconFontSize: '20px',
    iconHeight: '20px',
    iconSpacing: buttonSpacing.small,
    iconWidth: '20px',

    hovered: {
      background: theme.alias.color.neutral.neutralBackground1Hover,
      borderColor: theme.alias.color.neutral.neutralStroke1Hover,
      color: theme.alias.color.neutral.neutralForeground1,
      // TODO: spec calls out "shadow 4 __lighter__", are we missing tokens?
      shadow: theme.alias.shadow.shadow4,
    },

    pressed: {
      background: theme.alias.color.neutral.neutralBackground1Pressed,
      borderColor: theme.alias.color.neutral.neutralStroke1Pressed,
      color: theme.alias.color.neutral.neutralForeground1,
      // TODO: spec calls out "shadow 2 __lighter__", are we missing tokens?
      shadow: theme.alias.shadow.shadow2,
    },
  },
  disabled: {
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  },
  small: {
    paddingX: buttonSpacing.medium,
    borderRadius: theme.global.borderRadius.small,
    // TODO: design spec says minWidth "can be toggled off", consider prop like compact?
    minWidth: '64px',
    height: '24px',
    fontSize: theme.global.type.fontSizes.base[200],
    lineHeight: theme.global.type.lineHeights.base[200],
    fontWeight: theme.global.type.fontWeights.regular,
    iconSpacing: buttonSpacing.smaller,
  },
  large: {
    paddingX: buttonSpacing.larger,
    height: '40px',
    borderRadius: theme.global.borderRadius.medium,
    fontSize: theme.global.type.fontSizes.base[400],
    // TODO: 24px is not on the global ramp of line heights
    //       22px = theme.global.type.lineHeights.base[400]
    //       28px = theme.global.type.lineHeights.base[500]
    lineHeight: theme.global.type.lineHeights.base[400],
    iconFontSize: '24px',
    iconWidth: '24px',
    iconHeight: '24px',
    iconSpacing: buttonSpacing.small,
  },
  // TODO: Would be ideal to automate a check to ensure when a variant is accessed, all the tokens are accessed as well.
  //       If not, it means there is cruft in the variant tokens definition.
  //       All tokens in a variant should be mapped to some style property.
  iconOnly: {
    paddingX: buttonSpacing.smaller,
    paddingY: buttonSpacing.smaller,
    minWidth: '32px',
    maxWidth: '32px',
  },
  // TODO: combinatorial "variants" is wrong, we already have iconOnly and small.
  //       we essentially need to update component token mappings based on variant matchers.
  //       fow the sake of progress for now, we're extending variants to have combinations.
  iconOnlySmall: {
    paddingX: buttonSpacing.smaller,
    paddingY: buttonSpacing.smaller,
    borderRadius: theme.global.borderRadius.small,
    minWidth: '28px',
    maxWidth: '28px',
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

    // TODO: spec calls out "shadow 4 __brand__", are we missing tokens?
    shadow: theme.alias.shadow.shadow4,

    hovered: {
      background: theme.alias.color.brand.brandBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
      // TODO: spec calls out "shadow 4 __brand__", are we missing tokens?
      shadow: theme.alias.shadow.shadow4,
    },

    pressed: {
      background: theme.alias.color.brand.brandBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
      // TODO: spec calls out "shadow 2 __brand__", are we missing tokens?
      shadow: theme.alias.shadow.shadow2,
    },
  },
  disabledPrimary: {
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    // borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    shadow: 'none',

    pressed: {
      shadow: 'none',
    },
  },
});

const useStyles = makeStyles({
  root: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      // TODO: remove unsafe property: https://caniuse.com/?search=gap
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
        background: buttonTokens.base.hovered?.background,
        borderColor: buttonTokens.base.hovered?.borderColor,
        cursor: 'pointer',
      },
      ':active': {
        background: buttonTokens.base.pressed?.background,
        borderColor: buttonTokens.base.pressed?.borderColor,
        outline: 'none',
      },
      // TODO: this is for toggle button only. Use here in regular button?
      // '.active': theme.alias.color.neutral.neutralStroke1Pressed,
    };
  },
  rootSmall: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      gap: buttonTokens.small.iconSpacing,
      padding: `${buttonTokens.small.paddingY} ${buttonTokens.small.paddingX}`,
      minWidth: buttonTokens.small.minWidth,
      height: buttonTokens.small.height,
      borderRadius: buttonTokens.small.borderRadius,
    };
  },
  rootLarge: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      gap: buttonTokens.large.iconSpacing,
      padding: `${buttonTokens.large.paddingY} ${buttonTokens.large.paddingX}`,
      height: buttonTokens.large.height,
      borderRadius: buttonTokens.large.borderRadius,
    };
  },
  rootDisabled: theme => {
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
  rootPrimary: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      background: buttonTokens.primary.background,
      color: buttonTokens.primary.color,
      borderColor: buttonTokens.primary.borderColor,
      // TODO: spec calls out "shadow 4 __darker__", are we missing tokens?
      boxShadow: buttonTokens.primary.shadow,

      ':hover': {
        background: buttonTokens.primary.hovered?.background,
        borderColor: buttonTokens.primary.hovered?.borderColor,
      },

      ':active': {
        background: buttonTokens.primary.pressed?.background,
        // TODO: spec calls out "shadow 2 __darker__", are we missing tokens?
        boxShadow: buttonTokens.primary.shadow,
        borderColor: buttonTokens.primary.pressed?.borderColor,
      },

      // TODO: focus
    };
  },
  rootDisabledPrimary: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      background: buttonTokens.disabledPrimary.background,
      color: buttonTokens.disabledPrimary.color,
      boxShadow: buttonTokens.disabledPrimary.shadow,
      ':hover': {
        background: buttonTokens.disabledPrimary.background,
        cursor: 'default',
      },
      ':active': {
        boxShadow: buttonTokens.disabledPrimary.pressed?.shadow,
      },
    };
  },
  rootIconOnly: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      padding: buttonTokens.iconOnly.paddingX,
      minWidth: buttonTokens.iconOnly.minWidth,
      maxWidth: buttonTokens.iconOnly.maxWidth,
    };
  },
  rootIconOnlySmall: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      padding: `${buttonTokens.iconOnlySmall.paddingY} ${buttonTokens.iconOnlySmall.paddingX}`,
      minWidth: buttonTokens.iconOnlySmall.minWidth,
      maxWidth: buttonTokens.iconOnlySmall.maxWidth,
      borderRadius: buttonTokens.iconOnlySmall.borderRadius,
    };
  },
  rootIconOnlyLarge: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      padding: `${buttonTokens.iconOnlyLarge.paddingY} ${buttonTokens.iconOnlyLarge.paddingX}`,
      minWidth: buttonTokens.iconOnlyLarge.minWidth,
      maxWidth: buttonTokens.iconOnlyLarge.maxWidth,
      borderRadius: buttonTokens.iconOnlyLarge.borderRadius,
    };
  },
  children: theme => {
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
  childrenSmall: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      fontSize: buttonTokens.small.fontSize,
      fontWeight: buttonTokens.small.fontWeight,
      lineHeight: buttonTokens.small.lineHeight,
    };
  },
  childrenLarge: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      fontSize: buttonTokens.large.fontSize,
      lineHeight: buttonTokens.large.lineHeight,
    };
  },
  icon: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: buttonTokens.base.iconFontSize,
      height: buttonTokens.base.iconHeight,
      width: buttonTokens.base.iconWidth,
    };
  },
  iconLarge: theme => {
    const buttonTokens = makeButtonTokens(theme);

    return {
      fontSize: buttonTokens.large.iconFontSize,
      height: buttonTokens.large.iconHeight,
      width: buttonTokens.large.iconWidth,
    };
  },
});

export const useButtonStyles = (state: ButtonState, selectors: ButtonStyleSelectors) => {
  const styles = useStyles();
  state.className = useAx(
    styles.root,
    selectors.disabled && styles.rootDisabled,
    selectors.iconOnly && styles.rootIconOnly,
    selectors.primary && styles.rootPrimary,
    selectors.size === 'small' && styles.rootSmall,
    selectors.size === 'large' && styles.rootLarge,
    selectors.disabled && selectors.primary && styles.rootDisabledPrimary,
    selectors.iconOnly && selectors.size === 'small' && styles.rootIconOnlySmall,
    selectors.iconOnly && selectors.size === 'large' && styles.rootIconOnlyLarge,
    state.className,
  );

  if (state.children) {
    state.children.className = useAx(
      styles.children,
      selectors.size === 'small' && styles.childrenSmall,
      selectors.size === 'large' && styles.childrenLarge,
      state.children.className,
    );
  }

  if (state.icon) {
    state.icon.className = useAx(styles.icon, selectors.size === 'large' && styles.iconLarge, state.icon.className);
  }
};
