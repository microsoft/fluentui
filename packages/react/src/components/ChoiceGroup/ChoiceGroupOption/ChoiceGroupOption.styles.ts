import { HighContrastSelector, getGlobalClassNames, getHighContrastNoAdjustStyle } from '../../../Styling';
import { IsFocusVisibleClassName } from '../../../Utilities';
import type { IStyle } from '../../../Styling';
import type { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption.types';

const GlobalClassNames = {
  root: 'ms-ChoiceField',
  choiceFieldWrapper: 'ms-ChoiceField-wrapper',
  input: 'ms-ChoiceField-input',
  field: 'ms-ChoiceField-field',
  innerField: 'ms-ChoiceField-innerField',
  imageWrapper: 'ms-ChoiceField-imageWrapper',
  iconWrapper: 'ms-ChoiceField-iconWrapper',
  labelWrapper: 'ms-ChoiceField-labelWrapper',
  checked: 'is-checked',
};

const labelWrapperLineHeight = 15;
const labelWrapperHeight = labelWrapperLineHeight * 2 + 2; // adding 2px height to ensure text doesn't get cutoff
const iconSize = 32;
const choiceFieldSize = 20;
const choiceFieldTransitionDuration = '200ms';
const choiceFieldTransitionTiming = 'cubic-bezier(.4, 0, .23, 1)';
const radioButtonSpacing = 3;
const radioButtonInnerSize = 5;

function getChoiceGroupFocusStyle(focusBorderColor: string, hasIconOrImage?: boolean): IStyle {
  return [
    'is-inFocus',
    {
      selectors: {
        [`.${IsFocusVisibleClassName} &, :host(.${IsFocusVisibleClassName}) &`]: {
          position: 'relative',
          outline: 'transparent',
          selectors: {
            '::-moz-focus-inner': {
              border: 0,
            },
            ':after': {
              content: '""',
              top: -2,
              right: -2,
              bottom: -2,
              left: -2,
              pointerEvents: 'none',
              border: `1px solid ${focusBorderColor}`,
              position: 'absolute',
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'WindowText',
                  borderWidth: hasIconOrImage ? 1 : 2,
                },
              },
            },
          },
        },
      },
    },
  ];
}

function getImageWrapperStyle(isSelectedImageWrapper: boolean, className?: string, checked?: boolean): IStyle {
  return [
    className,
    {
      paddingBottom: 2,
      transitionProperty: 'opacity',
      transitionDuration: choiceFieldTransitionDuration,
      transitionTimingFunction: 'ease',
      selectors: {
        '.ms-Image': {
          display: 'inline-block',
          borderStyle: 'none',
        },
      },
    },
    (checked ? !isSelectedImageWrapper : isSelectedImageWrapper) && [
      'is-hidden',
      {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0,
      },
    ],
  ];
}

