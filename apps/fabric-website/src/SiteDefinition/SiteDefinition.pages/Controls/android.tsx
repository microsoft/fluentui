import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const controlsPagesAndroid: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/android',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage))
  },
  {
    title: 'Basic Inputs',
    url: '#/controls/android/button',
    isCategory: true,
    pages: [
      {
        title: 'Button',
        url: '#/controls/android/button',
        component: () => <LoadingComponent title="Button" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ButtonPage/ButtonPage').ButtonPage))
      }
    ]
  },
  {
    title: 'Pickers',
    url: '#/controls/android/calendar',
    isCategory: true,
    pages: [
      {
        title: 'Calendar',
        url: '#/controls/android/calendar',
        component: () => <LoadingComponent title="Calendar" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/CalendarPage/CalendarPage').CalendarPage))
      },
      {
        title: 'Date & Time Picker',
        url: '#/controls/android/date-time-picker',
        component: () => <LoadingComponent title="Date & Time Picker" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/DatePickerPage/DatePickerPage').DatePickerPage))
      },
      {
        title: 'People Picker',
        url: '#/controls/android/peoplepicker',
        component: () => <LoadingComponent title="People Picker" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/PeoplePickerPage/PeoplePickerPage').PeoplePickerPage))
      }
    ]
  },
  {
    title: 'Items & Lists',
    url: '#/controls/android/avatar',
    isCategory: true,
    pages: [
      {
        title: 'Avatar',
        url: '#/controls/android/avatar',
        component: () => <LoadingComponent title="Avatar" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/AvatarPage/AvatarPage').AvatarPage))
      },
      {
        title: 'Chip',
        url: '#/controls/android/chip',
        component: () => <LoadingComponent title="Chip" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ChipPage/ChipPage').ChipPage))
      },
      {
        title: 'List Cells',
        url: '#/controls/android/listcells',
        component: () => <LoadingComponent title="List Cells" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ListCellsPage/ListCellsPage').ListCellsPage))
      },
      {
        title: 'Persona',
        url: '#/controls/android/persona',
        component: () => <LoadingComponent title="Persona" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PersonaPage/PersonaPage').PersonaPage))
      }
    ]
  },
  {
    title: 'Commands, Menus & Navs',
    url: '#/controls/android/popupmenu',
    isCategory: true,
    pages: [
      {
        title: 'Popup Menu',
        url: '#/controls/android/popupmenu',
        component: () => <LoadingComponent title="PopupMenu" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/PopupMenuPage/PopupMenuPage').PopupMenuPage))
      },
      {
        title: 'Top App Bar',
        url: '#/controls/android/topappbar',
        component: () => <LoadingComponent title="NavBar" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/NavBarPage/NavBarPage').NavBarPage))
      }
    ]
  },
  {
    title: 'Notification & Engagement',
    url: '#/controls/android/snackbar',
    isCategory: true,
    pages: [
      {
        title: 'Snackbar',
        url: '#/controls/android/snackbar',
        component: () => <LoadingComponent title="Snackbar" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/SnackbarPage/SnackbarPage').SnackbarPage))
      }
    ]
  },
  {
    title: 'Progress',
    url: '#/controls/android/spinner',
    isCategory: true,
    pages: [
      {
        title: 'Spinner',
        url: '#/controls/android/spinner',
        component: () => <LoadingComponent title="Spinner" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/SpinnerPage/SpinnerPage').SpinnerPage))
      }
    ]
  },
  {
    title: 'Surfaces',
    url: '#/controls/android/bottomsheet',
    isCategory: true,
    pages: [
      {
        title: 'BottomSheet',
        url: '#/controls/android/bottomsheet',
        component: () => <LoadingComponent title="BottomSheet" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/BottomSheetPage/BottomSheetPage').BottomSheetPage))
      },
      {
        title: 'Drawer',
        url: '#/controls/android/drawer',
        component: () => <LoadingComponent title="Drawer" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/DrawerPage/DrawerPage').DrawerPage))
      },
      {
        title: 'Tooltip',
        url: '#/controls/android/tooltip',
        component: () => <LoadingComponent title="Tooltip" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/TooltipPage/TooltipPage').TooltipPage))
      }
    ]
  },
  {
    title: 'Utilities',
    url: '#/controls/android/separator',
    isCategory: true,
    pages: [
      {
        title: 'Separator',
        url: '#/controls/android/separator',
        component: () => <LoadingComponent title="Separator" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/SeparatorPage/SeparatorPage').SeparatorPage))
      },
      {
        title: 'Text',
        url: '#/controls/android/text',
        component: () => <LoadingComponent title="Text" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/TextPage/TextPage').TextPage))
      }
    ]
  }
];
