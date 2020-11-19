import { PartialTheme } from '@fluentui/react-theme-provider';
import { unstable_resolveVariables } from '@fluentui/react-bindings';

export function convertTheme(theme: any): PartialTheme {
  const buttonVariables = unstable_resolveVariables(['Button'], theme, undefined, false);
  const convergedTheme: PartialTheme = {
    components: {
      Button: {
        variants: getButtonVariants(buttonVariables),
      },
    },
  };

  return convergedTheme;
}

// TODO: export ButtonVariables and use
function getButtonVariants(variables: any) {
  return {
    root: {
      background: variables.backgroundColor,
      borderColor: variables.borderColor,
      borderRadius: variables.borderRadius,
      boxShadow: variables.boxShadow,
      contentColor: variables.color,
      height: variables.height,
      iconSize: variables.iconSize,
      maxWidth: variables.maxWidth,
      minWidth: variables.minWidth,

      // textColor: '#484644',
      // textColorDisabled: '#C8C6C4',
      // textColorHover: '#6264A7',
      // textColorIconOnlyHover: '#6264A7',
      // textPrimaryColor: '#6264A7',
      // textPrimaryColorHover: '#6264A7',

      // TODO: map variables.padding
      paddingLeft: '1.4286rem',
      paddingRight: '1.4286rem',
      paddingTop: '0',
      paddingBottom: '0',

      fontSize: variables.contentFontSize,
      fontWeight: variables.contentFontWeight,

      pressed: {
        background: variables.backgroundColorActive,
        borderColor: variables.borderColorActive,
        contentColor: variables.colorActive,
      },

      disabled: {
        background: variables.backgroundColorDisabled,
        borderColor: variables.borderColorDisabled,
        contentColor: variables.colorDisabled,
      },

      focused: {
        background: variables.backgroundColorFocus,
        borderColor: variables.borderColorFocus,
        contentColor: variables.colorFocus,
      },

      hovered: {
        borderColor: variables.borderColorHover,
        contentColor: variables.colorHover,
      },

      content: {
        lineHeight: variables.contentLineHeight,
      },

      loader: {
        // loaderBorderSize: '0.1429rem',
        // loaderSize: '1.4286rem',
        // loaderSvgAnimationHeight: '-85.7143rem',
        // loaderSvgHeight: '87.1429rem',
        // loadingMinWidth: '8.4286rem',
        // sizeSmallLoaderBorderSize: '0.1429rem',
        // sizeSmallLoaderSize: '1.0714rem',
        // sizeSmallLoaderSvgAnimationHeight: '-62.8571rem',
        // sizeSmallLoaderSvgHeight: '63.9286rem',
      },
    },

    iconOnly: {
      // backgroundColorIconOnlyHover: 'transparent',
    },

    circular: {
      borderRadius: variables.circularBorderRadius,
    },

    primary: {
      background: variables.primaryBackgroundColor,
      borderColor: variables.primaryBorderColor,
      boxShadow: variables.primaryBoxShadow,
      contentColor: variables.primaryColor,

      hovered: {
        background: variables.primaryBackgroundColorHover,
        contentColor: variables.primaryColorHover,
      },
      pressed: {
        background: variables.primaryBackgroundColorActive,
      },
      disabled: {
        background: variables.primaryBackgroundColorDisabled,
      },
      focused: {
        background: variables.primaryBackgroundColorFocus,
      },
    },

    size_small: {
      fontSize: variables.sizeSmallContentFontSize,
      lineHeight: variables.sizeSmallContentLineHeight,
      height: variables.sizeSmallHeight,
      // sizeSmallPadding: '0 0.5714rem',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: '0.5714rem',
      paddingRight: '0.5714rem',

      minWidth: variables.sizeSmallMinWidth,
    },
  };
}
