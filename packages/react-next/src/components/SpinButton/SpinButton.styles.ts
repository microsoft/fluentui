import {
  IRawStyle,
  ITheme,
  concatStyleSets,
  HighContrastSelector,
  IconFontSizes,
  getInputFocusStyle,
} from '../../Styling';
import { IButtonStyles } from '../../compat/Button';

import { ISpinButtonStyles, ISpinButtonStyleProps } from './SpinButton.types';
import { memoizeFunction } from '../../Utilities';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';

const ARROW_BUTTON_WIDTH = 23;
const ARROW_BUTTON_ICON_SIZE = 8;
const DEFAULT_HEIGHT = 32;
const DEFAULT_MIN_WIDTH = 86;
const LABEL_MARGIN = 10;

const getDisabledStyles = memoizeFunction(
  (theme: ITheme): IRawStyle => {
    const { semanticColors } = theme;

    const SpinButtonTextColorDisabled = semanticColors.disabledText;
    const SpinButtonBackgroundColorDisabled = semanticColors.disabledBackground;

    return {
      backgroundColor: SpinButtonBackgroundColorDisabled,
      pointerEvents: 'none',
      cursor: 'default',
      color: SpinButtonTextColorDisabled,
      selectors: {
        ':after': {
          borderColor: SpinButtonBackgroundColorDisabled,
        },
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
    };
  },
);

export const getArrowButtonStyles = memoizeFunction(
  (theme: ITheme, isUpArrow: boolean, customSpecificArrowStyles?: Partial<IButtonStyles>): IButtonStyles => {
    const { palette, semanticColors, effects } = theme;

    // TODO: after updating the semanticColor slots all this need to be reevaluated.
    const ArrowButtonTextColor = palette.neutralSecondary;
    const ArrowButtonTextColorHovered = semanticColors.buttonText;
    const ArrowButtonTextColorPressed = semanticColors.buttonText;

    const ArrowButtonBackgroundHovered = semanticColors.buttonBackgroundHovered;
    const ArrowButtonBackgroundPressed = semanticColors.buttonBackgroundPressed;

    const defaultArrowButtonStyles: IButtonStyles = {
      root: {
        outline: 'none',
        display: 'block',
        height: '50%',
        width: ARROW_BUTTON_WIDTH,
        padding: 0,
        backgroundColor: 'transparent',
        textAlign: 'center',
        cursor: 'default',
        color: ArrowButtonTextColor,
        selectors: {
          '&.ms-DownButton': {
            borderRadius: `0 0 ${effects.roundedCorner2} 0`,
          },
          '&.ms-UpButton': {
            borderRadius: `0 ${effects.roundedCorner2} 0 0`,
          },
        },
      },
      rootHovered: {
        backgroundColor: ArrowButtonBackgroundHovered,
        color: ArrowButtonTextColorHovered,
      },
      rootChecked: {
        backgroundColor: ArrowButtonBackgroundPressed,
        color: ArrowButtonTextColorPressed,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Highlight',
            color: 'HighlightText',
          },
        },
      },
      rootPressed: {
        backgroundColor: ArrowButtonBackgroundPressed,
        color: ArrowButtonTextColorPressed,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Highlight',
            color: 'HighlightText',
          },
        },
      },
      rootDisabled: {
        opacity: 0.5,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            opacity: 1,
          },
        },
      },
      icon: {
        fontSize: ARROW_BUTTON_ICON_SIZE,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
      },
    };

    // No specific styles needed as of now.
    const defaultUpArrowButtonStyles: Partial<IButtonStyles> = {};

    const defaultDownArrowButtonStyles: Partial<IButtonStyles> = {};

    return concatStyleSets(
      defaultArrowButtonStyles,
      isUpArrow ? defaultUpArrowButtonStyles : defaultDownArrowButtonStyles,
      customSpecificArrowStyles,
    ) as IButtonStyles;
  },
);

