import { IToggleComponent, IToggleStylesReturnType, IToggleTokenReturnType } from './Toggle.types';
import { getFocusStyle, getGlobalClassNames, HighContrastSelector, IStyle } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Toggle',
  label: 'ms-Toggle-label',
  container: 'ms-Toggle-innerContainer',
  pill: 'ms-Toggle-background',
  thumb: 'ms-Toggle-thumb',
  text: 'ms-Toggle-stateText'
};

const toggleEnabledTokens: IToggleComponent['tokens'] = (props, theme): IToggleTokenReturnType => {
  const { semanticColors } = theme;
  return {
    pillBackground: semanticColors.bodyBackground,
    pillBorderColor: semanticColors.smallInputBorder,
    pillHoveredBorderColor: semanticColors.inputBorderHovered,
    pillHighContrastBorderColor: 'Highlight',
    pillHighContrastHoveredBorderColor: 'Highlight',

    thumbBackground: semanticColors.inputBorderHovered
  };
};

const toggleDisabledTokens: IToggleComponent['tokens'] = (props, theme): IToggleTokenReturnType => {
  const { semanticColors } = theme;
  return {
    pillBackground: semanticColors.bodyBackground,
    pillBorderColor: semanticColors.disabledBodySubtext,

    thumbBackground: semanticColors.disabledBodySubtext,

    textColor: semanticColors.disabledText,
    textHighContrastColor: 'GrayText'
  };
};

const toggleCheckedVariables: IToggleComponent['tokens'] = {
  pillBorderColor: 'transparent',
  pillJustifyContent: 'flex-end'
};

const toggleCheckedEnabledTokens: IToggleComponent['tokens'] = (props, theme): IToggleTokenReturnType => {
  const { semanticColors } = theme;
  return {
    pillBackground: semanticColors.inputBackgroundChecked,
    pillHoveredBackground: semanticColors.inputBackgroundCheckedHovered,
    pillHoveredBorderColor: 'transparent',
    pillHighContrastBackground: 'WindowText',
    pillHighContrastHoveredBackground: 'Highlight',
    pillHighContrastHoveredBorderColor: 'transparent',

    thumbBackground: semanticColors.inputForegroundChecked,
    thumbHighContrastBackground: 'Window',
    thumbHighContrastBorderColor: 'Window'
  };
};

const toggleCheckedDisabledTokens: IToggleComponent['tokens'] = (props, theme): IToggleTokenReturnType => {
  const { semanticColors } = theme;
  return {
    pillBackground: semanticColors.disabledBodySubtext,
    thumbBackground: semanticColors.disabledBackground
  };
};

export const ToggleTokens: IToggleComponent['tokens'] = (props): IToggleTokenReturnType => [
  props.checked && toggleCheckedVariables,
  props.disabled && [toggleDisabledTokens, props.checked && toggleCheckedDisabledTokens],
  !props.disabled && [toggleEnabledTokens, props.checked && toggleCheckedEnabledTokens]
];

export const ToggleStyles: IToggleComponent['styles'] = (props, theme, tokens): IToggleStylesReturnType => {
  const { className, disabled, checked } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const textStyles: IStyle = [
    classNames.text,
    {
      selectors: {
        // Workaround: make rules more sepecific than Label rules.
        '&&': {
          color: tokens.textColor,
          padding: '0',
          margin: '0 10px',
          userSelect: 'none',
          selectors: {
            [HighContrastSelector]: {
              color: tokens.textHighContrastColor
            }
          }
        }
      }
    }
  ];

  return {
    root: [
      classNames.root,
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
      classNames.label,
      {
        color: tokens.textColor,
        selectors: {
          [HighContrastSelector]: {
            color: tokens.textHighContrastColor
          }
        }
      }
    ],
    container: [
      classNames.container,
      {
        display: 'inline-flex',
        position: 'relative'
      }
    ],
    pill: [
      classNames.pill,
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
        background: tokens.pillBackground,
        borderColor: tokens.pillBorderColor,
        justifyContent: tokens.pillJustifyContent,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '0 .2em',
        selectors: {
          ':hover': [
            {
              backgroundColor: tokens.pillHoveredBackground,
              borderColor: tokens.pillHoveredBorderColor,
              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: tokens.pillHighContrastHoveredBackground
                }
              }
            }
          ],
          ':hover .ms-Toggle-thumb': [
            {
              selectors: {
                [HighContrastSelector]: {
                  borderColor: tokens.pillHighContrastHoveredBorderColor
                }
              }
            }
          ],
          [HighContrastSelector]: {
            backgroundColor: tokens.pillHighContrastBackground
          },
          '&:hover': {
            selectors: {
              [HighContrastSelector]: {
                borderColor: tokens.pillHighContrastBorderColor
              }
            }
          }
        }
      }
    ],
    thumb: [
      classNames.thumb,
      {
        width: '.5em',
        height: '.5em',
        borderRadius: '.5em',
        transition: 'all 0.1s ease',
        backgroundColor: tokens.thumbBackground,
        /* Border is added to handle high contrast mode for Firefox */
        borderColor: 'transparent',
        borderWidth: '.28em',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: tokens.thumbHighContrastBackground,
            borderColor: tokens.thumbHighContrastBorderColor
          }
        }
      }
    ],
    text: textStyles
  };
};
