import { IDetailsRowStyleProps, IDetailsRowStyles } from 'office-ui-fabric-react/lib/DetailsList';
import { DefaultPalette, FontSizes, getFocusStyles, getTheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

const theme = getTheme();
const listRowActionButtonWidth = 36;
const listRowActionButtonMargin = -10;

export const getListRowFocusStyles = (): IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles> => {
  return {
    root: [getFocusStyles(theme, { borderColor: 'transparent' })]
  };
};

export const getfocusStyles = (): IStyle => {
  return [getFocusStyles(theme, { borderColor: 'transparent' })];
};

export const getListActionColumnStyle = (isCompactMode: boolean): IStyle => {
  return {
    display: 'flex',
    fontSize: isCompactMode ? FontSizes.small : FontSizes.medium,
    color: DefaultPalette.neutralDark,
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    justifyContent: 'space-between'
  };
};

export const getListActionFieldStyle = (isCompactMode: boolean): IStyle => {
  return {
    fontSize: isCompactMode ? FontSizes.small : FontSizes.medium,
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
    marginTop: listRowActionButtonMargin,
    marginBottom: listRowActionButtonMargin,
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
        width: listRowActionButtonWidth,
        color: DefaultPalette.neutralPrimary,
        opacity: 1
      },
      ':focus': {
        width: listRowActionButtonWidth,
        color: DefaultPalette.neutralPrimary,
        opacity: 1
      },
      '.ms-DetailsRow.is-selected &': {
        width: listRowActionButtonWidth,
        color: DefaultPalette.neutralPrimary,
        opacity: 1
      }
    }
  };
};
