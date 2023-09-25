import {
  FontWeights,
  concatStyleSets,
  getFocusStyle,
  HighContrastSelector,
  getPlaceholderStyles,
  hiddenContentStyle,
  getInputFocusStyle,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import type { IRawStyle, ITheme, IStyle } from '../../Styling';
import type { IComboBoxOptionStyles, IComboBoxStyles } from './ComboBox.types';
import type { IButtonStyles } from '../../Button';

const ComboBoxHeight = 32;
const ComboBoxLineHeight = 30;
const ComboBoxCaretDownWidth = 32;
const ComboBoxOptionHeight = 36;

const getDisabledStyles = memoizeFunction((theme: ITheme): IRawStyle => {
  const { semanticColors } = theme;

  return {
    backgroundColor: semanticColors.disabledBackground,
    color: semanticColors.disabledText,
    cursor: 'default',
    selectors: {
      ':after': {
        borderColor: semanticColors.disabledBackground,
      },
      [HighContrastSelector]: {
        color: 'GrayText',
        selectors: {
          ':after': {
            borderColor: 'GrayText',
          },
        },
      },
    },
  };
});

const listOptionHighContrastStyles: IRawStyle = {
  selectors: {
    [HighContrastSelector]: {
      backgroundColor: 'Highlight',
      borderColor: 'Highlight',
      color: 'HighlightText',
      ...getHighContrastNoAdjustStyle(),
    },
  },
};

const inputHighContrastStyles: IRawStyle = {
  selectors: {
    [HighContrastSelector]: {
      color: 'WindowText',
      backgroundColor: 'Window',
      ...getHighContrastNoAdjustStyle(),
    },
  },
};

export const getOptionStyles = memoizeFunction(
  (
    theme: ITheme,
    customStylesForAllOptions?: Partial<IComboBoxOptionStyles>,
    customOptionStylesForCurrentOption?: Partial<IComboBoxOptionStyles>,
    isPending?: boolean,
    isHidden?: boolean,
    isSelected?: boolean,
  ): Partial<IComboBoxOptionStyles> => {
    const { palette, semanticColors } = theme;

    const option = {
      textHoveredColor: semanticColors.menuItemTextHovered,
      textSelectedColor: palette.neutralDark,
      textDisabledColor: semanticColors.disabledText,
      backgroundHoveredColor: semanticColors.menuItemBackgroundHovered,
      backgroundPressedColor: semanticColors.menuItemBackgroundPressed,
    };

    const optionStyles: IComboBoxOptionStyles = {
      root: [
        theme.fonts.medium,
        {
          backgroundColor: isPending ? option.backgroundHoveredColor : 'transparent',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: isHidden ? 'none' : 'block',
          width: '100%',
          height: 'auto',
          minHeight: ComboBoxOptionHeight,
          lineHeight: '20px',
          padding: '0 8px',
          position: 'relative',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRadius: 0,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          textAlign: 'left',
          selectors: {
            [HighContrastSelector]: {
              border: 'none',
              borderColor: 'Background',
            },
            ...(!isHidden && {
              '&.ms-Checkbox': {
                display: 'flex',
                alignItems: 'center',
              },
            }),
            '&.ms-Button--command:hover:active': {
              backgroundColor: option.backgroundPressedColor,
            },
            '.ms-Checkbox-label': {
              width: '100%',
            },
          },
        },
        isSelected
          ? [
              {
                backgroundColor: 'transparent',
                color: option.textSelectedColor,
                selectors: {
                  ':hover': [
                    {
                      backgroundColor: option.backgroundHoveredColor,
                    },
                    listOptionHighContrastStyles,
                  ],
                },
              },
              getFocusStyle(theme, { inset: -1, isFocusedOnly: false }),
              listOptionHighContrastStyles,
            ]
          : [],
      ],
      rootHovered: {
        backgroundColor: option.backgroundHoveredColor,
        color: option.textHoveredColor,
      },
      rootFocused: {
        backgroundColor: option.backgroundHoveredColor,
      },
      rootDisabled: {
        color: option.textDisabledColor,
        cursor: 'default',
      },
      optionText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        minWidth: '0px',
        maxWidth: '100%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        display: 'inline-block',
      },
      optionTextWrapper: {
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
      },
    };

    return concatStyleSets(optionStyles, customStylesForAllOptions, customOptionStylesForCurrentOption);
  },
);

