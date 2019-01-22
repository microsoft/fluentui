import { IDetailsRowStyleProps, IDetailsRowStyles } from 'office-ui-fabric-react/lib/DetailsList';
import { DefaultPalette, getFocusStyle, getTheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

const theme = getTheme();

export const getListRowFocusStyles = (): IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles> => {
  return {
    root: [getFocusStyle(theme, undefined, undefined, undefined, 'transparent', undefined)]
  };
};

export const getfocusStyle = (): IStyle => {
  return [getFocusStyle(theme, undefined, undefined, undefined, 'transparent', undefined)];
};

export const getListActionColumnStyle = (isCompactMode: boolean): IStyle => {
  return {
    display: 'flex',
    fontSize: isCompactMode ? '12px' : '14px',
    color: DefaultPalette.neutralDark,
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    justifyContent: 'space-between'
  };
};

export const getListActionFieldStyle = (isCompactMode: boolean): IStyle => {
  return {
    fontSize: isCompactMode ? '12px' : '14px',
    color: DefaultPalette.neutralPrimary,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    selectors: {
      ':hover': {
        textDecoration: 'underline'
      }
    }
  };
};

export const getListRowActionButtonContainerStyle = (): IStyle => {
  return {
    display: 'flex',
    flexShrink: 0,
    marginTop: '-10px',
    marginBottom: '-10px',
    whiteSpace: 'nowrap',
    selectors: {
      '.ms-Button-menuIcon': {
        display: 'none'
      }
    }
  };
};

export const getListRowActionButtonStyle = (): IStyle => {
  return {
    outline: 'none',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    opacity: 0,
    selectors: {
      ':hover': {
        width: '36px',
        color: DefaultPalette.neutralPrimary,
        opacity: 1
      },
      ':focus': {
        width: '36px',
        color: DefaultPalette.neutralPrimary,
        opacity: 1
      },
      '.ms-DetailsRow.is-selected &': {
        width: '36px',
        color: DefaultPalette.neutralPrimary,
        opacity: 1
      }
    }
  };
};
