import { IVerticalPersonaComponent } from './VerticalPersona.types';

export const VerticalPersonaTokens: IVerticalPersonaComponent['tokens'] = (props, theme) => {
  return {
    verticalPersonaWidth: 122,
    // TODO: Use font from theme?
    fontFamily: 'SegoeUI',
    textMaxHeight: 35,
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
      maxHeight: tokens.textMaxHeight,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.primaryTextFontSize,
      fontWeight: tokens.primaryTextFontWeight,
      color: theme.palette.neutralPrimary,
      textAlign: 'center',
      whiteSpace: 'initial'
    },
    secondaryText: {
      paddingTop: tokens.secondaryTextPaddingTop,
      maxHeight: tokens.textMaxHeight,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.secondaryTextFontSize,
      lineHeight: '1.42',
      textAlign: 'center',
      whiteSpace: 'initial',
      color: theme.palette.neutralSecondary
    }
  };
};