export const getCaretDownButtonStyles = memoizeFunction(
  (theme: ITheme, customStyles?: Partial<IButtonStyles>): IButtonStyles => {
    const { semanticColors, fonts } = theme;

    const caret = {
      buttonTextColor: semanticColors.bodySubtext,
      buttonTextHoveredCheckedColor: semanticColors.buttonTextChecked,
      buttonBackgroundHoveredColor: semanticColors.listItemBackgroundHovered,
      buttonBackgroundCheckedColor: semanticColors.listItemBackgroundChecked,
      buttonBackgroundCheckedHoveredColor: semanticColors.listItemBackgroundCheckedHovered,
    };

    const buttonHighContrastStyles: IStyle = {
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
          color: 'HighlightText',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    };

    const styles: IButtonStyles = {
      root: {
        color: caret.buttonTextColor,
        fontSize: fonts.small.fontSize,
        position: 'absolute',
        top: 0,
        height: '100%',
        lineHeight: ComboBoxLineHeight,
        width: ComboBoxCaretDownWidth,
        textAlign: 'center',
        cursor: 'default',
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'ButtonFace',
            borderColor: 'ButtonText',
            color: 'ButtonText',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },
      icon: {
        fontSize: fonts.small.fontSize,
      },
      rootHovered: [
        {
          backgroundColor: caret.buttonBackgroundHoveredColor,
          color: caret.buttonTextHoveredCheckedColor,
          cursor: 'pointer',
        },
        buttonHighContrastStyles,
      ],
      rootPressed: [
        {
          backgroundColor: caret.buttonBackgroundCheckedColor,
          color: caret.buttonTextHoveredCheckedColor,
        },
        buttonHighContrastStyles,
      ],
      rootChecked: [
        {
          backgroundColor: caret.buttonBackgroundCheckedColor,
          color: caret.buttonTextHoveredCheckedColor,
        },
        buttonHighContrastStyles,
      ],
      rootCheckedHovered: [
        {
          backgroundColor: caret.buttonBackgroundCheckedHoveredColor,
          color: caret.buttonTextHoveredCheckedColor,
        },
        buttonHighContrastStyles,
      ],
      rootDisabled: [
        getDisabledStyles(theme),
        {
          position: 'absolute',
        },
      ],
    };
    return concatStyleSets(styles, customStyles);
  },
);

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: Partial<IComboBoxStyles>, comboBoxOptionWidth?: string): Partial<IComboBoxStyles> => {
    const { semanticColors, fonts, effects } = theme;

    const root = {
      textColor: semanticColors.inputText,
      borderColor: semanticColors.inputBorder,
      borderHoveredColor: semanticColors.inputBorderHovered,
      borderPressedColor: semanticColors.inputFocusBorderAlt,
      borderFocusedColor: semanticColors.inputFocusBorderAlt,
      backgroundColor: semanticColors.inputBackground,
      erroredColor: semanticColors.errorText,
    };

    const option = {
      headerTextColor: semanticColors.menuHeader,
      dividerBorderColor: semanticColors.bodyDivider,
    };

    // placeholder style variables
    const placeholderHighContrastStyles: IRawStyle = {
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
    };
    const placeholderStyles: IStyle = [
      {
        color: semanticColors.inputPlaceholderText,
      },
      placeholderHighContrastStyles,
    ];
    const placeholderStylesHovered: IStyle = [
      {
        color: semanticColors.inputTextHovered,
      },
      placeholderHighContrastStyles,
    ];
    const disabledPlaceholderStyles: IStyle = [
      {
        color: semanticColors.disabledText,
      },
      placeholderHighContrastStyles,
    ];

    const ComboBoxRootHighContrastFocused = {
      color: 'HighlightText',
      backgroundColor: 'Window',
      ...getHighContrastNoAdjustStyle(),
      selectors: {
        ':after': {
          borderColor: 'Highlight',
        },
      },
    };

    const focusBorderStyles: IStyle = getInputFocusStyle(root.borderPressedColor, effects.roundedCorner2, 'border', 0);

    const styles: IComboBoxStyles = {
      container: {},
      label: {},
      labelDisabled: {},
      root: [
        theme.fonts.medium,
        {
          boxShadow: 'none',
          marginLeft: '0',
          paddingRight: ComboBoxCaretDownWidth,
          paddingLeft: 9,
          color: root.textColor,
          position: 'relative',
          outline: '0',
          userSelect: 'none',
          backgroundColor: root.backgroundColor,
          cursor: 'text',
          display: 'block',
          height: ComboBoxHeight,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          boxSizing: 'border-box', // Border-box matches Dropdown and TextField
          selectors: {
            '.ms-Label': {
              display: 'inline-block',
              marginBottom: '8px',
            },
            '&.is-open': {
              selectors: {
                [HighContrastSelector]: ComboBoxRootHighContrastFocused,
              },
            },
            // setting border using pseudo-element here in order to
            // prevent chevron button to overlap ComboBox border under certain resolutions
            ':after': {
              pointerEvents: 'none',
              content: "''",
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: root.borderColor,
              borderRadius: effects.roundedCorner2,
            },
          },
        },
      ],

      rootHovered: {
        selectors: {
          ':after': {
            borderColor: root.borderHoveredColor,
          },
          '.ms-ComboBox-Input': [
            {
              color: semanticColors.inputTextHovered,
            },
            getPlaceholderStyles(placeholderStylesHovered),
            inputHighContrastStyles,
          ],
          [HighContrastSelector]: {
            color: 'HighlightText',
            backgroundColor: 'Window',
            ...getHighContrastNoAdjustStyle(),
            selectors: {
              ':after': {
                borderColor: 'Highlight',
              },
            },
          },
        },
      },

      rootPressed: [
        {
          position: 'relative',
          selectors: {
            [HighContrastSelector]: ComboBoxRootHighContrastFocused,
          },
        },
      ],

      rootFocused: [
        {
          selectors: {
            '.ms-ComboBox-Input': [
              {
                color: semanticColors.inputTextHovered,
              },
              inputHighContrastStyles,
            ],
            [HighContrastSelector]: ComboBoxRootHighContrastFocused,
          },
        },
        focusBorderStyles,
      ],

      rootDisabled: getDisabledStyles(theme),

      rootError: {
        selectors: {
          ':after': {
            borderColor: root.erroredColor,
          },
          ':hover:after': {
            borderColor: semanticColors.inputBorderHovered,
          },
        },
      },

      rootDisallowFreeForm: {},

      input: [
        getPlaceholderStyles(placeholderStyles),
        {
          backgroundColor: root.backgroundColor,
          color: root.textColor,
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
          borderStyle: 'none',
          outline: 'none',
          font: 'inherit',
          textOverflow: 'ellipsis',
          padding: '0',
          selectors: {
            '::-ms-clear': {
              display: 'none',
            },
          },
        },
        inputHighContrastStyles,
      ],

      inputDisabled: [getDisabledStyles(theme), getPlaceholderStyles(disabledPlaceholderStyles)],
      errorMessage: [
        theme.fonts.small,
        {
          color: root.erroredColor,
          marginTop: '5px',
        },
      ],

      callout: {
        boxShadow: effects.elevation8,
      },

      optionsContainerWrapper: {
        width: comboBoxOptionWidth,
      },

      optionsContainer: {
        display: 'block',
      },
      screenReaderText: hiddenContentStyle,

      header: [
        fonts.medium,
        {
          fontWeight: FontWeights.semibold,
          color: option.headerTextColor,
          backgroundColor: 'none',
          borderStyle: 'none',
          height: ComboBoxOptionHeight,
          lineHeight: ComboBoxOptionHeight,
          cursor: 'default',
          padding: '0 8px',
          userSelect: 'none',
          textAlign: 'left',
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        },
      ],

      divider: {
        height: 1,
        backgroundColor: option.dividerBorderColor,
      },
    };

    return concatStyleSets(styles, customStyles);
  },
);
