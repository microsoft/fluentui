import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

// Note that this file is essentially the subset of Fabric web controls that
// have had Fluent styles created for them. Non-Fluent versions will not be
// shown here; those can be found on the existing public Fabric website.
// As Fluent versions of components become available in @uifabric/fluent-theme,
// they will be un-commented here.
export const controlsPagesWeb: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/web',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage))
  },
  {
    title: 'Basic Inputs',
    url: '#/controls/web/button',
    isCategory: true,
    pages: [
      {
        title: 'Button',
        url: '#/controls/web/button',
        component: () => <LoadingComponent title="Button" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ButtonPage/ButtonPage').ButtonPage))
      },
      {
        title: 'Checkbox',
        url: '#/controls/web/checkbox',
        component: () => <LoadingComponent title="Checkbox" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/CheckboxPage/CheckboxPage').CheckboxPage))
      },
      {
        title: 'ChoiceGroup',
        url: '#/controls/web/choicegroup',
        component: () => <LoadingComponent title="ChoiceGroup" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ChoiceGroupPage/ChoiceGroupPage').ChoiceGroupPage))
      },
      {
        title: 'ComboBox',
        url: '#/controls/web/combobox',
        component: () => <LoadingComponent title="ComboBox" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ComboBoxPage/ComboBoxPage').ComboBoxPage))
      },
      {
        title: 'Dropdown',
        url: '#/controls/web/dropdown',
        component: () => <LoadingComponent title="Dropdown" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/DropdownPage/DropdownPage').DropdownPage))
      },
      {
        title: 'Label',
        url: '#/controls/web/label',
        component: () => <LoadingComponent title="Label" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/LabelPage/LabelPage').LabelPage))
      },
      {
        title: 'Link',
        url: '#/controls/web/link',
        component: () => <LoadingComponent title="Link" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/LinkPage/LinkPage').LinkPage))
      },
      {
        title: 'Rating',
        url: '#/controls/web/rating',
        component: () => <LoadingComponent title="Rating" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/RatingPage/RatingPage').RatingPage))
      },
      // {
      //   title: 'SearchBox',
      //   url: '#/controls/web/searchbox',
      //   component: () => <LoadingComponent title="SearchBox" />,
      //   getComponent: cb =>
      //     require.ensure([], require => cb(require<any>('../../../pages/Controls/SearchBoxPage/SearchBoxPage').SearchBoxPage))
      // },
      {
        title: 'Slider',
        url: '#/controls/web/slider',
        component: () => <LoadingComponent title="Slider" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/SliderPage/SliderPage').SliderPage))
      },
      {
        title: 'SpinButton',
        url: '#/controls/web/spinbutton',
        component: () => <LoadingComponent title="SpinButton" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/SpinButtonPage/SpinButtonPage').SpinButtonPage))
      },
      {
        title: 'TextField',
        url: '#/controls/web/textfield',
        component: () => <LoadingComponent title="TextField" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/TextFieldPage/TextFieldPage').TextFieldPage))
      },
      {
        title: 'Toggle',
        url: '#/controls/web/toggle',
        component: () => <LoadingComponent title="Toggle" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/TogglePage/TogglePage').TogglePage))
      }
    ]
  },
  {
    title: 'Galleries and Pickers',
    url: '#/controls/web/pickers',
    isCategory: true,
    pages: [
      {
        title: 'Pickers',
        url: '#/controls/web/pickers',
        component: () => <LoadingComponent title="Pickers" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PickersPage/PickersPage').PickersPage))
      },
      // {
      //   title: 'Calendar',
      //   url: '#/controls/web/Calendar',
      //   component: () => <LoadingComponent title="Calendar" />,
      //   getComponent: cb =>
      //     require.ensure([], require => cb(require<any>('../../../pages/Controls/CalendarPage/CalendarPage').CalendarPage))
      // },
      {
        title: 'ColorPicker',
        url: '#/controls/web/colorpicker',
        component: () => <LoadingComponent title="ColorPicker" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ColorPickerPage/ColorPickerPage').ColorPickerPage))
      },
      {
        title: 'DatePicker',
        url: '#/controls/web/datepicker',
        component: () => <LoadingComponent title="DatePicker" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/DatePickerPage/DatePickerPage').DatePickerPage))
      },
      // {
      //   title: 'PeoplePicker',
      //   url: '#/controls/web/peoplepicker',
      //   component: () => <LoadingComponent title="PeoplePicker" />,
      //   getComponent: cb =>
      //     require.ensure([], require =>
      //       cb(require<any>('../../../pages/Controls/PeoplePickerPage/PeoplePickerPage').PeoplePickerPage)
      //     )
      // },
      {
        title: 'SwatchColorPicker',
        url: '#/controls/web/swatchcolorpicker',
        component: () => <LoadingComponent title="SwatchColorPicker" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/SwatchColorPickerPage/SwatchColorPickerPage').SwatchColorPickerPage)
          )
      }
    ]
  },
  {
    title: 'Items and Lists',
    url: '#/controls/web/activityitem',
    isCategory: true,
    pages: [
      // {
      //   title: 'ActivityItem',
      //   url: '#/controls/web/activityitem',
      //   component: () => <LoadingComponent title="ActivityItem" />,
      //   getComponent: cb =>
      //     require.ensure([], require =>
      //       cb(require<any>('../../../pages/Controls/ActivityItemPage/ActivityItemPage').ActivityItemPage)
      //     )
      // },
      // {
      //   title: 'Basic List',
      //   url: '#/controls/web/list',
      //   component: () => <LoadingComponent title="List" />,
      //   getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ListPage/ListPage').ListPage))
      // },
      {
        title: 'DetailsList',
        url: '#/controls/web/detailslist',
        isCategory: true,
        pages: [
          {
            title: 'DetailsList',
            url: '#/controls/web/detailslist',
            component: () => <LoadingComponent title="DetailsList" />,
            getComponent: cb =>
              require.ensure([], require => cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListPage').DetailsListPage))
          },
          {
            title: 'DetailsList - Basic',
            url: '#/controls/web/detailslist/basic',
            component: () => <LoadingComponent title="DetailsList - Basic" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListBasicPage').DetailsListBasicPage)
              )
          },
          {
            title: 'DetailsList - Compact',
            url: '#/controls/web/detailslist/compact',
            component: () => <LoadingComponent title="DetailsList - Compact" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListCompactPage').DetailsListCompactPage)
              )
          },
          {
            title: 'DetailsList - Grouped',
            url: '#/controls/web/detailslist/grouped',
            component: () => <LoadingComponent title="DetailsList - Grouped" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListGroupedPage').DetailsListGroupedPage)
              )
          },
          {
            title: 'DetailsList - Custom Item Columns',
            url: '#/controls/web/detailslist/customitemcolumns',
            component: () => <LoadingComponent title="DetailsList - Custom Item Columns" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListCustomColumnsPage').DetailsListCustomColumnsPage)
              )
          },
          {
            title: 'DetailsList - Custom Item Rows',
            url: '#/controls/web/detailslist/customitemrows',
            component: () => <LoadingComponent title="DetailsList - Custom Item Rows" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListCustomRowsPage').DetailsListCustomRowsPage)
              )
          },
          {
            title: 'DetailsList - Custom Footer',
            url: '#/controls/web/detailslist/customfooter',
            component: () => <LoadingComponent title="DetailsList - Custom Footer" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListCustomFooterPage').DetailsListCustomFooterPage)
              )
          },
          {
            title: 'DetailsList - Custom Group Headers',
            url: '#/controls/web/detailslist/customgroupheaders',
            component: () => <LoadingComponent title="DetailsList - Custom Group Headers" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(
                  require<any>('../../../pages/Controls/DetailsListPage/DetailsListCustomGroupHeadersPage')
                    .DetailsListCustomGroupHeadersPage
                )
              )
          },
          {
            title: 'DetailsList - Variable Row Heights',
            url: '#/controls/web/detailslist/variablerowheights',
            component: () => <LoadingComponent title="DetailsList - Variable Row Heights" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListAdvancedPage').DetailsListAdvancedPage)
              )
          },
          {
            title: 'DetailsList - Drag & Drop',
            url: '#/controls/web/detailslist/draganddrop',
            component: () => <LoadingComponent title="DetailsList - Drag &amp; Drop" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListDragDropPage').DetailsListDragDropPage)
              )
          },
          {
            title: 'DetailsList - Inner Navigation',
            url: '#/controls/web/detailslist/innernavigation',
            component: () => <LoadingComponent title="DetailsList - Inner Navigation" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListNavigatingFocusPage').DetailsListNavigatingFocusPage)
              )
          },
          {
            title: 'DetailsList - Shimmer',
            url: '#/controls/web/detailslist/shimmer',
            component: () => <LoadingComponent title="DetailsList - Shimmer" />,
            getComponent: cb =>
              require.ensure([], require =>
                cb(require<any>('../../../pages/Controls/DetailsListPage/DetailsListShimmerPage').DetailsListShimmerPage)
              )
          }
        ]
      },
      // {
      //   title: 'GroupedList',
      //   url: '#/controls/web/groupedlist',
      //   component: () => <LoadingComponent title="GroupedList" />,
      //   getComponent: cb =>
      //     require.ensure([], require => cb(require<any>('../../../pages/Controls/GroupedListPage/GroupedListPage').GroupedListPage))
      // },
      {
        title: 'DocumentCard',
        url: '#/controls/web/documentcard',
        component: () => <LoadingComponent title="DocumentCard" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/DocumentCardPage/DocumentCardPage').DocumentCardPage))
      },
      {
        title: 'Facepile',
        url: '#/controls/web/facepile',
        component: () => <LoadingComponent title="Facepile" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/FacepilePage/FacepilePage').FacepilePage))
      },
      {
        title: 'HoverCard',
        url: '#/controls/web/hovercard',
        component: () => <LoadingComponent title="HoverCard" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/HoverCardPage/HoverCardPage').HoverCardPage))
      },
      {
        title: 'Persona',
        url: '#/controls/web/persona',
        component: () => <LoadingComponent title="Persona" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PersonaPage/PersonaPage').PersonaPage))
      }
    ]
  },
  {
    title: 'Commands, Menus & Nav',
    url: '#/controls/web/breadcrumb',
    isCategory: true,
    pages: [
      {
        title: 'Breadcrumb',
        url: '#/controls/web/breadcrumb',
        component: () => <LoadingComponent title="Breadcrumb" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/BreadcrumbPage/BreadcrumbPage').BreadcrumbPage))
      },
      {
        title: 'CommandBar',
        url: '#/controls/web/commandbar',
        component: () => <LoadingComponent title="CommandBar" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/CommandBarPage/CommandBarPage').CommandBarPage))
      },
      {
        title: 'ContextualMenu',
        url: '#/controls/web/contextualmenu',
        component: () => <LoadingComponent title="ContextualMenu" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/ContextualMenuPage/ContextualMenuPage').ContextualMenuPage)
          )
      },
      // {
      //   title: 'Side Nav',
      //   url: '#/controls/web/nav',
      //   component: () => <LoadingComponent title="Nav" />,
      //   getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/NavPage/NavPage').NavPage))
      // },
      // {
      //   title: 'OverflowSet',
      //   url: '#/controls/web/overflowset',
      //   component: () => <LoadingComponent title="OverflowSet" />,
      //   getComponent: cb =>
      //     require.ensure([], require => cb(require<any>('../../../pages/Controls/OverflowSetPage/OverflowSetPage').OverflowSetPage))
      // },
      {
        title: 'Pivot',
        url: '#/controls/web/pivot',
        component: () => <LoadingComponent title="Pivot" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PivotPage/PivotPage').PivotPage))
      }
    ]
  },
  {
    title: 'Notification & Engagement',
    url: '#/controls/web/coachmark',
    isCategory: true,
    pages: [
      //     {
      //       title: 'Coachmark',
      //       url: '#/controls/web/coachmark',
      //       component: () => <LoadingComponent title="Coachmark" />,
      //       getComponent: cb =>
      //         require.ensure([], require => cb(require<any>('../../../pages/Controls/CoachmarkPage/CoachmarkPage').CoachmarkPage))
      //     },
      //     {
      //       title: 'MessageBar',
      //       url: '#/controls/web/messagebar',
      //       component: () => <LoadingComponent title="MessageBar" />,
      //       getComponent: cb =>
      //         require.ensure([], require => cb(require<any>('../../../pages/Controls/MessageBarPage/MessageBarPage').MessageBarPage))
      //     },
      {
        title: 'TeachingBubble',
        url: '#/controls/web/teachingbubble',
        component: () => <LoadingComponent title="TeachingBubble" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/TeachingBubblePage/TeachingBubblePage').TeachingBubblePage)
          )
      }
    ]
  },
  {
    title: 'Progress',
    url: '#/controls/web/progressindicator',
    isCategory: true,
    pages: [
      {
        title: 'ProgressIndicator',
        url: '#/controls/web/progressindicator',
        component: () => <LoadingComponent title="ProgressIndicator" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/ProgressIndicatorPage/ProgressIndicatorPage').ProgressIndicatorPage)
          )
      },
      {
        title: 'Shimmer',
        url: '#/controls/web/shimmer',
        component: () => <LoadingComponent title="Shimmer" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ShimmerPage/ShimmerPage').ShimmerPage))
      },
      {
        title: 'Spinner',
        url: '#/controls/web/spinner',
        component: () => <LoadingComponent title="Spinner" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/SpinnerPage/SpinnerPage').SpinnerPage))
      }
    ]
  },
  {
    title: 'Surfaces',
    url: '#/controls/web/callout',
    isCategory: true,
    pages: [
      {
        title: 'Callout',
        url: '#/controls/web/callout',
        component: () => <LoadingComponent title="Callout" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/CalloutPage/CalloutPage').CalloutPage))
      },
      {
        title: 'Dialog',
        url: '#/controls/web/dialog',
        component: () => <LoadingComponent title="Dialog" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/DialogPage/DialogPage').DialogPage))
      },
      {
        title: 'Modal',
        url: '#/controls/web/modal',
        component: () => <LoadingComponent title="Modal" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ModalPage/ModalPage').ModalPage))
      },
      // {
      //   title: 'Panel',
      //   url: '#/controls/web/panel',
      //   component: () => <LoadingComponent title="Panel" />,
      //   getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PanelPage/PanelPage').PanelPage))
      // },
      {
        title: 'Tooltip',
        url: '#/controls/web/tooltip',
        component: () => <LoadingComponent title="Tooltip" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/TooltipPage/TooltipPage').TooltipPage))
      },
      {
        title: 'ScrollablePane',
        url: '#/controls/web/scrollablepane',
        component: () => <LoadingComponent title="ScrollablePane" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/ScrollablePanePage/ScrollablePanePage').ScrollablePanePage)
          )
      }
    ]
  },
  {
    title: 'Fluent Theme',
    url: '#/controls/web/fluent-theme',
    component: () => <LoadingComponent title="Fluent Theme" />,
    getComponent: cb =>
      require.ensure([], require => cb(require<any>('../../../pages/Controls/FluentThemePage/FluentThemePage').FluentThemePage))
  }
  // {
  //   title: 'Utilities',
  //   url: '#/controls/web/icon',
  //   isCategory: true,
  //   pages: [
  //     {
  //       title: 'Icon',
  //       url: '#/controls/web/icon',
  //       component: () => <LoadingComponent title="Icon" />,
  //       getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/IconPage/IconPage').IconPage))
  //     },
  //     {
  //       title: 'Image',
  //       url: '#/controls/web/image',
  //       component: () => <LoadingComponent title="Image" />,
  //       getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ImagePage/ImagePage').ImagePage))
  //     },
  //     {
  //       title: 'Layer',
  //       url: '#/controls/web/layer',
  //       component: () => <LoadingComponent title="Layer" />,
  //       getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/LayerPage/LayerPage').LayerPage))
  //     },
  //     {
  //       title: 'Overlay',
  //       url: '#/controls/web/overlay',
  //       component: () => <LoadingComponent title="Overlay" />,
  //       getComponent: cb =>
  //         require.ensure([], require => cb(require<any>('../../../pages/Controls/OverlayPage/OverlayPage').OverlayPage))
  //     },
  //     {
  //       title: 'ResizeGroup',
  //       url: '#/controls/web/resizegroup',
  //       component: () => <LoadingComponent title="ResizeGroup" />,
  //       getComponent: cb =>
  //         require.ensure([], require => cb(require<any>('../../../pages/Controls/ResizeGroupPage/ResizeGroupPage').ResizeGroupPage))
  //     },
  //     {
  //       title: 'FocusTrapZone',
  //       url: '#/controls/web/focustrapzone',
  //       component: () => <LoadingComponent title="FocusTrapZone" />,
  //       getComponent: cb =>
  //         require.ensure([], require =>
  //           cb(require<any>('../../../pages/Controls/FocusTrapZoneUtilityPage/FocusTrapZoneUtilityPage').FocusTrapZoneUtilityPage)
  //         )
  //     },
  //     {
  //       title: 'FocusZone',
  //       url: '#/controls/web/focuszone',
  //       component: () => <LoadingComponent title="FocusZone" />,
  //       getComponent: cb =>
  //         require.ensure([], require =>
  //           cb(require<any>('../../../pages/Controls/FocusZoneUtilityPage/FocusZoneUtilityPage').FocusZoneUtilityPage)
  //         )
  //     },
  //     {
  //       title: 'MarqueeSelection',
  //       url: '#/controls/web/marqueeselection',
  //       component: () => <LoadingComponent title="MarqueeSelection" />,
  //       getComponent: cb =>
  //         require.ensure([], require =>
  //           cb(
  //             require<any>('../../../pages/Controls/MarqueeSelectionUtilityPage/MarqueeSelectionUtilityPage')
  //               .MarqueeSelectionUtilityPage
  //           )
  //         )
  //     },
  //     {
  //       title: 'Selection',
  //       url: '#/controls/web/selection',
  //       component: () => <LoadingComponent title="Selection" />,
  //       getComponent: cb =>
  //         require.ensure([], require =>
  //           cb(require<any>('../../../pages/Controls/SelectionUtilityPage/SelectionUtilityPage').SelectionUtilityPage)
  //         )
  //     },
  //     {
  //       title: 'Themes',
  //       url: '#/controls/web/themes',
  //       component: () => <LoadingComponent title="Themes" />,
  //       getComponent: cb =>
  //         require.ensure([], require =>
  //           cb(require<any>('../../../pages/Controls/ThemesUtilityPage/ThemesUtilityPage').ThemesUtilityPage)
  //         )
  //     }
  //   ]
  // }
];
