import { IToggleComponent, IToggleStyles, IToggleStyleVariablesTypes, IToggleStyleVariables, IToggleViewProps } from './Toggle.types';
import { getFocusStyle, getGlobalClassNames, HighContrastSelector, concatStyleSets } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Toggle',
  label: 'ms-Toggle-label',
  container: 'ms-Toggle-innerContainer',
  pill: 'ms-Toggle-background',
  thumb: 'ms-Toggle-thumb',
  text: 'ms-Toggle-stateText'
};

export const ToggleStyles: IToggleComponent['styles'] = props => {
  const { theme, className, disabled, checked, styleVariables } = props;
  const { semanticColors } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const toggleBaseStateVariables: IToggleStyleVariablesTypes = {};

  const toggleEnabledVariables: IToggleStyleVariablesTypes = {
    pillBackground: semanticColors.bodyBackground,
    pillBorderColor: semanticColors.smallInputBorder,
    pillHoveredBorderColor: semanticColors.inputBorderHovered,
    pillHighContrastBorderColor: 'Highlight',
    pillHighContrastHoveredBorderColor: 'Highlight',

    thumbBackground: semanticColors.inputBorderHovered
  };

  const toggleDisabledVariables: IToggleStyleVariablesTypes = {
    pillBackground: semanticColors.bodyBackground,
    pillBorderColor: semanticColors.disabledBodySubtext,

    thumbBackground: semanticColors.disabledBodySubtext,

    textColor: semanticColors.disabledText,
    textHighContrastColor: 'GrayText'
  };

  const toggleCheckedVariables: IToggleStyleVariablesTypes = {
    pillBorderColor: 'transparent',
    pillJustifyContent: 'flex-end'
  };

  const toggleCheckedEnabledVariables: IToggleStyleVariablesTypes = {
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

  const toggleCheckedDisabledVariables: IToggleStyleVariablesTypes = {
    pillBackground: semanticColors.disabledBodySubtext,

    thumbBackground: semanticColors.disabledBackground
  };

  function getToggleStylesFromState(state: IToggleStyleVariablesTypes): Partial<IToggleStyles> {
    if (state) {
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
            color: state.textColor,
            selectors: {
              [HighContrastSelector]: {
                color: state.textHighContrastColor
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
            background: state.pillBackground,
            borderColor: state.pillBorderColor,
            justifyContent: state.pillJustifyContent,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '0 .2em',
            selectors: {
              ':hover': [
                {
                  backgroundColor: state.pillHoveredBackground,
                  borderColor: state.pillHoveredBorderColor,
                  selectors: {
                    [HighContrastSelector]: {
                      backgroundColor: state.pillHighContrastHoveredBackground
                    }
                  }
                }
              ],
              ':hover .ms-Toggle-thumb': [
                {
                  selectors: {
                    [HighContrastSelector]: {
                      borderColor: state.pillHighContrastHoveredBorderColor
                    }
                  }
                }
              ],
              [HighContrastSelector]: {
                backgroundColor: state.pillHighContrastBackground
              },
              '&:hover': {
                selectors: {
                  [HighContrastSelector]: {
                    borderColor: state.pillHighContrastBorderColor
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
            backgroundColor: state.thumbBackground,
            /* Border is added to handle high contrast mode for Firefox */
            borderColor: 'transparent',
            borderWidth: '.28em',
            borderStyle: 'solid',
            boxSizing: 'border-box',
            selectors: {
              [HighContrastSelector]: {
                backgroundColor: state.thumbHighContrastBackground,
                borderColor: state.thumbHighContrastBorderColor
              }
            }
          }
        ],

        text: [
          classNames.text,
          {
            selectors: {
              // Workaround: make rules more sepecific than Label rules.
              '&&': {
                color: state.textColor,
                padding: '0',
                margin: '0 10px',
                userSelect: 'none',
                selectors: {
                  [HighContrastSelector]: {
                    color: state.textHighContrastColor
                  }
                }
              }
            }
          }
        ]
      };
    }

    // No state
    return {};
  }

  function getToggleViewStyleVariables(viewProps: IToggleViewProps): IToggleStyleVariablesTypes {
    let toggleVariables: IToggleStyleVariablesTypes = toggleBaseStateVariables;

    toggleVariables = {
      ...toggleVariables,
      ...(viewProps.checked ? toggleCheckedVariables : {}),
      ...(viewProps.disabled
        ? { ...toggleDisabledVariables, ...(viewProps.checked ? toggleCheckedDisabledVariables : {}) }
        : { ...toggleEnabledVariables, ...(viewProps.checked ? toggleCheckedEnabledVariables : {}) })
    };

    return toggleVariables;
  }

  function getToggleStyles(userStyleVariables: IToggleStyleVariables): Partial<IToggleStyles> {
    let toggleVariables: IToggleStyleVariablesTypes;

    toggleVariables = getToggleViewStyleVariables(props);

    if (typeof userStyleVariables === 'function') {
      toggleVariables = { ...toggleVariables, ...userStyleVariables(props) };
    } else if (userStyleVariables !== undefined) {
      toggleVariables = { ...toggleVariables, ...userStyleVariables };
    }

    return getToggleStylesFromState(toggleVariables);
  }

  return concatStyleSets(getToggleStyles(styleVariables), { root: className });
};
