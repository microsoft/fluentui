import { IColorSwatch, IColorPaletteTheme } from '@fluentui/react-docsite-components/lib/index2';

export const AppColorSwatches: IColorSwatch[] = [
  {
    name: 'Access',
    hex: '#a4373a',
    icon: 'AccessLogo',
  },
  {
    name: 'Exchange',
    hex: '#0078d4',
    code: {
      core: '$ms-color-communicationPrimary',
      react: 'CommunicationColors.primary',
    },
    icon: 'ExchangeLogo',
  },
  {
    name: 'Excel',
    hex: '#217346',
    icon: 'ExcelLogo',
  },
  {
    name: 'Office',
    hex: '#d83b01',
    icon: 'OfficeLogo',
  },
  {
    name: 'OneDrive',
    hex: '#0078d4',
    code: {
      core: '$ms-color-communicationPrimary',
      react: 'CommunicationColors.primary',
    },
    icon: 'OneDrive',
  },
  {
    name: 'OneNote',
    hex: '#7719aa',
    icon: 'OneNoteLogo',
  },
  {
    name: 'Planner',
    hex: '#31752f',
    icon: 'PlannerLogo',
  },
  {
    name: 'PowerApps',
    hex: '#742774',
    icon: 'PowerAppsLogo',
  },
  {
    name: 'PowerPoint',
    hex: '#b7472a',
    icon: 'PowerPointLogo',
  },
  {
    name: 'Publisher',
    hex: '#077568',
    icon: 'PublisherLogo',
  },
  {
    name: 'SharePoint',
    hex: '#0078d4',
    code: {
      core: '$ms-color-communicationPrimary',
      react: 'CommunicationColors.primary',
    },
    icon: 'SharepointLogo',
  },
  {
    name: 'Skype',
    hex: '#0078d4',
    code: {
      core: '$ms-color-communicationPrimary',
      react: 'CommunicationColors.primary',
    },
    icon: 'SkypeLogo',
  },
  {
    name: 'Sway',
    hex: '#008272',
    icon: 'SwayLogo32',
  },
  {
    name: 'Teams',
    hex: '#6264a7',
    icon: 'TeamsLogo',
  },
  {
    name: 'Visio',
    hex: '#3955a3',
    icon: 'VisioLogo',
  },
  {
    name: 'Word',
    hex: '#2b579a',
    icon: 'WordLogo',
  },
  {
    name: 'Yammer',
    hex: '#106ebe',
    icon: 'YammerLogo',
  },
];

export const AppColorPalettes: IColorPaletteTheme[] = [
  {
    key: 'yammer',
    name: 'Yammer',
    colors: [
      {
        name: 'Yammer Shade 20',
        hex: '#135995',
      },
      {
        name: 'Yammer Shade 10',
        hex: '#1554a7',
      },
      {
        name: 'Yammer Primary',
        hex: '#106ebe',
        code: {
          core: '$ms-color-communicationShade10',
          react: 'CommunicationColors.shade10',
        },
      },
      {
        name: 'Yammer Tint 10',
        hex: '#0078d4',
        code: {
          core: '$ms-color-communicationPrimary',
          react: 'CommunicationColors.primary',
        },
      },
      {
        name: 'Yammer Tint 20',
        hex: '#2488d8',
      },
      {
        name: 'Yammer Tint 30',
        hex: '#69afe5',
      },
      {
        name: 'Yammer Tint 40',
        hex: '#83d6f2',
      },
      {
        name: 'Yammer Tint 50',
        hex: '#cce3f5',
      },
    ],
  },
];
