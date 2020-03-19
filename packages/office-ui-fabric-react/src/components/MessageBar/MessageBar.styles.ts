import {
  IStyle,
  IPalette,
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

// Returns the background color of the MessageBar root element based on the type of MessageBar.
const getRootBackground = (
  messageBarType: MessageBarType | undefined,
  palette: IPalette,
  semanticColors: ISemanticColors,
): string => {
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

/**
 * Returns the high contrast mode background color of the MessageBar root element based on the type of MessageBar.
 * The fact that the styles don't vary based on the theme is intentional since the objective is to show the message bar
 * type, and theme variations would not be appreciated in High Contrast either way.
 */
const getHighContrastRootBackground = (messageBarType: MessageBarType | undefined): string => {
  switch (messageBarType) {
    case MessageBarType.error:
    case MessageBarType.blocked:
    case MessageBarType.severeWarning:
      return 'rgba(255, 0, 0, 0.3)';
    case MessageBarType.success:
      return 'rgba(48, 241, 73, 0.3)';
    case MessageBarType.warning:
      return 'rgba(255, 254, 57, 0.3)';
  }
  return 'Window';
};

// Returns the icon color based on the type of MessageBar.
const getIconColor = (
  messageBarType: MessageBarType | undefined,
  palette: IPalette,
  semanticColors: ISemanticColors,
): string => {
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
  const { theme, className, messageBarType, onDismiss, truncated, isMultiline, expandSingleLine } = props;
  const { semanticColors, palette, fonts } = theme;

  const SmallScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const dismissalAndExpandIconStyle: IStyle = {
    fontSize: IconFontSizes.xSmall,
    height: 10,
    lineHeight: '10px',
    color: palette.neutralPrimary,
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
        outlineOffset: '-4px',
        outlineColor: 'Window',
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
      theme.fonts.medium,
      messageBarType === MessageBarType.error && classNames.error,
      messageBarType === MessageBarType.blocked && classNames.blocked,
      messageBarType === MessageBarType.severeWarning && classNames.severeWarning,
      messageBarType === MessageBarType.success && classNames.success,
      messageBarType === MessageBarType.warning && classNames.warning,
      isMultiline ? classNames.multiline : classNames.singleline,
      !isMultiline && onDismiss && classNames.dismissalSingleLine,
      !isMultiline && truncated && classNames.expandingSingleLine,
      {
        background: getRootBackground(messageBarType, palette, semanticColors),
        color: palette.neutralPrimary,
        minHeight: 32,
        width: '100%',
        display: 'flex',
        wordBreak: 'break-word',
        selectors: {
          '& .ms-Link': {
            color: palette.themeDark,
            ...fonts.small,
            selectors: {
              [HighContrastSelector]: {
                MsHighContrastAdjust: 'auto',
              },
            },
          },
          [HighContrastSelector]: {
            background: getHighContrastRootBackground(messageBarType),
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
      color: getIconColor(messageBarType, palette, semanticColors),
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
    dismissSingleLine: [classNames.dismissSingleLine],
    expandSingleLine: [classNames.expandSingleLine],
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
