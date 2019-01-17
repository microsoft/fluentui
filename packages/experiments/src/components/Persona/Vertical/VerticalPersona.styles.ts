import { IVerticalPersonaComponent } from './VerticalPersona.types';

export const VerticalPersonaTokens: IVerticalPersonaComponent['tokens'] = (props, theme) => {
  return {
    verticalPersonaWidth: 122,
    font: theme.fonts.large,
    textPaddingLeftAndRight: 8,
    primaryTextPaddingTop: '8px',
    primaryTextFontSize: '14px',
    primaryTextFontWeight: 600,
    secondaryTextPaddingTop: '6px',
    secondaryTextFontSize: '12px',
    secondaryTextFontWeight: 300
  };
};

export const VerticalPersonaStyles: IVerticalPersonaComponent['styles'] = (props, theme, tokens) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: `${tokens.verticalPersonaWidth}px`,
      padding: `0 ${tokens.textPaddingLeftAndRight}px`,
      boxSizing: 'border-box'
    },
    primaryText: {
      paddingTop: tokens.primaryTextPaddingTop,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.primaryTextFontSize,
      fontWeight: tokens.primaryTextFontWeight,
      color: theme.palette.neutralPrimary,
      textAlign: 'center',
      whiteSpace: 'initial'
    },
    secondaryText: {
      paddingTop: tokens.secondaryTextPaddingTop,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.secondaryTextFontSize,
      lineHeight: '1.42',
      textAlign: 'center',
      whiteSpace: 'initial',
      color: theme.palette.neutralSecondary
    }
  };
};
