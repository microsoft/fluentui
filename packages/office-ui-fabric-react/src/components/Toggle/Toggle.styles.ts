import {
  ITheme,
  IStyle,
  HighContrastSelector,
  getFocusStyle
} from '../../Styling';
import {
  IToggleStyleProps,
  IToggleStyles
} from './Toggle.types';

export const getStyles = (props: IToggleStyleProps): IToggleStyles => {
  const {
    theme,
    className,
    disabled,
    checked
  } = props;
  const { semanticColors } = theme;
  const pillUncheckedBackground = semanticColors.bodyBackground;
  const pillCheckedBackground = semanticColors.inputBackgroundChecked;
  const pillCheckedHoveredBackground = semanticColors.inputBackgroundCheckedHovered;
  const pillCheckedDisabledBackground = semanticColors.disabledText;
  const thumbBackground = semanticColors.inputBorderHovered;
  const thumbCheckedBackground = semanticColors.inputForegroundChecked;
  const thumbDisabledBackground = semanticColors.disabledText;
  const thumbCheckedDisabledBackground = semanticColors.disabledBackground;
  const pillBorderColor = semanticColors.inputBorder;
  const pillBorderHoveredColor = semanticColors.inputBorderHovered;
  const pillBorderDisabledColor = semanticColors.disabledText;
  const textDisabledColor = semanticColors.disabledBodyText;

  return {
    root: [
      'ms-Toggle',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      className,
      {
        marginBottom: '8px'
      }
    ],

    label: [
      'ms-Toggle-label',
      disabled && {
        color: textDisabledColor,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText'
          },
        }
      }
    ],

    container: [
      'ms-Toggle-innerContainer',
      {
        display: 'inline-flex',
        position: 'relative',
      }
    ],

    pill: [
      'ms-Toggle-background',
      getFocusStyle(theme, -3),
      {
        fontSize: '20px',
        lineHeight: '1em',
        boxSizing: 'border-box',
        position: 'relative',
        width: '2.2em',
        height: '1em',
        borderRadius: '1em',
        transition: 'all 0.1s ease',
        borderWidth: '1px',
        borderStyle: 'solid',
        background: pillUncheckedBackground,
        borderColor: pillBorderColor,
        cursor: 'pointer',
      },
      !disabled && [
        !checked && {
          selectors: {
            ':hover': [
              {
                borderColor: pillBorderHoveredColor
              }
            ]
          }
        },
        checked && [
          {
            background: pillCheckedBackground,
            borderColor: 'transparent',
          },
          {
            selectors: {
              ':hover': [
                {
                  backgroundColor: pillCheckedHoveredBackground,
                  borderColor: 'transparent'
                }
              ]
            }
          }
        ]
      ],
      disabled && [
        {
          cursor: 'default'
        },
        !checked && [
          {
            borderColor: pillBorderDisabledColor
          }
        ],
        checked && [
          {
            backgroundColor: pillCheckedDisabledBackground,
            borderColor: 'transparent'
          }
        ],
      ]
    ],

    thumb: [
      'ms-Toggle-thumb',
      {
        width: '.5em',
        height: '.5em',
        borderRadius: '.5em',
        position: 'absolute',
        top: '.2em',
        transition: 'all 0.1s ease',
        backgroundColor: thumbBackground,
        /* Border is added to handle high contrast mode for Firefox */
        borderColor: 'transparent',
        borderWidth: '.27em',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        left: '.2em'
      },
      !disabled && checked && [
        {
          backgroundColor: thumbCheckedBackground,
          left: '1.4em'
        }
      ],
      disabled && [
        !checked && [
          {
            backgroundColor: thumbDisabledBackground,
            left: '.2em',
          }
        ],
        checked && [
          {
            backgroundColor: thumbCheckedDisabledBackground,
            left: '1.4em'
          }
        ]
      ]
    ],

    text: [
      'ms-Toggle-stateText',
      {
        selectors: {
          // Workaround: make rules more sepecific than Label rules.
          '&&': {
            padding: '0',
            margin: '0 10px',
            userSelect: 'none',
          }
        }
      },
      disabled && {
        selectors: {
          '&&': {
            color: textDisabledColor,
            selectors: {
              [HighContrastSelector]: {
                color: 'GrayText'
              },
            }
          }
        }
      }
    ]
  };
};