export const getStyles = (props: ISpinButtonStyleProps): ISpinButtonStyles => {
  const { theme, className, labelPosition, disabled, isFocused } = props;
  const { palette, semanticColors, effects, fonts } = theme;
  const SpinButtonRootBorderColor = semanticColors.inputBorder;
  const SpinButtonRootBackgroundColor = semanticColors.inputBackground;
  const SpinButtonRootBorderColorHovered = semanticColors.inputBorderHovered;
  const SpinButtonRootBorderColorFocused = semanticColors.inputFocusBorderAlt;
  const SpinButtonInputTextColor = semanticColors.inputText;
  const SpinButtonInputTextColorSelected = palette.white;
  const SpinButtonInputBackgroundColorSelected = semanticColors.inputBackgroundChecked;
  const SpinButtonIconDisabledColor = semanticColors.disabledText;

  return {
    root: [
      {
        outline: 'none',
        fontSize: fonts.medium.fontSize,
        width: '100%',
        minWidth: DEFAULT_MIN_WIDTH,
      },
      className,
    ],

    labelWrapper: [
      {
        display: 'inline-flex',
        alignItems: 'center',
      },
      labelPosition === Position.start && {
        height: DEFAULT_HEIGHT,
        float: 'left',
        marginRight: LABEL_MARGIN,
      },
      labelPosition === Position.end && {
        height: DEFAULT_HEIGHT,
        float: 'right',
        marginLeft: LABEL_MARGIN,
      },
      labelPosition === Position.top && {
        // Due to the lineHeight set on the label (below), the height of the wrapper (contains icon+label)
        // ends up 1px taller than a standard label height, causing the vertical alignment to be off when
        // the SpinButton is displayed with the label on top next to other form fields.
        // Decrease the wrapper's effective height slightly to compensate.
        marginBottom: -1,
      },
    ],

    icon: [
      {
        padding: '0 5px',
        fontSize: IconFontSizes.large,
      },
      disabled && {
        color: SpinButtonIconDisabledColor,
      },
    ],

    label: {
      pointerEvents: 'none',
      // centering the label with the icon by forcing the exact same height as the icon.
      lineHeight: IconFontSizes.large,
    },

    spinButtonWrapper: [
      {
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        height: DEFAULT_HEIGHT,
        minWidth: DEFAULT_MIN_WIDTH,
        selectors: {
          // setting border using pseudo-element here in order to prevent:
          // input and chevron buttons to overlap border under certain resolutions
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
            borderColor: SpinButtonRootBorderColor,
            borderRadius: effects.roundedCorner2,
          },
        },
      },
      (labelPosition === Position.top || labelPosition === Position.bottom) && {
        width: '100%',
      },
      !disabled && [
        {
          selectors: {
            ':hover': {
              selectors: {
                ':after': {
                  borderColor: SpinButtonRootBorderColorHovered,
                },
                [HighContrastSelector]: {
                  selectors: {
                    ':after': {
                      borderColor: 'Highlight',
                    },
                  },
                },
              },
            },
          },
        },
        isFocused && {
          selectors: {
            '&&': getInputFocusStyle(SpinButtonRootBorderColorFocused, effects.roundedCorner2),
          },
        },
      ],
      disabled && getDisabledStyles(theme),
    ],

    input: [
      'ms-spinButton-input',
      {
        boxSizing: 'border-box',
        boxShadow: 'none',
        borderStyle: 'none',
        flex: 1,
        margin: 0,
        fontSize: fonts.medium.fontSize,
        fontFamily: 'inherit',
        color: SpinButtonInputTextColor,
        backgroundColor: SpinButtonRootBackgroundColor,
        height: '100%',
        padding: '0 8px 0 9px',
        outline: 0,
        display: 'block',
        minWidth: DEFAULT_MIN_WIDTH - ARROW_BUTTON_WIDTH - 2,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        cursor: 'text',
        userSelect: 'text',
        borderRadius: `${effects.roundedCorner2} 0 0 ${effects.roundedCorner2}`,
      },
      !disabled && {
        selectors: {
          '::selection': {
            backgroundColor: SpinButtonInputBackgroundColorSelected,
            color: SpinButtonInputTextColorSelected,
            selectors: {
              [HighContrastSelector]: {
                backgroundColor: 'Highlight',
                borderColor: 'Highlight',
                color: 'HighlightText',
              },
            },
          },
        },
      },
      disabled && getDisabledStyles(theme),
    ],

    arrowButtonsContainer: [
      {
        display: 'block',
        height: '100%',
        cursor: 'default',
      },
      disabled && getDisabledStyles(theme),
    ],
  };
};
