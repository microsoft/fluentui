import { IButtonStyles } from '../Button.types';
import { HighContrastSelector, ITheme, concatStyleSets, getFocusStyle, IStyle } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

const buttonHighContrastFocus: IStyle = {
  left: -2,
  top: -2,
  bottom: -2,
  right: -2,
  border: 'none'
};

const splitButtonContainer: IStyle = {
  display: 'inline-flex',
  selectors: {
    '.ms-Button--default': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: 'none'
    },
    '.ms-Button--primary': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      border: 'none',

      selectors: {
        [HighContrastSelector]: {
          border: 'none',
          color: 'Window',
          backgroundColor: 'WindowText',
          MsHighContrastAdjust: 'none'
        }
      }
    },
    '.ms-Button--primary + .ms-Button': {
      border: 'none'
    }
  }
};

const splitButtonDivider: IStyle = {
  position: 'absolute',
  width: 1,
  right: 31,
  top: 8,
  bottom: 8
};

const splitButtonContainerHovered: IStyle = {
  selectors: {
    '.ms-Button--primary': {
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'Highlight'
        }
      }
    },
    '.ms-Button.is-disabled': {
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window'
        }
      }
    }
  }
};

const splitButtonContainerChecked: IStyle = {
  selectors: {
    '.ms-Button--primary': {
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          MsHighContrastAdjust: 'none'
        }
      }
    }
  }
};

const splitButtonContainerCheckedHovered: IStyle = {
  selectors: {
    '.ms-Button--primary': {
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          MsHighContrastAdjust: 'none'
        }
      }
    }
  }
};

const splitButtonMenuButton: IStyle = {
  padding: 6,
  height: 'auto',
  boxSizing: 'border-box',
  borderRadius: 0,
  // borderLeft: 'none', add this here make border come back
  outline: 'transparent',
  userSelect: 'none',
  display: 'inline-block',
  textDecoration: 'none',
  textAlign: 'center',
  cursor: 'pointer',
  verticalAlign: 'top',
  width: 32,
  marginLeft: -1,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0
};

const splitButtonContainerFocused: IStyle = {
  outline: 'none!important'
};

const splitButtonMenuButtonDisabled: IStyle = {
  pointerEvents: 'none',
  border: 'none',
  selectors: {
    ':hover': {
      cursor: 'default'
    },

    '.ms-Button--primary': {
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window'
        }
      }
    }
  }
};

const splitButtonFlexContainer: IStyle = {
  display: 'flex',
  height: '100%',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center'
};

const splitButtonContainerDisabled: IStyle = {
  outline: 'none',
  border: 'none',
  selectors: {
    [HighContrastSelector]: {
      color: 'GrayText',
      borderColor: 'GrayText',
      backgroundColor: 'Window'
    }
  }
};