export const getStyles = (props: IChoiceGroupOptionStyleProps): IChoiceGroupOptionStyles => {
  const { theme, hasIcon, hasImage, checked, disabled, imageIsLarge, focused, imageSize } = props;
  const { palette, semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  // Tokens
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.smallInputBorder
  const circleBorderColor = palette.neutralPrimary;
  const circleHoveredBorderColor = semanticColors.inputBorderHovered;
  const circleCheckedBorderColor = semanticColors.inputBackgroundChecked;
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBackgroundCheckedHovered
  const circleCheckedHoveredBorderColor = palette.themeDark;
  const circleDisabledBorderColor = semanticColors.disabledBodySubtext;
  const circleBackgroundColor = semanticColors.bodyBackground;
  const dotUncheckedHoveredColor = palette.neutralSecondary;
  const dotCheckedColor = semanticColors.inputBackgroundChecked;
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBackgroundCheckedHovered
  const dotCheckedHoveredColor = palette.themeDark;
  const dotDisabledColor = semanticColors.disabledBodySubtext;
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.bodyTextChecked
  const labelHoverFocusColor = palette.neutralDark;
  const focusBorderColor = semanticColors.focusBorder;
  const iconOrImageChoiceBorderUncheckedHoveredColor = semanticColors.inputBorderHovered;
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBackgroundCheckedHovered
  const iconOrImageChoiceBorderCheckedColor = semanticColors.inputBackgroundChecked;
  const iconOrImageChoiceBorderCheckedHoveredColor = palette.themeDark;
  const iconOrImageChoiceBackgroundColor = palette.neutralLighter;

  const fieldHoverOrFocusProperties = {
    selectors: {
      '.ms-ChoiceFieldLabel': {
        color: labelHoverFocusColor,
      },
      ':before': {
        borderColor: checked ? circleCheckedHoveredBorderColor : circleHoveredBorderColor,
      },
      ':after': [
        !hasIcon &&
          !hasImage &&
          !checked && {
            content: '""',
            transitionProperty: 'background-color',
            left: 5,
            top: 5,
            width: 10,
            height: 10,
            backgroundColor: dotUncheckedHoveredColor,
          },
        checked && {
          borderColor: dotCheckedHoveredColor,
          background: dotCheckedHoveredColor,
        },
      ],
    },
  };

  const enabledFieldWithImageHoverOrFocusProperties = {
    borderColor: checked ? iconOrImageChoiceBorderCheckedHoveredColor : iconOrImageChoiceBorderUncheckedHoveredColor,
    selectors: {
      ':before': {
        opacity: 1,
        borderColor: checked ? circleCheckedHoveredBorderColor : circleHoveredBorderColor,
      },
    },
  };

  const circleAreaProperties: IStyle = [
    {
      content: '""',
      display: 'inline-block',
      backgroundColor: circleBackgroundColor,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: circleBorderColor,
      width: choiceFieldSize,
      height: choiceFieldSize,
      fontWeight: 'normal',
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      transitionProperty: 'border-color',
      transitionDuration: choiceFieldTransitionDuration,
      transitionTimingFunction: choiceFieldTransitionTiming,
      borderRadius: '50%',
    },
    disabled && {
      borderColor: circleDisabledBorderColor,
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'GrayText',
          background: 'Window',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    },
    checked && {
      borderColor: disabled ? circleDisabledBorderColor : circleCheckedBorderColor,
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight',
          background: 'Window',
          forcedColorAdjust: 'none',
        },
      },
    },
    (hasIcon || hasImage) && {
      top: radioButtonSpacing,
      right: radioButtonSpacing,
      left: 'auto', // To reset the value of 'left' to its default value, so that 'right' works
      opacity: checked ? 1 : 0,
    },
  ];

  const dotAreaProperties: IStyle = [
    {
      content: '""',
      width: 0,
      height: 0,
      borderRadius: '50%',
      position: 'absolute',
      left: choiceFieldSize / 2,
      right: 0,
      transitionProperty: 'border-width',
      transitionDuration: choiceFieldTransitionDuration,
      transitionTimingFunction: choiceFieldTransitionTiming,
      boxSizing: 'border-box',
    },
    checked && {
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: disabled ? dotDisabledColor : dotCheckedColor,
      background: dotCheckedColor,
      left: 5,
      top: 5,
      width: 10,
      height: 10,
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight',
          forcedColorAdjust: 'none',
        },
      },
    },
    checked &&
      (hasIcon || hasImage) && {
        top: radioButtonSpacing + radioButtonInnerSize,
        right: radioButtonSpacing + radioButtonInnerSize,
        left: 'auto', // To reset the value of 'left' to its default value, so that 'right' works
      },
  ];

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        color: semanticColors.bodyText,
        minHeight: 26,
        border: 'none',
        position: 'relative',
        marginTop: 8,
        selectors: {
          '.ms-ChoiceFieldLabel': {
            display: 'inline-block',
          },
        },
      },
      !hasIcon &&
        !hasImage && {
          selectors: {
            '.ms-ChoiceFieldLabel': {
              paddingLeft: '26px',
            },
          },
        },
      hasImage && 'ms-ChoiceField--image',
      hasIcon && 'ms-ChoiceField--icon',
      (hasIcon || hasImage) && {
        display: 'inline-flex',
        fontSize: 0,
        margin: '0 4px 4px 0',
        paddingLeft: 0,
        backgroundColor: iconOrImageChoiceBackgroundColor,
        height: '100%',
      },
    ],
    choiceFieldWrapper: [
      classNames.choiceFieldWrapper,
      focused && getChoiceGroupFocusStyle(focusBorderColor, hasIcon || hasImage),
    ],
    // The hidden input
    input: [
      classNames.input,
      {
        position: 'absolute',
        opacity: 0,
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        margin: 0,
      },
      disabled && 'is-disabled',
    ],
    field: [
      classNames.field,
      checked && classNames.checked,
      {
        display: 'inline-block',
        cursor: 'pointer',
        marginTop: 0,
        position: 'relative',
        verticalAlign: 'top',
        userSelect: 'none',
        minHeight: 20,
        selectors: {
          ':hover': !disabled && fieldHoverOrFocusProperties,
          ':focus': !disabled && fieldHoverOrFocusProperties,

          // The circle
          ':before': circleAreaProperties,

          // The dot
          ':after': dotAreaProperties,
        },
      },
      hasIcon && 'ms-ChoiceField--icon',
      hasImage && 'ms-ChoiceField-field--image',
      (hasIcon || hasImage) && {
        boxSizing: 'content-box',
        cursor: 'pointer',
        paddingTop: 22,
        margin: 0,
        textAlign: 'center',
        transitionProperty: 'all',
        transitionDuration: choiceFieldTransitionDuration,
        transitionTimingFunction: 'ease',
        border: '1px solid transparent',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      },
      checked && {
        borderColor: iconOrImageChoiceBorderCheckedColor,
      },
      (hasIcon || hasImage) &&
        !disabled && {
          selectors: {
            ':hover': enabledFieldWithImageHoverOrFocusProperties,
            ':focus': enabledFieldWithImageHoverOrFocusProperties,
          },
        },
      disabled && {
        cursor: 'default',
        selectors: {
          '.ms-ChoiceFieldLabel': {
            color: semanticColors.disabledBodyText,
            selectors: {
              [HighContrastSelector]: {
                color: 'GrayText',
                ...getHighContrastNoAdjustStyle(),
              },
            },
          },
        },
      },
      checked &&
        disabled && {
          borderColor: iconOrImageChoiceBackgroundColor,
        },
    ],
    innerField: [
      classNames.innerField,
      hasImage && {
        // using non-null assertion because we have a default in `ChoiceGroupOptionBase` class.
        height: imageSize!.height,
        width: imageSize!.width,
      },
      (hasIcon || hasImage) && {
        position: 'relative',
        display: 'inline-block',
        paddingLeft: 30,
        paddingRight: 30,
      },
      (hasIcon || hasImage) &&
        imageIsLarge && {
          paddingLeft: 24,
          paddingRight: 24,
        },
      (hasIcon || hasImage) &&
        disabled && {
          opacity: 0.25,
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
              opacity: 1,
            },
          },
        },
    ],
    imageWrapper: getImageWrapperStyle(false, classNames.imageWrapper, checked),
    selectedImageWrapper: getImageWrapperStyle(true, classNames.imageWrapper, checked),
    iconWrapper: [
      classNames.iconWrapper,
      {
        fontSize: iconSize,
        lineHeight: iconSize,
        height: iconSize,
      },
    ],
    labelWrapper: [
      classNames.labelWrapper,
      fonts.medium,
      (hasIcon || hasImage) && {
        display: 'block',
        position: 'relative',
        margin: '4px 8px 2px 8px',
        height: labelWrapperHeight,
        lineHeight: labelWrapperLineHeight,
        // using non-null assertion because we have a default in `ChoiceGroupOptionBase` class.
        maxWidth: imageSize!.width * 2,
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
      },
    ],
  };
};
