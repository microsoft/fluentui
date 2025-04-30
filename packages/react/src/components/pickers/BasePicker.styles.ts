import {
  getGlobalClassNames,
  getInputFocusStyle,
  getPlaceholderStyles,
  hiddenContentStyle,
  HighContrastSelector,
} from '../../Styling';
import type { IBasePickerStyleProps, IBasePickerStyles } from './BasePicker.types';
import type { IStyle } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-BasePicker',
  label: 'ms-BasePicker-label',
  text: 'ms-BasePicker-text',
  itemsWrapper: 'ms-BasePicker-itemsWrapper',
  input: 'ms-BasePicker-input',
  error: 'ms-BasePicker-error',
};

export function getStyles(props: IBasePickerStyleProps): IBasePickerStyles {
  const { className, theme, isFocused, inputClassName, disabled, hasErrorMessage } = props;

  if (!theme) {
    throw new Error('theme is undefined or null in base BasePicker getStyles function.');
  }
  const { semanticColors, effects, fonts } = theme;
  const { inputBorder, inputBorderHovered, inputFocusBorderAlt } = semanticColors;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  // placeholder style constants
  const placeholderStyles: IStyle = [
    fonts.medium,
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

  // The following lines are to create a semi-transparent color overlay for the disabled state with designer's approval.
  // @todo: investigate the performance cost of the calculation below and apply if negligible.
  //   Replacing with a static color for now.
  // const rgbColor: IRGB | undefined = cssColor(palette.neutralQuaternaryAlt);
  // const disabledOverlayColor = rgbColor ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.29)` : 'transparent';
  const disabledOverlayColor = 'rgba(218, 218, 218, 0.29)';

  const focusColor = isFocused && !disabled && (hasErrorMessage ? semanticColors.errorText : inputFocusBorderAlt);

  return {
    root: [classNames.root, className, { position: 'relative' }],
    error: [
      classNames.error,
      {
        fontSize: 12,
        fontWeight: 400,
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: hasErrorMessage ? 'flex' : 'none',
        alignItems: 'center',
      },
    ],
    text: [
      classNames.text,
      {
        display: 'flex',
        position: 'relative',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxSizing: 'border-box',
        minWidth: 180,
        minHeight: 30,
        border: `1px solid ${inputBorder}`,
        borderRadius: effects.roundedCorner2,
      },
      !isFocused &&
        !disabled && {
          selectors: {
            ':hover': {
              borderColor: inputBorderHovered,
            },
          },
        },
      focusColor && getInputFocusStyle(focusColor, effects.roundedCorner2),
      disabled && {
        borderColor: disabledOverlayColor,
        selectors: {
          ':after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: disabledOverlayColor,
          },
          [HighContrastSelector]: {
            borderColor: 'GrayText',
            selectors: {
              ':after': {
                background: 'none',
              },
            },
          },
        },
      },
      hasErrorMessage && {
        borderColor: semanticColors.errorText,
        selectors: {
          ':hover': {
            borderColor: semanticColors.errorText,
          },
        },
      },
    ],
    itemsWrapper: [
      classNames.itemsWrapper,
      {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '100%',
      },
    ],
    input: [
      classNames.input,
      fonts.medium,
      {
        height: 30,
        border: 'none',
        flexGrow: 1,
        outline: 'none',
        padding: '0 6px 0',
        alignSelf: 'flex-end',
        borderRadius: effects.roundedCorner2,
        backgroundColor: 'transparent',
        color: semanticColors.inputText,
        selectors: {
          '::-ms-clear': {
            display: 'none',
          },
          '&:placeholder-shown': {
            textOverflow: 'ellipsis',
          },
        },
      },
      getPlaceholderStyles(placeholderStyles),
      disabled && getPlaceholderStyles(disabledPlaceholderStyles),
      inputClassName,
    ],
    screenReaderText: hiddenContentStyle,
    subComponentStyles: {
      label: {},
      callout: {
        // Picker suggestions already manage overflow and scrolling items into view
        // for this to work at all screen sizes, we need Callout to not also have overflow
        calloutMain: {
          overflow: 'unset',
          maxHeight: '100%',
        },
      },
    },
  };
}
