import {
  AnimationClassNames,
  getFocusStyle,
  getGlobalClassNames,
  getInputFocusStyle,
  HighContrastSelector,
  normalize,
  getPlaceholderStyles,
  IconFontSizes,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import type { IStyle } from '../../Styling';
import type { ILabelStyles, ILabelStyleProps } from '../../Label';
import type { ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';
import type { IStyleFunctionOrObject } from '@fluentui/utilities';

const globalClassNames = {
  root: 'ms-TextField',
  description: 'ms-TextField-description',
  errorMessage: 'ms-TextField-errorMessage',
  field: 'ms-TextField-field',
  fieldGroup: 'ms-TextField-fieldGroup',
  prefix: 'ms-TextField-prefix',
  suffix: 'ms-TextField-suffix',
  wrapper: 'ms-TextField-wrapper',
  revealButton: 'ms-TextField-reveal',

  multiline: 'ms-TextField--multiline',
  borderless: 'ms-TextField--borderless',
  underlined: 'ms-TextField--underlined',
  unresizable: 'ms-TextField--unresizable',

  required: 'is-required',
  disabled: 'is-disabled',
  active: 'is-active',
};

function getLabelStyles(props: ITextFieldStyleProps): IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles> {
  const { underlined, disabled, focused, theme } = props;
  const { palette, fonts } = theme;

  return () => ({
    root: [
      underlined &&
        disabled && {
          color: palette.neutralTertiary,
        },
      underlined && {
        fontSize: fonts.medium.fontSize,
        marginRight: 8,
        paddingLeft: 12,
        paddingRight: 0,
        lineHeight: '22px',
        height: 32,
      },
      underlined &&
        focused && {
          selectors: {
            [HighContrastSelector]: {
              height: 31, // -1px to prevent jumpiness in HC with the increased border-width to 2px
            },
          },
        },
    ],
  });
}

export function getStyles(props: ITextFieldStyleProps): ITextFieldStyles {
  const {
    theme,
    className,
    disabled,
    focused,
    required,
    multiline,
    hasLabel,
    borderless,
    underlined,
    hasIcon,
    resizable,
    hasErrorMessage,
    inputClassName,
    autoAdjustHeight,
    hasRevealButton,
  } = props;

  const { semanticColors, effects, fonts } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  const fieldPrefixSuffix: IStyle = {
    // Suffix/Prefix are not editable so the disabled slot perfectly fits.
    background: semanticColors.disabledBackground,
    color: !disabled ? semanticColors.inputPlaceholderText : semanticColors.disabledText,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    selectors: {
      [HighContrastSelector]: {
        background: 'Window',
        color: disabled ? 'GrayText' : 'WindowText',
      },
    },
  };

  // placeholder style constants
  const placeholderStyles: IStyle = [
    {
      color: semanticColors.inputPlaceholderText,
      opacity: 1,
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
    },
  ];

  const disabledPlaceholderStyles: IStyle = {
    color: semanticColors.disabledText,
    selectors: {
      [HighContrastSelector]: {
        color: 'GrayText',
      },
    },
  };

  return {
    root: [
      classNames.root,
      fonts.medium,
      required && classNames.required,
      disabled && classNames.disabled,
      focused && classNames.active,
      multiline && classNames.multiline,
      borderless && classNames.borderless,
      underlined && classNames.underlined,
      normalize,
      {
        position: 'relative',
      },
      className,
    ],
    wrapper: [
      classNames.wrapper,

      underlined && [
        {
          display: 'flex',
          borderBottom: `1px solid ${!hasErrorMessage ? semanticColors.inputBorder : semanticColors.errorText}`,
          width: '100%',
        },
        disabled && {
          borderBottomColor: semanticColors.disabledBackground,
          selectors: {
            [HighContrastSelector]: {
              borderColor: 'GrayText',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        },
        !disabled && {
          selectors: {
            ':hover': {
              borderBottomColor: !hasErrorMessage ? semanticColors.inputBorderHovered : semanticColors.errorText,
              selectors: {
                [HighContrastSelector]: {
                  borderBottomColor: 'Highlight',
                  ...getHighContrastNoAdjustStyle(),
                },
              },
            },
          },
        },
        focused && [
          {
            position: 'relative',
          },
          getInputFocusStyle(
            !hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText,
            0,
            'borderBottom',
          ),
        ],
      ],
    ],
    fieldGroup: [
      classNames.fieldGroup,
      normalize,
      {
        border: `1px solid ${semanticColors.inputBorder}`,
        borderRadius: effects.roundedCorner2,
        background: semanticColors.inputBackground,
        cursor: 'text',
        height: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'relative',
      },
      multiline && {
        minHeight: '60px',
        height: 'auto',
        display: 'flex',
      },

      !focused &&
        !disabled && {
          selectors: {
            ':hover': {
              borderColor: semanticColors.inputBorderHovered,
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'Highlight',
                  ...getHighContrastNoAdjustStyle(),
                },
              },
            },
          },
        },

      focused &&
        !underlined &&
        getInputFocusStyle(
          !hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText,
          effects.roundedCorner2,
        ),
      disabled && {
        borderColor: semanticColors.disabledBackground,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'GrayText',
            ...getHighContrastNoAdjustStyle(),
          },
        },

        cursor: 'default',
      },
      borderless && {
        border: 'none',
      },
      borderless &&
        focused && {
          border: 'none',
          selectors: {
            ':after': {
              border: 'none',
            },
          },
        },
      underlined && {
        flex: '1 1 0px',
        border: 'none',
        textAlign: 'left',
      },
      underlined &&
        disabled && {
          backgroundColor: 'transparent',
        },

      hasErrorMessage &&
        !underlined && {
          borderColor: semanticColors.errorText,
          selectors: {
            '&:hover': {
              borderColor: semanticColors.errorText,
            },
          },
        },
      !hasLabel &&
        required && {
          selectors: {
            ':before': {
              content: `'*'`,
              color: semanticColors.errorText,
              position: 'absolute',
              top: -5,
              right: -10,
            },
            [HighContrastSelector]: {
              selectors: {
                ':before': {
                  color: 'WindowText',
                  right: -14, // moving the * 4 pixel to right to alleviate border clipping in HC mode.
                },
              },
            },
          },
        },
    ],
    field: [
      fonts.medium,
      classNames.field,
      normalize,
      {
        borderRadius: 0,
        border: 'none',
        background: 'none',
        backgroundColor: 'transparent',
        color: semanticColors.inputText,
        padding: '0 8px',
        width: '100%',
        minWidth: 0,
        textOverflow: 'ellipsis',
        outline: 0,
        selectors: {
          '&:active, &:focus, &:hover': { outline: 0 },
          '::-ms-clear': {
            display: 'none',
          },
          [HighContrastSelector]: {
            background: 'Window',
            color: disabled ? 'GrayText' : 'WindowText',
          },
        },
      },
      getPlaceholderStyles(placeholderStyles),
      multiline &&
        !resizable && [
          classNames.unresizable,
          {
            resize: 'none',
          },
        ],
      multiline && {
        minHeight: 'inherit',
        lineHeight: 17,
        flexGrow: 1,
        paddingTop: 6,
        paddingBottom: 6,
        overflow: 'auto',
        width: '100%',
      },
      multiline &&
        autoAdjustHeight && {
          overflow: 'hidden',
        },
      hasIcon &&
        !hasRevealButton && {
          paddingRight: 24,
        },
      multiline &&
        hasIcon && {
          paddingRight: 40,
        },
      disabled && [
        {
          backgroundColor: semanticColors.disabledBackground,
          color: semanticColors.disabledText,
          borderColor: semanticColors.disabledBackground,
        },
        getPlaceholderStyles(disabledPlaceholderStyles),
      ],
      underlined && {
        textAlign: 'left',
      },
      focused &&
        !borderless && {
          selectors: {
            [HighContrastSelector]: {
              paddingLeft: 11,
              paddingRight: 11,
            },
          },
        },
      focused &&
        multiline &&
        !borderless && {
          selectors: {
            [HighContrastSelector]: {
              paddingTop: 4, // take into consideration the 2px increased border-width (not when borderless).
            },
          },
        },
      inputClassName,
    ],
    icon: [
      multiline && {
        paddingRight: 24,
        alignItems: 'flex-end',
      },
      {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 6,
        right: 8,
        top: 'auto',
        fontSize: IconFontSizes.medium,
        lineHeight: 18,
      },
      disabled && {
        color: semanticColors.disabledText,
      },
    ],
    description: [
      classNames.description,
      {
        color: semanticColors.bodySubtext,
        fontSize: fonts.xSmall.fontSize,
      },
    ],
    errorMessage: [
      classNames.errorMessage,
      AnimationClassNames.slideDownIn20,
      fonts.small,
      {
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: 'flex',
        alignItems: 'center',
      },
    ],
    prefix: [classNames.prefix, fieldPrefixSuffix],
    suffix: [classNames.suffix, fieldPrefixSuffix],
    revealButton: [
      classNames.revealButton,
      'ms-Button',
      'ms-Button--icon',
      getFocusStyle(theme, { inset: 1 }),
      {
        height: 30,
        width: 32,
        border: 'none',
        padding: '0px 4px',
        backgroundColor: 'transparent',
        color: semanticColors.link,
        selectors: {
          ':hover': {
            outline: 0,
            color: semanticColors.primaryButtonBackgroundHovered,
            backgroundColor: semanticColors.buttonBackgroundHovered,
            selectors: {
              [HighContrastSelector]: {
                borderColor: 'Highlight',
                color: 'Highlight',
              },
            },
          },
          ':focus': { outline: 0 },
        },
      },
      hasIcon && {
        marginRight: 28,
      },
    ],
    revealSpan: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
    },
    revealIcon: {
      margin: '0px 4px',
      pointerEvents: 'none',
      bottom: 6,
      right: 8,
      top: 'auto',
      fontSize: IconFontSizes.medium,
      lineHeight: 18,
    },
    subComponentStyles: {
      label: getLabelStyles(props),
    },
  };
}
