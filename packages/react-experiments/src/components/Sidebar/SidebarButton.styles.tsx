/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
import { concatStyleSets } from '@fluentui/react/lib/Styling';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { sidebarFonts } from './Sidebar.styles';
import { SidebarStylingConstants } from './Sidebar.types';
import type { IButtonStyles } from '@fluentui/react/lib/Button';
import type { ITheme } from '@fluentui/react/lib/Styling';

export const getSidebarButtonStyles = memoizeFunction(
  (theme: ITheme, sidebarButtonStyles?: IButtonStyles, customStyles?: IButtonStyles): IButtonStyles => {
    const buttonStyles: IButtonStyles = {
      root: {
        width: '100%',
        minWidth: SidebarStylingConstants.sidebarCollapsedWidth,
        padding: '0',
        minHeight: '48px',
        height: 'auto',
        lineHeight: '20px',
        paddingLeft: '4px',
        border: '0',
      },
      rootChecked: {
        borderLeft: `4px solid ${theme.palette.themePrimary}`,
        paddingLeft: '0',
      },
      rootCheckedHovered: {
        borderLeft: `4px solid ${theme.palette.themePrimary}`,
        paddingLeft: '0',
      },
      rootCheckedPressed: {
        borderLeft: `4px solid ${theme.palette.themePrimary}`,
        paddingLeft: '0',
      },
      flexContainer: {
        justifyContent: 'flex-start',
        minHeight: '48px',
        height: 'auto',
      },
      icon: {
        marginLeft: '12px',
        marginRight: '16px',
        fontSize: SidebarStylingConstants.sidebarIconSize,
        height: SidebarStylingConstants.sidebarIconSize,
        width: SidebarStylingConstants.sidebarIconSize,
      },
      labelChecked: {
        fontWeight: 'bold',
        fontFamily: sidebarFonts.segoeUiSemibold,
      },
      labelDisabled: {
        fontFamily: sidebarFonts.segoeUiSemilight,
      },
      label: {
        verticalAlign: 'middle',
        textAlign: 'left',
        fontSize: '14px',
        whiteSpace: 'normal',
        display: 'inline-block',
        fontFamily: sidebarFonts.segoeUiSemilight,
        float: 'left',
        lineHeight: '20px',
        paddingRight: '8px',
        fontWeight: 'normal',
      },
      menuIcon: {
        marginLeft: '16px',
        marginRight: '16px',
        fontSize: SidebarStylingConstants.sidebarIconSize,
        height: SidebarStylingConstants.sidebarIconSize,
        width: SidebarStylingConstants.sidebarIconSize,
      },
    };

    return concatStyleSets(buttonStyles, sidebarButtonStyles, customStyles);
  },
);

export const getSidebarChildrenStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
    const sidebarChildrenStyles: IButtonStyles = {
      flexContainer: {
        paddingLeft: '44px',
      },
      icon: {
        padding: '0',
        marginLeft: '0',
      },
    };

    return concatStyleSets(getSidebarButtonStyles(theme), sidebarChildrenStyles, customStyles);
  },
);
