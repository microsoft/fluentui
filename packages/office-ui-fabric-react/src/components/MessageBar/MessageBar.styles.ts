import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';

export const getStyles = (props: IMessageBarStyleProps): IMessageBarStyles => {
  const { theme, className, messageBarType } = props;
  const { palette, fonts } = theme;

  const errorStyles = {
    background: 'rgba(232,17,35,.2)',
    selectors: {
      '& .icon': {
        color: palette.redDark
      }
    }
  };

  const blockedStyles = {
    background: 'rgba(232,17,35,.2)',
    selectors: {
      '& .icon': {
        color: palette.redDark
      }
    }
  };

  const severeWarningStyles = {
    background: '#fed9cc',
    selectors: {
      '& .icon': {
        color: palette.redDark
      }
    }
  };

  const successStyles = {
    background: '#dff6dd',
    selectors: {
      '& .icon': {
        color: palette.green
      }
    }
  };

  const warningStyles = {
    background: '#fff4ce'
  };

  return {
    root: [
      className,
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
      messageBarType === MessageBarType.error && errorStyles,
      messageBarType === MessageBarType.blocked && blockedStyles,
      messageBarType === MessageBarType.severeWarning && severeWarningStyles,
      messageBarType === MessageBarType.success && successStyles,
      messageBarType === MessageBarType.warning && warningStyles
    ],
    content: [
      {
        display: 'flex',
        lineHeight: 'normal',
        width: '100%',
        boxSizing: 'border-box'
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
        marginRight: 0
      }
    ],
    text: [
      {
        minWidth: 0,
        display: 'flex',
        flexGrow: 1,
        margin: '16px 8px',
        ...fonts.small
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
      }
    ],
    dismissal: [
      {
        flexShrink: 0,
        margin: 8,
        marginLeft: 0,
        selectors: {
          '& .icon': {
            fontSize: 12,
            height: 12,
            lineHeight: 12,
            color: palette.neutralSecondary
          },
          '&::-moz-focus-inner': {
            border: 0
          },
          '&': {
            outline: 'transparent',
            position: 'relative'
          },
          // trying to replicate the focus-border mixin - not working
          '& .ms-Fabric--isFocusVisible &:focus:after': {
            content: '',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            pointerEvents: 'none',
            border: `1px solid ${palette.neutralSecondary}`
          },
          ':global(.ms-Fabric--isFocusVisible) &:focus': {
            border: '1px solid red'
          }
        }
      }
    ],
    dismissSingleLine: [
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
    ]
  };
};
