import { HighContrastSelector, getFocusStyle } from '../../Styling';
import { IToggleStyleProps, IToggleStyles } from './Toggle.types';

export const getStyles = (props: IToggleStyleProps): IToggleStyles => {
  const { theme, className, disabled, checked } = props;
  const { semanticColors } = theme;
  const pillUncheckedBackground = semanticColors.bodyBackground;
  const pillCheckedBackground = semanticColors.inputBackgroundChecked;
  const pillCheckedHoveredBackground = semanticColors.inputBackgroundCheckedHovered;
  const pillCheckedDisabledBackground = semanticColors.disabledBodySubtext;
  const thumbBackground = semanticColors.inputBorderHovered;
  const thumbCheckedBackground = semanticColors.inputForegroundChecked;
  const thumbDisabledBackground = semanticColors.disabledBodySubtext;
  const thumbCheckedDisabledBackground = semanticColors.disabledBackground;
  const pillBorderColor = semanticColors.smallInputBorder;
  const pillBorderHoveredColor = semanticColors.inputBorderHovered;
  const pillBorderDisabledColor = semanticColors.disabledBodySubtext;
  const textDisabledColor = semanticColors.disabledText;

  return {
    root: [
      'ms-Toggle',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      theme.fonts.medium,
      {
        marginBottom: '8px'
      },
      className
    ],

    label: [
      'ms-Toggle-label',
      disabled && {
        color: textDisabledColor,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText'
          }
        }
      }
    ],

    container: [
      'ms-Toggle-innerContainer',
      {
        display: 'inline-flex',
        position: 'relative'
      }
    ],

    pill: [
      'ms-Toggle-background',
      getFocusStyle(theme, -3),
      {
        fontSize: '20px',
        boxSizing: 'border-box',
        width: '2.2em',
        height: '1em',
        borderRadius: '1em',
        transition: 'all 0.1s ease',
        borderWidth: '1px',
        borderStyle: 'solid',
        background: pillUncheckedBackground,
        borderColor: pillBorderColor,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '0 .2em'
      },
      !disabled && [
        !checked && {
          selectors: {
            ':hover': [
              {
                borderColor: pillBorderHoveredColor
              }
            ],
            ':hover .ms-Toggle-thumb': [
              {
                selectors: {
                  [HighContrastSelector]: {
                    borderColor: 'Highlight'
                  }
                }
              }
            ]
          }
        },
        checked && [
          {
            background: pillCheckedBackground,
            borderColor: 'transparent',
            justifyContent: 'flex-end'
          },
          {
            selectors: {
              ':hover': [
                {
                  backgroundColor: pillCheckedHoveredBackground,
                  borderColor: 'transparent',
                  selectors: {
                    [HighContrastSelector]: {
                      backgroundColor: 'Highlight'
                    }
                  }
                }
              ],
              [HighContrastSelector]: {
                backgroundColor: 'WindowText'
              }
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
            borderColor: 'transparent',
            justifyContent: 'flex-end'
          }
        ]
      ],
      !disabled && {
        selectors: {
          '&:hover': {
            selectors: {
              [HighContrastSelector]: {
                borderColor: 'Highlight'
              }
            }
          }
        }
      }
    ],

    thumb: [
      'ms-Toggle-thumb',
      {
        width: '.5em',
        height: '.5em',
        borderRadius: '.5em',
        transition: 'all 0.1s ease',
        backgroundColor: thumbBackground,
        /* Border is added to handle high contrast mode for Firefox */
        borderColor: 'transparent',
        borderWidth: '.28em',
        borderStyle: 'solid',
        boxSizing: 'border-box'
      },
      !disabled &&
        checked && [
          {
            backgroundColor: thumbCheckedBackground,
            selectors: {
              [HighContrastSelector]: {
                backgroundColor: 'Window',
                borderColor: 'Window'
              }
            }
          }
        ],
      disabled && [
        !checked && [
          {
            backgroundColor: thumbDisabledBackground
          }
        ],
        checked && [
          {
            backgroundColor: thumbCheckedDisabledBackground
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
            userSelect: 'none'
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
              }
            }
          }
        }
      }
    ]
  };
};
