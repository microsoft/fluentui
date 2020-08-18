import {
  IStyle,
  ISemanticColors,
  HighContrastSelector,
  ScreenWidthMaxSmall,
  getScreenSelector,
  getGlobalClassNames,
  getFocusStyle,
  IconFontSizes,
} from '../../Styling';
import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';

const GlobalClassNames = {
  root: 'ms-MessageBar',
  error: 'ms-MessageBar--error',
  blocked: 'ms-MessageBar--blocked',
  severeWarning: 'ms-MessageBar--severeWarning',
  success: 'ms-MessageBar--success',
  warning: 'ms-MessageBar--warning',
  multiline: 'ms-MessageBar-multiline',
  singleline: 'ms-MessageBar-singleline',
  dismissalSingleLine: 'ms-MessageBar-dismissalSingleLine',
  expandingSingleLine: 'ms-MessageBar-expandingSingleLine',
  content: 'ms-MessageBar-content',
  iconContainer: 'ms-MessageBar-icon',
  text: 'ms-MessageBar-text',
  innerText: 'ms-MessageBar-innerText',
  dismissSingleLine: 'ms-MessageBar-dismissSingleLine',
  expandSingleLine: 'ms-MessageBar-expandSingleLine',
  dismissal: 'ms-MessageBar-dismissal',
  expand: 'ms-MessageBar-expand',
  actions: 'ms-MessageBar-actions',
  actionsSingleline: 'ms-MessageBar-actionsSingleLine',
};

const backgroundColor: { [key: string]: keyof ISemanticColors } = {
  [MessageBarType.error]: 'errorBackground',
  [MessageBarType.blocked]: 'errorBackground',
  [MessageBarType.success]: 'successBackground',
  [MessageBarType.warning]: 'warningBackground',
  [MessageBarType.severeWarning]: 'severeWarningBackground',
  [MessageBarType.info]: 'infoBackground',
};

const highContrastBackgroundColor: { [key: string]: string } = {
  [MessageBarType.error]: 'rgba(255, 0, 0, 0.3)',
  [MessageBarType.blocked]: 'rgba(255, 0, 0, 0.3)',
  [MessageBarType.success]: 'rgba(48, 241, 73, 0.3)',
  [MessageBarType.warning]: 'rgba(255, 254, 57, 0.3)',
  [MessageBarType.severeWarning]: 'rgba(255, 0, 0, 0.3)',
  [MessageBarType.info]: 'Window',
};

const iconColor: { [key: string]: keyof ISemanticColors } = {
  [MessageBarType.error]: 'errorIcon',
  [MessageBarType.blocked]: 'errorIcon',
  [MessageBarType.success]: 'successIcon',
  [MessageBarType.warning]: 'warningIcon',
  [MessageBarType.severeWarning]: 'severeWarningIcon',
  [MessageBarType.info]: 'infoIcon',
};

