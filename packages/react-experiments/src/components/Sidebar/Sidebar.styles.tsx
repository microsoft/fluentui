/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
import { memoizeFunction, concatStyleSets } from '@fluentui/react';
import { SidebarStylingConstants } from './Sidebar.types';
import type { IButtonStyles } from '@fluentui/react/lib/Button';
import type { ITheme } from '@fluentui/react';
import type { ISidebarStyles } from './Sidebar.types';

export const sidebarFonts = {
  segoeUiSemibold:
    'wf_segoe-ui_semibold, "Segoe UI Semibold", "Segoe WP Semibold", "Segoe UI", "Segoe WP", Tahoma, Arial, sans-serif',
  segoeUiSemilight:
    'wf_segoe-ui_semilight, "Segoe UI Light", "Segoe WP Light", "Segoe UI", "Segoe WP",Tahoma, Arial, sans-serif',
};

export enum SidebarColors {
  Dark,
  Light,
}

interface ISidebarColors {
  background: string;
  backgroundHovered?: string;
  backgroundActive: string;
  buttonColor: string;
}

const SidebarDarkColors: ISidebarColors = {
  background: '#212121',
  backgroundHovered: '#333',
  backgroundActive: '#3c3c3c',
  buttonColor: '#f4f4f4',
};

const SidebarLightColors: ISidebarColors = {
  background: '#f4f4f4',
  backgroundHovered: '#c8c8c8',
  backgroundActive: '#eaeaea',
  buttonColor: '#212121',
};

export const getSidebarStyles = memoizeFunction(
  (theme: ITheme, sidebarColors: SidebarColors, customStyles?: ISidebarStyles): ISidebarStyles => {
    const currentSidebarColors = sidebarColors === SidebarColors.Dark ? SidebarDarkColors : SidebarLightColors;
    const sidebarStyles: ISidebarStyles = {
      root: {
        height: '100%',
        backgroundColor: currentSidebarColors.background,
        width: SidebarStylingConstants.sidebarWidth,
        position: 'relative',
      },
      rootCollapsed: {
        width: SidebarStylingConstants.sidebarCollapsedWidth,
        backgroundColor: currentSidebarColors.background,
        height: '100%',
        position: 'relative',
      },
      content: {
        height: 'auto',
        width: '100%',
        backgroundColor: currentSidebarColors.background,
        overflowX: 'hidden',
      },
      contentCollapsed: {
        backgroundColor: currentSidebarColors.background,
        overflow: 'hidden',
      },
      footer: {
        bottom: '0',
        position: 'absolute',
        width: '100%',
        zIndex: 100,
      },
    };

    return concatStyleSets(sidebarStyles, customStyles);
  },
);

export const getButtonColoredStyles = memoizeFunction(
  (theme: ITheme, sidebarColors: SidebarColors, customStyles?: IButtonStyles): IButtonStyles => {
    const currentSidebarColors = sidebarColors === SidebarColors.Dark ? SidebarDarkColors : SidebarLightColors;
    const buttonStyles: IButtonStyles = {
      root: {
        backgroundColor: currentSidebarColors.background,
      },
      rootExpanded: {
        backgroundColor: currentSidebarColors.backgroundHovered,
      },
      rootDisabled: {
        backgroundColor: currentSidebarColors.background,
      },
      rootHovered: {
        backgroundColor: currentSidebarColors.backgroundHovered,
      },
      rootPressed: {
        backgroundColor: currentSidebarColors.backgroundHovered,
      },
      rootChecked: {
        backgroundColor: currentSidebarColors.backgroundActive,
      },
      rootCheckedHovered: {
        backgroundColor: currentSidebarColors.backgroundActive,
      },
      rootCheckedPressed: {
        backgroundColor: currentSidebarColors.backgroundActive,
      },
      icon: {
        fill: currentSidebarColors.buttonColor,
        color: currentSidebarColors.buttonColor,
      },
      iconDisabled: {
        color: currentSidebarColors.buttonColor,
      },
      iconExpanded: {
        color: currentSidebarColors.buttonColor,
        fill: currentSidebarColors.buttonColor,
      },
      labelDisabled: {
        color: currentSidebarColors.buttonColor,
      },
      label: {
        color: currentSidebarColors.buttonColor,
      },
      menuIcon: {
        color: currentSidebarColors.buttonColor,
      },
      menuIconDisabled: {
        color: currentSidebarColors.buttonColor,
      },
    };

    return concatStyleSets(buttonStyles, customStyles);
  },
);