export const getStandardSplitButtonStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
    const { effects, palette: p, semanticColors: s } = theme;

    const standardSplitStyles: IButtonStyles = {
      splitButtonContainer: [getFocusStyle(theme, { highContrastStyle: buttonHighContrastFocus, inset: 2 }), { ...splitButtonContainer }],
      splitButtonContainerHovered: splitButtonContainerHovered,
      splitButtonContainerChecked: splitButtonContainerChecked,
      splitButtonContainerCheckedHovered: splitButtonContainerCheckedHovered,
      splitButtonContainerFocused: splitButtonContainerFocused,

      splitButtonMenuButton: {
        ...splitButtonMenuButton,
        color: p.white,
        backgroundColor: 'transparent',
        borderTopRightRadius: effects.roundedCorner2,
        borderBottomRightRadius: effects.roundedCorner2,
        border: `1px solid ${p.neutralSecondaryAlt}`,
        borderLeft: 'none',
        selectors: {
          ':hover': {
            backgroundColor: p.neutralLight,
            selectors: {
              [HighContrastSelector]: {
                color: 'Highlight'
              }
            }
          }
        }
      },
      splitButtonDivider: {
        ...splitButtonDivider,
        backgroundColor: p.neutralTertiaryAlt,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText'
          }
        }
      },
      splitButtonDividerDisabled: {
        ...splitButtonDivider,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'GrayText'
          }
        }
      },

      splitButtonMenuButtonChecked: {
        backgroundColor: p.neutralQuaternaryAlt,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralQuaternaryAlt
          }
        }
      },

      splitButtonMenuButtonExpanded: {
        backgroundColor: p.neutralQuaternaryAlt,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralQuaternaryAlt
          }
        }
      },

      splitButtonMenuButtonDisabled: {
        ...splitButtonMenuButtonDisabled,
        backgroundColor: s.buttonBackgroundDisabled,
        selectors: {
          ':hover': {
            backgroundColor: s.buttonBackgroundDisabled
          },
          [HighContrastSelector]: {
            border: `1px solid GrayText`,
            borderLeft: 'none',
            color: 'GrayText',
            backgroundColor: 'Window'
          }
        }
      },

      splitButtonFlexContainer: splitButtonFlexContainer,

      splitButtonContainerDisabled: splitButtonContainerDisabled,

      splitButtonMenuIcon: {
        color: s.buttonText
      },

      splitButtonMenuIconDisabled: {
        color: s.buttonTextDisabled
      }
    };
    return concatStyleSets(standardSplitStyles, customStyles)!;
  }
);

export const getPrimarySplitButtonStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
    const { effects, palette: p, semanticColors: s } = theme;

    const primarySplitStyles: IButtonStyles = {
      splitButtonContainer: [getFocusStyle(theme, { highContrastStyle: buttonHighContrastFocus, inset: 2 }), { ...splitButtonContainer }],
      splitButtonContainerChecked: splitButtonContainerChecked,
      splitButtonContainerHovered: splitButtonContainerHovered,
      splitButtonContainerCheckedHovered: splitButtonContainerCheckedHovered,
      splitButtonContainerFocused: splitButtonContainerFocused,

      splitButtonDivider: {
        ...splitButtonDivider,
        backgroundColor: s.primaryButtonText,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Window'
          }
        }
      },

      splitButtonMenuButton: {
        ...splitButtonMenuButton,
        color: s.primaryButtonText,
        backgroundColor: s.primaryButtonBackground,
        borderTopRightRadius: effects.roundedCorner2,
        borderBottomRightRadius: effects.roundedCorner2,
        border: `1px solid ${p.neutralSecondaryAlt}`,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText'
          },
          ':hover': {
            backgroundColor: s.primaryButtonBackgroundHovered,
            selectors: {
              [HighContrastSelector]: {
                color: 'Highlight'
              }
            }
          }
        }
      },

      splitButtonFlexContainer: splitButtonFlexContainer,

      splitButtonContainerDisabled: splitButtonContainerDisabled,

      splitButtonMenuButtonDisabled: {
        ...splitButtonMenuButtonDisabled,
        backgroundColor: s.primaryButtonBackgroundDisabled,
        selectors: {
          ':hover': {
            backgroundColor: s.primaryButtonBackgroundDisabled
          }
        }
      },

      splitButtonMenuButtonChecked: {
        backgroundColor: s.primaryButtonBackgroundPressed,
        selectors: {
          ':hover': {
            backgroundColor: s.primaryButtonBackgroundPressed
          }
        }
      },

      splitButtonMenuButtonExpanded: {
        backgroundColor: s.primaryButtonBackgroundPressed,
        selectors: {
          ':hover': {
            backgroundColor: s.primaryButtonBackgroundPressed
          }
        }
      },

      splitButtonMenuIcon: {
        color: s.primaryButtonText
      },

      splitButtonMenuIconDisabled: {
        color: p.neutralTertiary,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText'
          }
        }
      }
    };
    return concatStyleSets(primarySplitStyles, customStyles)!;
  }
);