export const getStyles = (props: IMessageBarStyleProps): IMessageBarStyles => {
  const {
    theme,
    className,
    onDismiss,
    truncated,
    isMultiline,
    expandSingleLine,
    messageBarType = MessageBarType.info,
  } = props;
  const { semanticColors, fonts } = theme;

  const SmallScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const dismissalAndExpandIconStyle: IStyle = {
    fontSize: IconFontSizes.xSmall,
    height: 10,
    lineHeight: '10px',
    color: semanticColors.messageText,
    selectors: {
      [HighContrastSelector]: {
        MsHighContrastAdjust: 'none',
        color: 'WindowText',
      },
    },
  };

  const dismissalAndExpandStyle: IStyle = [
    getFocusStyle(theme, {
      inset: 1,
      highContrastStyle: {
        outlineOffset: '-6px',
        outline: '1px solid Highlight',
      },
      borderColor: 'transparent',
    }),
    {
      flexShrink: 0,
      width: 32,
      height: 32,
      padding: '8px 12px',
      selectors: {
        '& .ms-Button-icon': dismissalAndExpandIconStyle,
        ':hover': {
          backgroundColor: 'transparent',
        },
        ':active': {
          backgroundColor: 'transparent',
        },
      },
    },
  ];

  return {
    root: [
      classNames.root,
      fonts.medium,
      messageBarType === MessageBarType.error && classNames.error,
      messageBarType === MessageBarType.blocked && classNames.blocked,
      messageBarType === MessageBarType.severeWarning && classNames.severeWarning,
      messageBarType === MessageBarType.success && classNames.success,
      messageBarType === MessageBarType.warning && classNames.warning,
      isMultiline ? classNames.multiline : classNames.singleline,
      !isMultiline && onDismiss && classNames.dismissalSingleLine,
      !isMultiline && truncated && classNames.expandingSingleLine,
      {
        background: semanticColors[backgroundColor[messageBarType]],
        color: semanticColors.messageText,
        minHeight: 32,
        width: '100%',
        display: 'flex',
        wordBreak: 'break-word',
        selectors: {
          '.ms-Link': {
            color: semanticColors.messageLink,
            selectors: {
              ':hover': {
                color: semanticColors.messageLinkHovered,
              },
            },
          },
          [HighContrastSelector]: {
            MsHighContrastAdjust: 'none',
            background: highContrastBackgroundColor[messageBarType],
            border: '1px solid WindowText',
            color: 'WindowText',
          },
        },
      },
      isMultiline && {
        flexDirection: 'column',
      },
      className,
    ],
    content: [
      classNames.content,
      {
        display: 'flex',
        width: '100%',
        lineHeight: 'normal',
      },
    ],
    iconContainer: [
      classNames.iconContainer,
      {
        fontSize: IconFontSizes.medium,
        minWidth: 16,
        minHeight: 16,
        display: 'flex',
        flexShrink: 0,
        margin: '8px 0 8px 12px',
      },
    ],
    icon: {
      color: semanticColors[iconColor[messageBarType]],
      selectors: {
        [HighContrastSelector]: {
          MsHighContrastAdjust: 'none',
          color: 'WindowText',
        },
      },
    },
    text: [
      classNames.text,
      {
        minWidth: 0,
        display: 'flex',
        flexGrow: 1,
        margin: 8,
        ...fonts.small,
        selectors: {
          [HighContrastSelector]: {
            MsHighContrastAdjust: 'none',
            color: 'WindowText',
          },
        },
      },
      !onDismiss && {
        marginRight: 12,
      },
    ],
    innerText: [
      classNames.innerText,
      {
        lineHeight: 16,
        selectors: {
          '& span a': {
            paddingLeft: 4,
          },
        },
      },
      truncated && {
        overflow: 'visible',
        whiteSpace: 'pre-wrap',
      },
      !isMultiline && {
        // In high contrast this causes the top and bottom of links' focus outline to be clipped
        // (not sure of a good way around that while still maintaining text clipping)
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      !isMultiline &&
        !truncated && {
          selectors: {
            [SmallScreenSelector]: {
              overflow: 'visible',
              whiteSpace: 'pre-wrap',
            },
          },
        },
      expandSingleLine && {
        overflow: 'visible',
        whiteSpace: 'pre-wrap',
      },
    ],
    dismissSingleLine: classNames.dismissSingleLine,
    expandSingleLine: classNames.expandSingleLine,
    dismissal: [classNames.dismissal, dismissalAndExpandStyle],
    expand: [classNames.expand, dismissalAndExpandStyle],
    actions: [
      isMultiline ? classNames.actions : classNames.actionsSingleline,
      {
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        margin: '0 12px 0 8px',
        selectors: {
          '& button:nth-child(n+2)': {
            marginLeft: 8,
          },
        },
      },
      isMultiline && {
        marginBottom: 8,
      },
      onDismiss &&
        !isMultiline && {
          marginRight: 0,
        },
    ],
  };
};
