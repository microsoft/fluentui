import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';

export const getStyles = (props: IMessageBarStyleProps): IMessageBarStyles => {
  const { theme, className, messageBarType } = props;
  const { palette, fonts } = theme;

  const errorStyles = {
    background: '#fde7e9',
    selectors: {
      '& i': {
        color: palette.redDark
      }
    }
  };

  const blockedStyles = {
    background: '#fde7e9',
    selectors: {
      '& i': {
        color: palette.redDark
      }
    }
  };

  const severeWarningStyles = {
    background: '#fed9cc',
    selectors: {
      '& i': {
        color: palette.redDark
      }
    }
  };

  const successStyles = {
    background: '#dff6dd',
    selectors: {
      '& i': {
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
        minHeight: '32px',
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
      {
        fontSize: '16px',
        minWidth: '16px',
        minHeight: '16px',
        display: 'flex',
        color: palette.neutralSecondary,
        flexShrink: 0,
        margin: '16px',
        marginRight: '0px'
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
        lineHeight: '16px',
        selectors: {
          '& span': {
            selectors: {
              '& a': {
                paddingLeft: '4px'
              }
            }
          }
        }
      }
    ],
    dismissal: [
      {
        flexShrink: 0,
        margin: '8px',
        marginLeft: '0px',
        selectors: {
          '& i': {
            fontSize: '12px',
            height: '12px',
            lineHeight: '12px',
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
          '& i': {
            fontSize: '12px',
            height: '12px',
            lineHeight: '12px',
            color: palette.neutralSecondary
          }
        }
      }
    ]
  };
};