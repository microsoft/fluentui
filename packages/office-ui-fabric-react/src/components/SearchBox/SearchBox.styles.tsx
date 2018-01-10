import {
  FontSizes,
  HighContrastSelector,
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall,
  AnimationVariables,
  normalize
} from '../../Styling';
import { SearchBoxBase } from './SearchBox.base';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types';

export function getStyles(props: ISearchBoxStyleProps): ISearchBoxStyles {
  const { theme, underlined, disabled, hasFocus, className, hasInput } = props;
  const { palette, fonts } = theme;

  return {
    root: [
      'ms-SearchBox',
      fonts.medium,
      normalize,
      {
        color: palette.neutralPrimary,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        padding: '0 0 0 8px',
        border: `1px solid ${palette.neutralTertiary}`,
        height: 32,
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          },
          ':hover': {
            borderColor: palette.neutralDark,
            $label: {
              color: palette.black,
              $iconContainer: {
                color: palette.themeDark
              }
            }
          }
        }
      },
      hasFocus && [
        'is-active',
        {
          borderColor: palette.themePrimary,
          selectors: {
            ':hover': {
              borderColor: palette.themePrimary,
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
          cursor: 'default',
        }
      ],
      underlined && [
        'is-underlined',
        {
          borderWidth: '0 0 1px 0'
        }
      ],
      underlined && disabled && {
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
        transition: `width ${AnimationVariables.durationValue1}`,
        color: palette.themePrimary
      },
      hasFocus && {
        width: 4,
        transition: `width  ${AnimationVariables.durationValue1}`
      },
      disabled && {
        color: palette.neutralTertiary
      }
    ],
    icon: [
      'ms-SearchBox-icon',
      {
        opacity: 1,
        transition: `opacity ${AnimationVariables.durationValue1} 0s`
      },
      hasFocus && {
        opacity: 0,
        transition: `opacity 0 ${AnimationVariables.durationValue1}`
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
        color: palette.themePrimary,
      }
    ],
    field: [
      'ms-SearchBox-field',
      normalize,
      {
        border: 'none',
        outline: 'none',
        fontWeight: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: palette.neutralPrimary,
        backgroundColor: 'transparent',
        flex: '1 1 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // This padding forces the text placement to round up.
        paddingBottom: 0.5,
        // This removes the IE specific clear button in the input since we implimented our own
        selectors: {
          '::-ms-clear': {
            display: 'none'
          }
        }
      },
      disabled && {
        color: palette.neutralTertiary
      }
    ]
  };
}