import {
  IStyle,
  IPalette,
  ISemanticColors,
  HighContrastSelector,
  ScreenWidthMaxSmall,
  getScreenSelector,
  getFocusStyle
} from '../../Styling';
import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';

// Returns the background color of the MessageBar root element based on the type of MessageBar.
const getRootBackground = (messageBarType: MessageBarType | undefined, palette: IPalette, semanticColors: ISemanticColors): string => {
  switch (messageBarType) {
    case MessageBarType.error:
    case MessageBarType.blocked:
      return semanticColors.errorBackground;
    case MessageBarType.severeWarning:
      return semanticColors.blockingBackground;
    case MessageBarType.success:
      return semanticColors.successBackground;
    case MessageBarType.warning:
      return semanticColors.warningBackground;
  }
  return palette.neutralLighter;
};

// Returns the icon color based on the type of MessageBar.
const getIconColor = (messageBarType: MessageBarType | undefined, palette: IPalette, semanticColors: ISemanticColors): string => {
  switch (messageBarType) {
    case MessageBarType.error:
    case MessageBarType.blocked:
    case MessageBarType.severeWarning:
      return semanticColors.errorText;
    case MessageBarType.success:
      return palette.green;
    case MessageBarType.warning:
      return semanticColors.warningText;
  }
  return palette.neutralSecondary;
};

export const getStyles = (props: IMessageBarStyleProps): IMessageBarStyles => {
  const { theme, className, messageBarType, onDismiss, actions, truncated, isMultiline, expandSingleLine } = props;
  const { semanticColors, palette, fonts } = theme;

  const SmallScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);

  const dismissalAndExpandIconStyle: IStyle = {
    fontSize: 12,
    height: 12,
    lineHeight: '12px',
    color: palette.neutralPrimary
  };

  const dismissalAndExpandStyle: IStyle = {
    flexShrink: 0,
    margin: 8,
    marginLeft: 0,
    selectors: {
      '& .ms-Button-icon': dismissalAndExpandIconStyle,
      [SmallScreenSelector]: {
        margin: '0px 0px 0px 8px'
      },
      [HighContrastSelector]: {
        MsHighContrastAdjust: 'none'
      }
    }
  };

  const dismissalAndExpandSingleLineStyle: IStyle = {
    display: 'flex',
    selectors: {
      '& .ms-Button-icon': dismissalAndExpandIconStyle
    }
  };

  const focusStyle = getFocusStyle(theme, 0, 'relative', undefined, palette.black);

  return {
    root: [
      'ms-MessageBar',
      {
        background: getRootBackground(messageBarType, palette, semanticColors),
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
      'ms-MessageBar-content',
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
    iconContainer: [
      'ms-MessageBar-icon',
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
    icon: {
      color: getIconColor(messageBarType, palette, semanticColors)
    },
    text: [
      'ms-MessageBar-Text',
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
    dismissal: ['ms-MessageBar-dismissal', dismissalAndExpandStyle, focusStyle],
    expand: ['ms-MessageBar-expand', dismissalAndExpandStyle, focusStyle],
    dismissSingleLine: ['ms-MessageBar-dismissSingleLine', dismissalAndExpandSingleLineStyle],
    expandSingleLine: ['ms-MessageBar-expandSingleLine', dismissalAndExpandSingleLineStyle],
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
        margin: '0px 12px 12px 0',
        selectors: {
          '& button:nth-child(n+2)': {
            marginLeft: 12
          }
        }
      }
    ]
  };
};