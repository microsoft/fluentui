import { HighContrastSelector, AnimationVariables, normalize } from '../../Styling';
import { ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types';

export function getStyles(props: ISearchBoxStyleProps): ISearchBoxStyles {
  const { theme, underlined, disabled, hasFocus, className, hasInput, disableAnimation } = props;
  const { palette, fonts, semanticColors } = theme;

  return {
    root: [
      'ms-SearchBox',
      fonts.medium,
      normalize,
      {
        color: palette.neutralPrimary,
        backgroundColor: semanticColors.inputBackground,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        // The 1px top and bottom padding ensure the input field does not overlap the border
        padding: '1px 0 1px 4px',
        border: `1px solid ${palette.neutralTertiary}`,
        height: 32,
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          },
          ':hover': {
            borderColor: palette.neutralDark,
            selectors: {
              [HighContrastSelector]: {
                borderColor: 'Highlight'
              }
            }
          },
          ':hover $iconContainer': {
            color: palette.themeDark
          }
        }
      },
      hasFocus && [
        'is-active',
        {
          borderColor: palette.themePrimary,
          selectors: {
            ':hover': {
              borderColor: palette.themePrimary
            },
            [HighContrastSelector]: {
              borderColor: 'Highlight'
            }
          }
        }
      ],
      disabled && [
        'is-disabled',
        {
          borderColor: palette.neutralLighter,
          backgroundColor: palette.neutralLighter,
          pointerEvents: 'none',
          cursor: 'default'
        }
      ],
      underlined && [
        'is-underlined',
        {
          borderWidth: '0 0 1px 0',
          // Underlined SearchBox has a larger padding left to vertically align with the waffle in product
          padding: '1px 0 1px 8px'
        }
      ],
      underlined &&
        disabled && {
          backgroundColor: 'transparent'
        },
      hasInput && 'can-clear',
      className
    ],
    iconContainer: [
      'ms-SearchBox-iconContainer',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 16,
        width: 32,
        textAlign: 'center',
        color: palette.themePrimary,
        cursor: 'text'
      },
      hasFocus && {
        width: 4
      },
      disabled && {
        color: palette.neutralTertiary
      },
      !disableAnimation && {
        transition: `width ${AnimationVariables.durationValue1}`
      }
    ],
    icon: [
      'ms-SearchBox-icon',
      {
        opacity: 1
      },
      hasFocus && {
        opacity: 0
      },
      !disableAnimation && {
        transition: `opacity ${AnimationVariables.durationValue1} 0s`
      }
    ],
    clearButton: [
      'ms-SearchBox-clearButton',
      {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        cursor: 'pointer',
        flexBasis: '32px',
        flexShrink: 0,
        padding: 1,
        color: palette.themePrimary
      }
    ],
    field: [
      'ms-SearchBox-field',
      normalize,
      {
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        fontWeight: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: palette.neutralPrimary,
        flex: '1 1 0px',
        // The default implicit value of 'auto' prevents the input from shrinking. Setting min-width to
        // 0px allows the input element to shrink to fit the container.
        minWidth: '0px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // This padding forces the text placement to round up.
        paddingBottom: 0.5,
        // This removes the IE specific clear button in the input since we implimented our own
        selectors: {
          '::-ms-clear': {
            display: 'none'
          },
          '::placeholder': {
            color: semanticColors.inputPlaceholderText,
            opacity: 1
          },
          ':-ms-input-placeholder': {
            color: semanticColors.inputPlaceholderText
          }
        }
      },
      disabled && {
        color: palette.neutralTertiary
      }
    ]
  };
}
