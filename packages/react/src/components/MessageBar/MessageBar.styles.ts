import {
  HighContrastSelector,
  HighContrastSelectorWhite,
  ScreenWidthMaxSmall,
  getScreenSelector,
  getGlobalClassNames,
  getFocusStyle,
  IconFontSizes,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import { MessageBarType } from './MessageBar.types';
import type { IStyle, ISemanticColors } from '../../Styling';
import type { IMessageBarStyleProps, IMessageBarStyles } from './MessageBar.types';

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

const iconColor: { [key: string]: keyof ISemanticColors } = {
  [MessageBarType.error]: 'errorIcon',
  [MessageBarType.blocked]: 'errorIcon',
  [MessageBarType.success]: 'successIcon',
  [MessageBarType.warning]: 'warningIcon',
  [MessageBarType.severeWarning]: 'severeWarningIcon',
  [MessageBarType.info]: 'infoIcon',
};

const highContrastBorderColor: { [key: string]: string } = {
  [MessageBarType.error]: '#ff0000',
  [MessageBarType.blocked]: '#ff0000',
  [MessageBarType.success]: '#bad80a',
  [MessageBarType.warning]: '#fff100',
  [MessageBarType.severeWarning]: '#ff0000',
  [MessageBarType.info]: 'WindowText',
};

const highContrastWhiteBorderColor: { [key: string]: string } = {
  [MessageBarType.error]: '#e81123',
  [MessageBarType.blocked]: '#e81123',
  [MessageBarType.success]: '#107c10',
  [MessageBarType.warning]: '#966400',
  [MessageBarType.severeWarning]: '#d83b01',
  [MessageBarType.info]: 'WindowText',
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
        ...getHighContrastNoAdjustStyle(),
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
        boxSizing: 'border-box',
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
            ...getHighContrastNoAdjustStyle(),
            background: 'transparent',
            border: `1px solid ${highContrastBorderColor[messageBarType]}`,
            color: 'WindowText',
          },
          [HighContrastSelectorWhite]: {
            border: `1px solid ${highContrastWhiteBorderColor[messageBarType]}`,
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
        [SmallScreenSelector]: {
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gridTemplateRows: '1fr auto',
          gridTemplateAreas: `
            "icon text close"
            "action action action"
          `,
        },
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
        [SmallScreenSelector]: {
          gridArea: 'icon',
        },
      },
    ],
    icon: {
      color: semanticColors[iconColor[messageBarType]],
      selectors: {
        [HighContrastSelector]: {
          ...getHighContrastNoAdjustStyle(),
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
        [SmallScreenSelector]: {
          gridArea: 'text',
        },
        selectors: {
          [HighContrastSelector]: {
            ...getHighContrastNoAdjustStyle(),
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
          '& span a:last-child': {
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
    dismissSingleLine: [
      classNames.dismissSingleLine,
      {
        [SmallScreenSelector]: {
          gridArea: 'close',
        },
      },
    ],
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
        // reset forced colors to browser control for inner actions
        forcedColorAdjust: 'auto',
        MsHighContrastAdjust: 'auto',
        [SmallScreenSelector]: {
          gridArea: 'action',
          marginRight: 8,
          marginBottom: 8,
        },
        selectors: {
          '& button:nth-child(n+2)': {
            marginLeft: 8,
            [SmallScreenSelector]: {
              marginBottom: 0,
            },
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
