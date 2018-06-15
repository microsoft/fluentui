import { IStyle, HighContrastSelector, ScreenWidthMaxSmall, getScreenSelector, getFocusStyle } from '../../Styling';
import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';

export const getStyles = (props: IMessageBarStyleProps): IMessageBarStyles => {
  const { theme, className, messageBarType, onDismiss, actions, truncated, isMultiline, expandSingleLine } = props;
  const { semanticColors, palette, fonts } = theme;

  const SmallScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);

  const errorStyle = {
    background: semanticColors.errorBackground,
    selectors: {
      '& .icon': {
        color: semanticColors.errorText
      }
    }
  };

  const blockedStyle = {
    background: semanticColors.errorBackground,
    selectors: {
      '& .icon': {
        color: semanticColors.errorText
      }
    }
  };

  const severeWarningStyle = {
    background: semanticColors.blockingBackground,
    selectors: {
      '& .icon': {
        color: semanticColors.errorText
      }
    }
  };

  const successStyle = {
    background: semanticColors.successBackground,
    selectors: {
      '& .icon': {
        color: palette.green
      }
    }
  };

  const warningStyle = {
    background: semanticColors.warningBackground
  };

  const dismissalAndExpandStyle: IStyle = {
    flexShrink: 0,
    margin: 8,
    marginLeft: 0,
    selectors: {
      '& .ms-Button-icon': {
        fontSize: 12,
        height: 12,
        lineHeight: 12,
        color: palette.neutralPrimary
      },
      [SmallScreenSelector]: {
        margin: '0px 0px 0px 8px'
      },
      [HighContrastSelector]: {
        MsHighContrastAdjust: 'none'
      }
    }
  };

  return {
    root: [
      'ms-MessageBar',
      {
        background: palette.neutralLighter,
        color: palette.neutralPrimary,
        minHeight: 32,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        position: 'relative',
        wordBreak: 'break-word',
        selectors: {
          '& .ms-Link': {
            color: palette.themeDark,
            ...fonts.small
          }
        }
      },
      messageBarType === MessageBarType.error && errorStyle,
      messageBarType === MessageBarType.blocked && blockedStyle,
      messageBarType === MessageBarType.severeWarning && severeWarningStyle,
      messageBarType === MessageBarType.success && successStyle,
      messageBarType === MessageBarType.warning && warningStyle,
      isMultiline && {
        flexDirection: 'column'
      },
      !isMultiline && {
        selectors: {
          [SmallScreenSelector]: {
            flexDirection: 'column'
          }
        }
      },
      truncated && {
        flexDirection: 'column',
        selectors: {
          '& .ms-Button-icon': {
            fontSize: 12,
            height: 12,
            lineHeight: 12,
            color: palette.neutralPrimary
          }
        }
      },
      className
    ],
    content: [
      {
        display: 'flex',
        lineHeight: 'normal',
        width: '100%',
        boxSizing: 'border-box',
        selectors: {
          '&:before': {
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            top: 0,
            margin: 0,
            selectors: {
              [HighContrastSelector]: {
                border: '1px solid WindowText',
                content: ' '
              }
            }
          }
        }
      },
      !isMultiline && {
        selectors: {
          [SmallScreenSelector]: {
            flexDirection: 'row'
          }
        }
      },
      (truncated || isMultiline) && {
        flexDirection: 'row'
      }
    ],
    icon: [
      'icon',
      {
        fontSize: 16,
        minWidth: 16,
        minHeight: 16,
        display: 'flex',
        color: palette.neutralSecondary,
        flexShrink: 0,
        margin: 16,
        marginRight: 0,
        selectors: {
          [SmallScreenSelector]: {
            margin: '8px 0px 8px 8px'
          }
        }
      }
    ],
    text: [
      {
        minWidth: 0,
        display: 'flex',
        flexGrow: 1,
        margin: '16px 8px',
        ...fonts.small,
        selectors: {
          [SmallScreenSelector]: {
            margin: '8px 0px 8px 8px'
          }
        }
      },
      !onDismiss && {
        marginRight: 16,
        selectors: {
          [SmallScreenSelector]: {
            marginRight: 8
          }
        }
      },
      isMultiline &&
        actions && {
          marginBottom: 8,
          selectors: {
            [SmallScreenSelector]: {
              marginBottom: 0
            }
          }
        },
      !isMultiline &&
        actions && {
          selectors: {
            [SmallScreenSelector]: {
              marginBottom: 0
            }
          }
        }
    ],
    innerText: [
      {
        lineHeight: 16,
        selectors: {
          '& span': {
            selectors: {
              '& a': {
                paddingLeft: 4
              }
            }
          }
        }
      },
      truncated && {
        overflow: 'visible',
        whiteSpace: 'pre-wrap'
      },
      !isMultiline && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      !isMultiline &&
        !truncated && {
          selectors: {
            [SmallScreenSelector]: {
              overflow: 'visible',
              whiteSpace: 'pre-wrap'
            }
          }
        },
      expandSingleLine && {
        overflow: 'visible',
        whiteSpace: 'pre-wrap'
      }
    ],
    dismissal: ['ms-MessageBar-dismissal', dismissalAndExpandStyle, getFocusStyle(theme)],
    expand: ['ms-MessageBar-expand', dismissalAndExpandStyle, getFocusStyle(theme)],
    dismissSingleLine: [
      'ms-MessageBar-dismissSingleLine',
      {
        display: 'flex',
        selectors: {
          '& .icon': {
            fontSize: 12,
            height: 12,
            lineHeight: 12,
            color: palette.neutralSecondary
          }
        }
      }
    ],
    expandSingleLine: [
      'ms-MessageBar-expandSingleLine',
      {
        display: 'flex',
        selectors: {
          '& .icon': {
            fontSize: 12,
            height: 12,
            lineHeight: 12,
            color: palette.neutralSecondary
          }
        }
      }
    ],
    actions: [
      {
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        margin: '8px 8px 8px 0',
        selectors: {
          '& button:nth-child(n+2)': {
            marginLeft: 8
          }
        }
      },
      isMultiline && {
        margin: '12px 12px 12px 0',
        selectors: {
          '& button:nth-child(n+2)': {
            marginLeft: 12
          }
        }
      }
    ]
  };
};
