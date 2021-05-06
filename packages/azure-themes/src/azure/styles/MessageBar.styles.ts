import { IStyle } from '@fluentui/react';
import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

const generateBaseStyle = (backgroundColor: string, textColor: string): IStyle => {
  return {
    backgroundColor: backgroundColor,
    color: textColor,
    selectors: {
      '.ms-Button-icon': {
        color: textColor,
        selectors: {
          '&:hover': {
            backgroundColor: backgroundColor,
          },
          '&:active': {
            backgroundColor: backgroundColor,
          },
        },
      },
    },
  };
};

const IconButtonStyles = (props: IMessageBarStyleProps): IStyle => {
  const { theme, messageBarType } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return [
    (messageBarType === MessageBarType.error || messageBarType === MessageBarType.severeWarning) &&
      generateBaseStyle(semanticColors.statusErrorBackground, semanticColors.statusErrorText),

    messageBarType === MessageBarType.info &&
      generateBaseStyle(semanticColors.statusInformationBackground, semanticColors.statusInformationText),

    messageBarType === MessageBarType.success &&
      generateBaseStyle(semanticColors.statusSuccessBackground, semanticColors.statusSuccessText),

    (messageBarType === MessageBarType.warning || messageBarType === MessageBarType.blocked) &&
      generateBaseStyle(semanticColors.statusWarningBackground, semanticColors.statusWarningText),

    typeof messageBarType !== 'number' && generateBaseStyle(semanticColors.bodyBackground, semanticColors.bodyText),
  ];
};

export const MessageBarStyles = (props: IMessageBarStyleProps): Partial<IMessageBarStyles> => {
  const { theme, messageBarType } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;
  const iconButtonStyles = IconButtonStyles(props);

  return {
    actions: {
      // Buttons utilizes an alpha channel < 1 for their pressed and hover state background colors.
      // This styling effectively makes the button background the body background and applies hover / active styles
      // to next child down.
      selectors: {
        '.ms-Button': {
          backgroundColor: semanticColors.bodyBackground,
          color: semanticColors.buttonText,
          padding: '0px',
          border: `1px solid ${semanticColors.buttonText}`,
          selectors: {
            '.ms-Button-flexContainer': {
              paddingLeft: '16px',
              paddingRight: '16px',
              selectors: {
                ':hover': {
                  backgroundColor: semanticColors.buttonBackgroundHovered,
                  color: semanticColors.buttonTextHovered,
                },
                ':active': {
                  backgroundColor: semanticColors.buttonBackgroundPressed,
                  color: semanticColors.buttonTextPressed,
                },
              },
            },
            ':hover': {
              backgroundColor: semanticColors.bodyBackground,
              color: semanticColors.buttonText,
            },
            ':active': {
              backgroundColor: semanticColors.bodyBackground,
              color: semanticColors.buttonText,
            },
          },
        },
      },
    },
    dismissSingleLine: iconButtonStyles,
    dismissal: iconButtonStyles,
    expand: iconButtonStyles,
    expandSingleLine: iconButtonStyles,
    icon: [
      (messageBarType === MessageBarType.error || messageBarType === MessageBarType.severeWarning) && {
        color: semanticColors.statusErrorIcon,
      },

      messageBarType === MessageBarType.info && {
        color: semanticColors.statusInformationIcon,
      },

      messageBarType === MessageBarType.success && {
        color: semanticColors.statusSuccessIcon,
      },

      (messageBarType === MessageBarType.warning || messageBarType === MessageBarType.blocked) && {
        color: semanticColors.statusWarningIcon,
      },

      !messageBarType && {
        color: semanticColors.statusInformationIcon,
      },
    ],
    root: [
      {
        color: semanticColors.bodyText,
        width: 'calc(100% - 2px)', // needed for border-right to be visible
        selectors: {
          '.ms-Link': {
            color: semanticColors.statusLink,
            textDecoration: 'underline',
          },
          '.ms-Link:hover': {
            color: semanticColors.linkHovered,
          },
        },
      },
      (messageBarType === MessageBarType.error || messageBarType === MessageBarType.severeWarning) && {
        backgroundColor: semanticColors.statusErrorBackground,
        border: `1px solid ${semanticColors.statusErrorBorder}`,
      },

      messageBarType === MessageBarType.info && {
        backgroundColor: semanticColors.statusInformationBackground,
        border: `1px solid ${semanticColors.statusDefaultBorder}`,
      },

      messageBarType === MessageBarType.success && {
        backgroundColor: semanticColors.statusSuccessBackground,
        border: `1px solid ${semanticColors.statusSuccessBorder}`,
      },

      (messageBarType === MessageBarType.warning || messageBarType === MessageBarType.blocked) && {
        backgroundColor: semanticColors.statusWarningBackground,
        border: `1px solid ${semanticColors.statusWarningBorder}`,
      },

      !messageBarType && {
        backgroundColor: semanticColors.statusDefaultBackground,
        border: `1px solid ${semanticColors.statusDefaultBorder}`,
      },
    ],
  };
};
