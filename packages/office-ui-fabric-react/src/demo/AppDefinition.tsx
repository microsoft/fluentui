import * as React from 'react';
import { App as AppBase, IAppDefinition, IAppProps } from '@uifabric/example-app-base';
import { DetailsListBasicExample } from '../components/DetailsList/examples/DetailsList.Basic.Example';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fabric - React',

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
          component: require<any>('../components/ActivityItem/ActivityItemPage').ActivityItemPage,
          key: 'ActivityItem',
          name: 'ActivityItem',
          url: '#/examples/activityitem'
        },
        {
          component: require<any>('../components/Breadcrumb/BreadcrumbPage').BreadcrumbPage,
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb'
        },
        {
          component: require<any>('../components/Button/ButtonPage').ButtonPage,
          key: 'Button',
          name: 'Button',
          url: '#/examples/button'
        },
        {
          component: require<any>('../components/Calendar/CalendarPage').CalendarPage,
          key: 'Calendar',
          name: 'Calendar',
          url: '#/examples/calendar'
        },
        {
          component: require<any>('../components/Callout/CalloutPage').CalloutPage,
          key: 'Callout',
          name: 'Callout',
          url: '#/examples/callout'
        },
        {
          component: require<any>('../components/Checkbox/CheckboxPage').CheckboxPage,
          key: 'Checkbox',
          name: 'Checkbox',
          url: '#/examples/checkbox'
        },
        {
          component: require<any>('../components/ChoiceGroup/ChoiceGroupPage').ChoiceGroupPage,
          key: 'ChoiceGroup',
          name: 'ChoiceGroup',
          url: '#/examples/choicegroup'
        },
        {
          component: require<any>('../components/ComboBox/ComboBoxPage').ComboBoxPage,
          key: 'ComboBox',
          name: 'ComboBox',
          url: '#/examples/ComboBox'
        },
        {
          component: require<any>('../components/CommandBar/CommandBarPage').CommandBarPage,
          key: 'CommandBar',
          name: 'CommandBar',
          url: '#/examples/commandbar'
        },
        {
          component: require<any>('../components/ContextualMenu/ContextualMenuPage').ContextualMenuPage,
          key: 'ContextualMenu',
          name: 'ContextualMenu',
          url: '#/examples/contextmenu'
        },
        {
          component: require<any>('../components/DatePicker/DatePickerPage').DatePickerPage,
          key: 'DatePicker',
          name: 'DatePicker',
          url: '#/examples/datepicker'
        },
        {
          component: require<any>('../components/DetailsList/DetailsListPage').DetailsListPage,
          key: 'DetailsList',
          name: 'DetailsList',
          url: '#/examples/detailslist'
        },
        {
          component: require<any>('../components/Dialog/DialogPage').DialogPage,
          key: 'Dialog',
          name: 'Dialog',
          url: '#/examples/dialog'
        },
        {
          component: require<any>('../components/DocumentCard/DocumentCardPage').DocumentCardPage,
          key: 'DocumentCard',
          name: 'DocumentCard',
          url: '#/examples/documentcard'
        },
        {
          component: require<any>('../components/Dropdown/DropdownPage').DropdownPage,
          key: 'Dropdown',
          name: 'Dropdown',
          url: '#/examples/dropdown'
        },
        {
          component: require<any>('../components/Facepile/FacepilePage').FacepilePage,
          key: 'Facepile',
          name: 'Facepile',
          url: '#/examples/facepile'
        },
        {
          component: require<any>('../components/HoverCard/HoverCardPage').HoverCardPage,
          key: 'HoverCard',
          name: 'HoverCard',
          url: '#/examples/hovercard'
        },
        {
          component: require<any>('../components/Icon/IconPage').IconPage,
          key: 'Icon',
          name: 'Icon',
          url: '#/examples/icon'
        },
        {
          component: require<any>('../components/Label/LabelPage').LabelPage,
          key: 'Label',
          name: 'Label',
          url: '#/examples/label'
        },
        {
          component: require<any>('../components/Link/LinkPage').LinkPage,
          key: 'Link',
          name: 'Link',
          url: '#/examples/link'
        },
        {
          component: require<any>('../components/List/ListPage').ListPage,
          key: 'List',
          name: 'List',
          url: '#/examples/list'
        },
        {
          component: require<any>('../components/MessageBar/MessageBarPage').MessageBarPage,
          key: 'MessageBar',
          name: 'MessageBar',
          url: '#/examples/messagebar'
        },
        {
          component: require<any>('../components/Modal/ModalPage').ModalPage,
          key: 'Modal',
          name: 'Modal',
          url: '#/examples/modal'
        },
        {
          component: require<any>('../components/Overlay/OverlayPage').OverlayPage,
          key: 'Overlay',
          name: 'Overlay',
          url: '#/examples/overlay'
        },
        {
          component: require<any>('../components/OverflowSet/OverflowSetPage').OverflowSetPage,
          key: 'OverflowSet',
          name: 'OverflowSet',
          url: '#/examples/overflowset'
        },
        {
          component: require<any>('../components/Panel/PanelPage').PanelPage,
          key: 'Panel',
          name: 'Panel',
          url: '#/examples/panel'
        },
        {
          component: require<any>('../components/pickers/PickersPage').PickersPage,
          key: 'Pickers',
          name: 'Pickers',
          url: '#/examples/pickers'
        },
        {
          component: require<any>('../components/pickers/PeoplePicker/PeoplePickerPage').PeoplePickerPage,
          key: 'PeoplePicker',
          name: 'PeoplePicker',
          url: '#/examples/PeoplePicker'
        },
        {
          component: require<any>('../components/Persona/PersonaPage').PersonaPage,
          key: 'Persona',
          name: 'Persona',
          url: '#/examples/persona'
        },
        {
          component: require<any>('../components/Pivot/PivotPage').PivotPage,
          key: 'Pivot',
          name: 'Pivot',
          url: '#/examples/pivot'
        },
        {
          component: require<any>('../components/ProgressIndicator/ProgressIndicatorPage').ProgressIndicatorPage,
          key: 'ProgressIndicator',
          name: 'ProgressIndicator',
          url: '#/examples/progressindicator'
        },
        {
          component: require<any>('../components/Rating/RatingPage').RatingPage,
          key: 'Rating',
          name: 'Rating',
          url: '#/examples/rating'
        },
        {
          component: require<any>('../components/ResizeGroup/ResizeGroupPage').ResizeGroupPage,
          key: 'ResizeGroup',
          name: 'ResizeGroup',
          url: '#/examples/resizegroup'
        },
        {
          component: require<any>('../components/ScrollablePane/ScrollablePanePage').ScrollablePanePage,
          key: 'ScrollablePane',
          name: 'ScrollablePane',
          url: '#/examples/scrollablepane'
        },
        {
          component: require<any>('../components/SearchBox/SearchBoxPage').SearchBoxPage,
          key: 'SearchBox',
          name: 'SearchBox',
          url: '#/examples/searchbox'
        },
        {
          component: require<any>('../components/SpinButton/SpinButtonPage').SpinButtonPage,
          key: 'SpinButton',
          name: 'SpinButton',
          url: '#/examples/spinbutton'
        },
        {
          component: require<any>('../components/Spinner/SpinnerPage').SpinnerPage,
          key: 'Spinner',
          name: 'Spinner',
          url: '#/examples/spinner'
        },
        {
          component: require<any>('../components/SwatchColorPicker/SwatchColorPickerPage').SwatchColorPickerPage,
          key: 'SwatchColorPicker',
          name: 'SwatchColorPicker',
          url: '#/examples/swatchcolorpicker'
        },
        {
          component: require<any>('../components/TeachingBubble/TeachingBubblePage').TeachingBubblePage,
          key: 'TeachingBubble',
          name: 'TeachingBubble',
          url: '#/examples/teachingbubble'
        },
        {
          component: require<any>('../components/TextField/TextFieldPage').TextFieldPage,
          key: 'TextField',
          name: 'TextField',
          url: '#/examples/textfield'
        },
        {
          component: require<any>('../components/Toggle/TogglePage').TogglePage,
          key: 'Toggle',
          name: 'Toggle',
          url: '#/examples/toggle'
        },
        {
          component: require<any>('../components/Tooltip/TooltipPage').TooltipPage,
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
          component: require<any>('../components/ColorPicker/ColorPickerPage').ColorPickerPage,
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker'
        },
        {
          component: require<any>('../components/GroupedList/GroupedListPage').GroupedListPage,
          key: 'GroupedList',
          name: 'GroupedList',
          url: '#examples/groupedlist'
        },
        {
          component: require<any>('../components/Image/ImagePage').ImagePage,
          key: 'Image',
          name: 'Image',
          url: '#/examples/image'
        },
        {
          component: require<any>('../components/Layer/LayerPage').LayerPage,
          key: 'Layer',
          name: 'Layer',
          url: '#/examples/layer'
        },
        {
          component: require<any>('../components/Nav/NavPage').NavPage,
          key: 'Nav',
          name: 'Nav',
          url: '#/examples/nav'
        },
        {
          component: require<any>('../components/Slider/SliderPage').SliderPage,
          key: 'Slider',
          name: 'Slider',
          url: '#/examples/slider'
        }
      ],
      name: 'Extended components'
    },
    {
      links: [
        {
          component: require<any>('../components/FocusTrapZone/FocusTrapZonePage').FocusTrapZonePage,
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#examples/focustrapzone'
        },
        {
          component: require<any>('../components/FocusZone/FocusZonePage').FocusZonePage,
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#examples/focuszone'
        },
        {
          component: require<any>('../components/MarqueeSelection/MarqueeSelectionPage').MarqueeSelectionPage,
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          url: '#examples/marqueeselection'
        },
        {
          component: require<any>('../utilities/selection/SelectionPage').SelectionPage,
          key: 'Selection',
          name: 'Selection',
          url: '#examples/selection'
        },
        {
          component: require<any>('../components/Theme/ThemePage').ThemePage,
          key: 'Theme',
          name: 'Themes',
          url: '#examples/themes'
        },
        {
          component: require<any>('../components/ThemeGenerator/ThemeGeneratorPage').ThemeGeneratorPage,
          key: 'Theme Generator',
          name: 'Beta Theme Generator',
          url: '#examples/themeGenerator'
        },
        {
          component: require<any>('./ComponentStatus/ComponentStatusPage').ComponentStatusPage,
          key: 'Components Status',
          name: 'Components Checklist',
          url: '#/components-status'
        }
      ],
      name: 'Utilities'
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
