import * as React from 'react';
import { App as AppBase, IAppDefinition, IAppProps } from '@uifabric/example-app-base';
import { DetailsListBasicExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Basic.Example';
import { AppCustomizations } from './customizations/customizations';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fabric - React',
  customizations: AppCustomizations,
  testPages: [
    {
      component: DetailsListBasicExample,
      key: 'DetailsListBasicExample',
      name: 'DetailsListBasicExample',
      url: '#/tests/detailslistbasicexample'
    }
  ],
  examplePages: [
    {
      links: [
        {
          component: require<any>('./components/pages/ActivityItemPage').ActivityItemPage,
          key: 'ActivityItem',
          name: 'ActivityItem',
          url: '#/examples/activityitem'
        },
        {
          component: require<any>('./components/pages/BreadcrumbPage').BreadcrumbPage,
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb'
        },
        {
          component: require<any>('./components/pages/ButtonPage').ButtonPage,
          key: 'Button',
          name: 'Button',
          url: '#/examples/button'
        },
        {
          component: require<any>('./components/pages/CalendarPage').CalendarPage,
          key: 'Calendar',
          name: 'Calendar',
          url: '#/examples/calendar'
        },
        {
          component: require<any>('./components/pages/CalloutPage').CalloutPage,
          key: 'Callout',
          name: 'Callout',
          url: '#/examples/callout'
        },
        {
          component: require<any>('./components/pages/CheckboxPage').CheckboxPage,
          key: 'Checkbox',
          name: 'Checkbox',
          url: '#/examples/checkbox'
        },
        {
          component: require<any>('./components/pages/ChoiceGroupPage').ChoiceGroupPage,
          key: 'ChoiceGroup',
          name: 'ChoiceGroup',
          url: '#/examples/choicegroup'
        },
        {
          component: require<any>('./components/pages/CoachmarkPage').CoachmarkPage,
          key: 'Coachmark',
          name: 'Coachmark',
          url: '#/examples/coachmark'
        },
        {
          component: require<any>('./components/pages/ColorPickerPage').ColorPickerPage,
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker'
        },
        {
          component: require<any>('./components/pages/ComboBoxPage').ComboBoxPage,
          key: 'ComboBox',
          name: 'ComboBox',
          url: '#/examples/ComboBox'
        },
        {
          component: require<any>('./components/pages/CommandBarPage').CommandBarPage,
          key: 'CommandBar',
          name: 'CommandBar',
          url: '#/examples/commandbar'
        },
        {
          component: require<any>('./components/pages/ContextualMenuPage').ContextualMenuPage,
          key: 'ContextualMenu',
          name: 'ContextualMenu',
          url: '#/examples/contextmenu'
        },
        {
          component: require<any>('./components/pages/DatePickerPage').DatePickerPage,
          key: 'DatePicker',
          name: 'DatePicker',
          url: '#/examples/datepicker'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListPage').DetailsListPage,
          key: 'DetailsList',
          name: 'DetailsList',
          url: '#/examples/detailslist'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListBasicPage').DetailsListBasicPage,
          key: 'DetailsList - Basic',
          name: 'DetailsList - Basic',
          url: '#/examples/detailslist/basic'
        },

        {
          component: require<any>('./components/pages/DetailsList/DetailsListAdvancedPage').DetailsListAdvancedPage,
          key: 'DetailsList - Advanced',
          name: 'DetailsList - Advanced',
          url: '#/examples/detailslist/advanced'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListCompactPage').DetailsListCompactPage,
          key: 'DetailsList - Compact',
          name: 'DetailsList - Compact',
          url: '#/examples/detailslist/Compact'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListCustomColumnsPage').DetailsListCustomColumnsPage,
          key: 'DetailsList - CustomColumns',
          name: 'DetailsList - CustomColumns',
          url: '#/examples/detailslist/CustomColumns'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListCustomGroupHeadersPage').DetailsListCustomGroupHeadersPage,
          key: 'DetailsList - CustomGroupHeaders',
          name: 'DetailsList - CustomGroupHeaders',
          url: '#/examples/detailslist/CustomGroupHeaders'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListCustomRowsPage').DetailsListCustomRowsPage,
          key: 'DetailsList - CustomRows',
          name: 'DetailsList - CustomRows',
          url: '#/examples/detailslist/CustomRows'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListCustomFooterPage').DetailsListCustomFooterPage,
          key: 'DetailsList - CustomFooter',
          name: 'DetailsList - CustomFooter',
          url: '#/examples/detailslist/CustomFooter'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListDragDropPage').DetailsListDragDropPage,
          key: 'DetailsList - DragDrop',
          name: 'DetailsList - DragDrop',
          url: '#/examples/detailslist/DragDrop'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListLargeGroupedPage').DetailsListLargeGroupedPage,
          key: 'DetailsList - LargeGrouped',
          name: 'DetailsList - LargeGrouped',
          url: '#/examples/detailslist/LargeGrouped'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListNavigatingFocusPage').DetailsListNavigatingFocusPage,
          key: 'DetailsList - NavigatingFocus',
          name: 'DetailsList - NavigatingFocus',
          url: '#/examples/detailslist/NavigatingFocus'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListShimmerPage').DetailsListShimmerPage,
          key: 'DetailsList - Shimmer',
          name: 'DetailsList - Shimmer',
          url: '#/examples/detailslist/Shimmer'
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListSimpleGroupedPage').DetailsListSimpleGroupedPage,
          key: 'DetailsList - SimpleGrouped',
          name: 'DetailsList - SimpleGrouped',
          url: '#/examples/detailslist/SimpleGrouped'
        },
        {
          component: require<any>('./components/pages/DialogPage').DialogPage,
          key: 'Dialog',
          name: 'Dialog',
          url: '#/examples/dialog'
        },
        {
          component: require<any>('./components/pages/DividerPage').DividerPage,
          key: 'Divider',
          name: 'Divider',
          url: '#/examples/Divider'
        },
        {
          component: require<any>('./components/pages/DocumentCardPage').DocumentCardPage,
          key: 'DocumentCard',
          name: 'DocumentCard',
          url: '#/examples/documentcard'
        },
        {
          component: require<any>('./components/pages/DropdownPage').DropdownPage,
          key: 'Dropdown',
          name: 'Dropdown',
          url: '#/examples/dropdown'
        },
        {
          component: require<any>('./components/pages/FacepilePage').FacepilePage,
          key: 'Facepile',
          name: 'Facepile',
          url: '#/examples/facepile'
        },
        {
          component: require<any>('./components/pages/FloatingPeoplePickerPage').FloatingPeoplePickerPage,
          key: 'FloatingPeoplePicker',
          name: 'FloatingPeoplePicker',
          url: '#examples/floatingpeoplepicker'
        },
        {
          component: require<any>('./components/pages/GroupedListPage').GroupedListPage,
          key: 'GroupedList',
          name: 'GroupedList',
          url: '#examples/groupedlist'
        },
        {
          component: require<any>('./components/pages/HoverCardPage').HoverCardPage,
          key: 'HoverCard',
          name: 'HoverCard',
          url: '#/examples/hovercard'
        },
        {
          component: require<any>('./components/pages/IconPage').IconPage,
          key: 'Icon',
          name: 'Icon',
          url: '#/examples/icon'
        },
        {
          component: require<any>('./components/pages/ImagePage').ImagePage,
          key: 'Image',
          name: 'Image',
          url: '#/examples/image'
        },
        {
          component: require<any>('./components/pages/KeytipsPage').KeytipsPage,
          key: 'Keytips',
          name: 'Keytips',
          url: '#/examples/keytips'
        },
        {
          component: require<any>('./components/pages/LabelPage').LabelPage,
          key: 'Label',
          name: 'Label',
          url: '#/examples/label'
        },
        {
          component: require<any>('./components/pages/LayerPage').LayerPage,
          key: 'Layer',
          name: 'Layer',
          url: '#/examples/layer'
        },
        {
          component: require<any>('./components/pages/LinkPage').LinkPage,
          key: 'Link',
          name: 'Link',
          url: '#/examples/link'
        },
        {
          component: require<any>('./components/pages/ListPage').ListPage,
          key: 'List',
          name: 'List',
          url: '#/examples/list'
        },
        {
          component: require<any>('./components/pages/MessageBarPage').MessageBarPage,
          key: 'MessageBar',
          name: 'MessageBar',
          url: '#/examples/messagebar'
        },
        {
          component: require<any>('./components/pages/ModalPage').ModalPage,
          key: 'Modal',
          name: 'Modal',
          url: '#/examples/modal'
        },
        {
          component: require<any>('./components/pages/NavPage').NavPage,
          key: 'Nav',
          name: 'Nav',
          url: '#/examples/nav'
        },
        {
          component: require<any>('./components/pages/OverflowSetPage').OverflowSetPage,
          key: 'OverflowSet',
          name: 'OverflowSet',
          url: '#/examples/overflowset'
        },
        {
          component: require<any>('./components/pages/OverlayPage').OverlayPage,
          key: 'Overlay',
          name: 'Overlay',
          url: '#/examples/overlay'
        },
        {
          component: require<any>('./components/pages/PanelPage').PanelPage,
          key: 'Panel',
          name: 'Panel',
          url: '#/examples/panel'
        },
        {
          component: require<any>('./components/pages/PeoplePickerPage').PeoplePickerPage,
          key: 'PeoplePicker',
          name: 'PeoplePicker',
          url: '#/examples/PeoplePicker'
        },
        {
          component: require<any>('./components/pages/PersonaPage').PersonaPage,
          key: 'Persona',
          name: 'Persona',
          url: '#/examples/persona'
        },
        {
          component: require<any>('./components/pages/PickersPage').PickersPage,
          key: 'Pickers',
          name: 'Pickers',
          url: '#/examples/pickers'
        },
        {
          component: require<any>('./components/pages/PivotPage').PivotPage,
          key: 'Pivot',
          name: 'Pivot',
          url: '#/examples/pivot'
        },
        {
          component: require<any>('./components/pages/ProgressIndicatorPage').ProgressIndicatorPage,
          key: 'ProgressIndicator',
          name: 'ProgressIndicator',
          url: '#/examples/progressindicator'
        },
        {
          component: require<any>('./components/pages/RatingPage').RatingPage,
          key: 'Rating',
          name: 'Rating',
          url: '#/examples/rating'
        },
        {
          component: require<any>('./components/pages/ResizeGroupPage').ResizeGroupPage,
          key: 'ResizeGroup',
          name: 'ResizeGroup',
          url: '#/examples/resizegroup'
        },
        {
          component: require<any>('./components/pages/ScrollablePanePage').ScrollablePanePage,
          key: 'ScrollablePane',
          name: 'ScrollablePane',
          url: '#/examples/scrollablepane'
        },
        {
          component: require<any>('./components/pages/SearchBoxPage').SearchBoxPage,
          key: 'SearchBox',
          name: 'SearchBox',
          url: '#/examples/searchbox'
        },
        {
          component: require<any>('./components/pages/SelectedPeopleListPage').SelectedPeopleListPage,
          key: 'SelectedPeopleList',
          name: 'SelectedPeopleList',
          url: '#examples/selectedpeoplelist'
        },
        {
          component: require<any>('./components/pages/ShimmerPage').ShimmerPage,
          key: 'Shimmer',
          name: 'Shimmer',
          url: '#/examples/shimmer'
        },
        {
          component: require<any>('./components/pages/SliderPage').SliderPage,
          key: 'Slider',
          name: 'Slider',
          url: '#/examples/slider'
        },
        {
          component: require<any>('./components/pages/SpinButtonPage').SpinButtonPage,
          key: 'SpinButton',
          name: 'SpinButton',
          url: '#/examples/spinbutton'
        },
        {
          component: require<any>('./components/pages/SpinnerPage').SpinnerPage,
          key: 'Spinner',
          name: 'Spinner',
          url: '#/examples/spinner'
        },
        {
          component: require<any>('./components/pages/StackPage').StackPage,
          key: 'Stack',
          name: 'Stack',
          url: '#/examples/stack'
        },
        {
          component: require<any>('./components/pages/SwatchColorPickerPage').SwatchColorPickerPage,
          key: 'SwatchColorPicker',
          name: 'SwatchColorPicker',
          url: '#/examples/swatchcolorpicker'
        },
        {
          component: require<any>('./components/pages/TeachingBubblePage').TeachingBubblePage,
          key: 'TeachingBubble',
          name: 'TeachingBubble',
          url: '#/examples/teachingbubble'
        },
        {
          component: require<any>('./components/pages/TextPage').TextPage,
          key: 'Text',
          name: 'Text',
          url: '#/examples/text'
        },
        {
          component: require<any>('./components/pages/TextFieldPage').TextFieldPage,
          key: 'TextField',
          name: 'TextField',
          url: '#/examples/textfield'
        },
        {
          component: require<any>('./components/pages/TogglePage').TogglePage,
          key: 'Toggle',
          name: 'Toggle',
          url: '#/examples/toggle'
        },
        {
          component: require<any>('./components/pages/TooltipPage').TooltipPage,
          key: 'Tooltip',
          name: 'Tooltip',
          url: '#/examples/Tooltip'
        }
      ],
      name: 'Basic components'
    },
    {
      links: [
        {
          component: require<any>('./components/pages/ExtendedPeoplePickerPage').ExtendedPeoplePickerPage,
          key: 'ExtendedPeoplePicker',
          name: 'ExtendedPeoplePicker',
          url: '#examples/extendedpeoplepicker'
        }
      ],
      name: 'Extended components'
    },
    {
      links: [
        {
          component: require<any>('./components/pages/FocusTrapZonePage').FocusTrapZonePage,
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#examples/focustrapzone'
        },
        {
          component: require<any>('./components/pages/FocusZonePage').FocusZonePage,
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#examples/focuszone'
        },
        {
          component: require<any>('./components/pages/MarqueeSelectionPage').MarqueeSelectionPage,
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          url: '#examples/marqueeselection'
        },
        {
          component: require<any>('./components/pages/SelectionPage').SelectionPage,
          key: 'Selection',
          name: 'Selection',
          url: '#examples/selection'
        },
        {
          component: require<any>('./components/pages/ThemePage').ThemePage,
          key: 'Theme',
          name: 'Themes',
          url: '#examples/themes'
        },
        {
          component: require<any>('./components/pages/ColorsPage').ColorsPage,
          key: 'Colors',
          name: 'Colors',
          url: '#examples/themegenerator'
        },
        {
          component: require<any>('./ComponentStatus/ComponentStatusPage').ComponentStatusPage,
          key: 'Components Status',
          name: 'Components Checklist',
          url: '#/components-status'
        }
      ],
      name: 'Utilities'
    },
    {
      links: [
        {
          component: require<any>('./components/pages/Announced/AnnouncedPage').AnnouncedPage,
          key: 'Announced',
          name: 'Announced',
          url: '#/examples/announced'
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedQuickActionsPage').AnnouncedQuickActionsPage,
          key: 'Announced - Quick Actions',
          name: 'Announced - Quick Actions',
          url: '#/examples/announced/quickactions'
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedSearchResultsPage').AnnouncedSearchResultsPage,
          key: 'Announced - Search Results',
          name: 'Announced - Search Results',
          url: '#/examples/announced/searchresults'
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedLazyLoadingPage').AnnouncedLazyLoadingPage,
          key: 'Announced - Lazy Loading',
          name: 'Announced - Lazy Loading',
          url: '#/examples/announced/lazyloading'
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedBulkOperationsPage').AnnouncedBulkOperationsPage,
          key: 'Announced - Bulk Operations',
          name: 'Announced - Bulk Operations',
          url: '#/examples/announced/bulkoperations'
        }
      ],
      name: 'Accessibility'
    }
  ],

  headerLinks: [
    {
      name: 'Getting started',
      url: '#/'
    },
    {
      name: 'Components Checklist',
      url: '#/components-status'
    },
    {
      name: 'Fabric',
      url: 'http://dev.office.com/fabric'
    },
    {
      name: 'Github',
      url: 'http://www.github.com/officedev'
    }
  ]
};

export const App = (props: IAppProps) => <AppBase appDefinition={AppDefinition} {...props} />;
