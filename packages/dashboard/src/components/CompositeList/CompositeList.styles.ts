import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';
import { ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

import { DefaultFontStyles, DefaultPalette, FontSizes, IStyle } from 'office-ui-fabric-react/lib/Styling';

export const getCommandBarStyle = (): ICommandBarStyles => {
  return {
    root: {
      backgroundColor: DefaultPalette.white,
      padding: '2px 0px 2px 0px'
    }
  };
};

export const getCommandBarWrapperStyle = (): IStyle => {
  return {
    displayName: 'CommandBarWrapper',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1
  };
};

export const getCommandBarItemStyle = (): IButtonStyles => {
  return {
    root: {
      background: 'transparent',
      height: '100%'
    },
    label: {
      fontFamily: 'SegoeUI-Semibold-final,' + DefaultFontStyles.medium.fontFamily,
      margin: '0px 4px 0px 0px'
    },
    icon: {
      color: DefaultPalette.black
    },
    iconHovered: {
      color: DefaultPalette.black
    },
    menuIcon: {
      display: 'none'
    }
  };
};

export const getCommandBarSearchBoxStyle = (): Partial<ISearchBoxStyles> => {
  return {
    root: {
      fontFamily: 'SegoeUI-Semibold-final,' + DefaultFontStyles.medium.fontFamily,
      width: '180px',
      marginTop: '4px',
      border: '0px'
    },
    field: {
      selectors: {
        '::placeholder': {
          color: DefaultPalette.black
        }
      }
    },
    clearButton: {
      color: DefaultPalette.black
    },
    icon: {
      color: DefaultPalette.black
    }
  };
};

export const getCommandBarSelectionCountItemStyles = (): Partial<IButtonStyles> => {
  return {
    root: {
      background: 'transparent',
      height: '100%'
    },
    label: {
      fontFamily: 'SegoeUI-Semibold-final,' + DefaultFontStyles.medium.fontFamily,
      color: '0078D4',
      order: 1
    },
    icon: {
      color: '0078D4',
      fontSize: FontSizes.small,
      order: 2
    }
  };
};

export const getDetailsListStyle = (showCommandBar: boolean): IStyle => {
  return {
    selectors: {
      '.ms-DetailsList--Compact& .ms-DetailsRow': {
        borderBottom: '1px solid #f4f4f4'
      },
      '& .ms-DetailsList-headerWrapper': {
        position: 'sticky',
        top: showCommandBar ? '23px' : '0px',
        zIndex: 10,
        paddingTop: showCommandBar ? '16px' : '0px'
      }
    }
  };
};
