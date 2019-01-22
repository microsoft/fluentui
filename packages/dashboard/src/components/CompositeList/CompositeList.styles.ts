import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';
import { ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

import { DefaultFontStyles, DefaultPalette, IStyle } from 'office-ui-fabric-react/lib/Styling';

export const getCommandBarStyle = (): ICommandBarStyles => {
  return {
    root: {
      backgroundColor: 'white',
      padding: '2px 0px 2px 0px'
    }
  };
};

export const getCommandBarWrapperStyle = (overrideStickyPosition: boolean): IStyle => {
  return {
    displayName: 'CommandBarWrapper',
    position: overrideStickyPosition ? 'unset' : 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
    selectors: {
      '&::before': {
        backgroundColor: DefaultPalette.white,
        position: 'absolute',
        left: '-48px',
        top: '0px',
        content: '""',
        height: '40px',
        width: '48px'
      },
      '&::after': {
        backgroundColor: DefaultPalette.white,
        position: 'absolute',
        right: '-48px',
        top: '0px',
        content: '""',
        height: '40px',
        width: '48px'
      },
      '@supports (-ms-ime-align: auto)': {
        left: '48px'
      }
    }
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
      fontSize: '12px',
      order: 2
    }
  };
};

export const getDetailsListStyle = (overrideStickyPosition: boolean): IStyle => {
  return {
    selectors: {
      '.ms-DetailsList--Compact& .ms-DetailsRow': {
        borderBottom: '1px solid #f4f4f4'
      },
      '& .ms-DetailsList-headerWrapper': {
        position: overrideStickyPosition ? 'unset' : 'sticky',
        top: '23px',
        zIndex: 10,
        paddingTop: '16px'
      }
    }
  };
};
