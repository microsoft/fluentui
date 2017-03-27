import * as React from 'react';
import { App as AppBase, IAppDefinition } from '@uifabric/example-app-base';
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
          getComponent: cb => cb(require<any>('../components/Breadcrumb/BreadcrumbPage').BreadcrumbPage),
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb'
        },
        {
          getComponent: cb => cb(require<any>('../components/Button/ButtonPage').ButtonPage),
          key: 'Button',
          name: 'Button',
          url: '#/examples/button'
        },
        {
          getComponent: cb => cb(require<any>('../components/Calendar/CalendarPage').CalendarPage),
          key: 'Calendar',
          name: 'Calendar',
          url: '#/examples/calendar'
        },
        {
          getComponent: cb => cb(require<any>('../components/Callout/CalloutPage').CalloutPage),
          key: 'Callout',
          name: 'Callout',
          url: '#/examples/callout'
        },
        {
          getComponent: cb => cb(require<any>('../components/Checkbox/CheckboxPage').CheckboxPage),
          key: 'Checkbox',
          name: 'Checkbox',
          url: '#/examples/checkbox'
        },
        {
          getComponent: cb => cb(require<any>('../components/ChoiceGroup/ChoiceGroupPage').ChoiceGroupPage),
          key: 'ChoiceGroup',
          name: 'ChoiceGroup',
          url: '#/examples/choicegroup'
        },
        {
          getComponent: cb => cb(require<any>('../components/CommandBar/CommandBarPage').CommandBarPage),
          key: 'CommandBar',
          name: 'CommandBar',
          url: '#/examples/commandbar'
        },
        {
          getComponent: cb => cb(require<any>('../components/ContextualMenu/ContextualMenuPage').ContextualMenuPage),
          key: 'ContextualMenu',
          name: 'ContextualMenu',
          url: '#/examples/contextmenu'
        },
        {
          getComponent: cb => cb(require<any>('../components/DatePicker/DatePickerPage').DatePickerPage),
          key: 'DatePicker',
          name: 'DatePicker',
          url: '#/examples/datepicker'
        },
        {
          getComponent: cb => cb(require<any>('../components/DetailsList/DetailsListPage').DetailsListPage),
          key: 'DetailsList',
          name: 'DetailsList',
          url: '#/examples/detailslist'
        },
        {
          getComponent: cb => cb(require<any>('../components/Dialog/DialogPage').DialogPage),
          key: 'Dialog',
          name: 'Dialog',
          url: '#/examples/dialog'
        },
        {
          getComponent: cb => cb(require<any>('../components/DocumentCard/DocumentCardPage').DocumentCardPage),
          key: 'DocumentCard',
          name: 'DocumentCard',
          url: '#/examples/documentcard'
        },
        {
          getComponent: cb => cb(require<any>('../components/Dropdown/DropdownPage').DropdownPage),
          key: 'Dropdown',
          name: 'Dropdown',
          url: '#/examples/dropdown'
        },
        {
          getComponent: cb => cb(require<any>('../components/Facepile/FacepilePage').FacepilePage),
          key: 'Facepile',
          name: 'Facepile',
          url: '#/examples/facepile'
        },
        {
          getComponent: cb => cb(require<any>('../components/Icon/IconPage').IconPage),
          key: 'Icon',
          name: 'Icon',
          url: '#/examples/icon'
        },
        {
          getComponent: cb => cb(require<any>('../components/Label/LabelPage').LabelPage),
          key: 'Label',
          name: 'Label',
          url: '#/examples/label'
        },
        {
          getComponent: cb => cb(require<any>('../components/Link/LinkPage').LinkPage),
          key: 'Link',
          name: 'Link',
          url: '#/examples/link'
        },
        {
          getComponent: cb => cb(require<any>('../components/List/ListPage').ListPage),
          key: 'List',
          name: 'List',
          url: '#/examples/list'
        },
        {
          getComponent: cb => cb(require<any>('../components/MessageBar/MessageBarPage').MessageBarPage),
          key: 'MessageBar',
          name: 'MessageBar',
          url: '#/examples/messagebar'
        },
        {
          getComponent: cb => cb(require<any>('../components/OverflowSet/OverflowSetPage').OverflowSetPage),
          key: 'OverflowSet',
          name: 'OverflowSet',
          url: '#/examples/overflowSet'
        },
        {
          getComponent: cb => cb(require<any>('../components/Overlay/OverlayPage').OverlayPage),
          key: 'Overlay',
          name: 'Overlay',
          url: '#/examples/overlay'
        },
        {
          getComponent: cb => cb(require<any>('../components/Panel/PanelPage').PanelPage),
          key: 'Panel',
          name: 'Panel',
          url: '#/examples/panel'
        },
        {
          getComponent: cb => cb(require<any>('../components/pickers/PickersPage').PickersPage),
          key: 'Pickers',
          name: 'Pickers',
          url: '#/examples/pickers'
        },
        {
          getComponent: cb => cb(require<any>('../components/pickers/PeoplePicker/PeoplePickerPage').PeoplePickerPage),
          key: 'PeoplePicker',
          name: 'PeoplePicker',
          url: '#/examples/PeoplePicker'
        },
        {
          getComponent: cb => cb(require<any>('../components/Persona/PersonaPage').PersonaPage),
          key: 'Persona',
          name: 'Persona',
          url: '#/examples/persona'
        },
        {
          getComponent: cb => cb(require<any>('../components/Pivot/PivotPage').PivotPage),
          key: 'Pivot',
          name: 'Pivot',
          url: '#/examples/pivot'
        },
        {
          getComponent: cb => cb(require<any>('../components/ProgressIndicator/ProgressIndicatorPage').ProgressIndicatorPage),
          key: 'ProgressIndicator',
          name: 'ProgressIndicator',
          url: '#/examples/progressindicator'
        },
        {
          getComponent: cb => cb(require<any>('../components/Rating/RatingPage').RatingPage),
          key: 'Rating',
          name: 'Rating',
          url: '#/examples/rating'
        },
        {
          getComponent: cb => cb(require<any>('../components/SearchBox/SearchBoxPage').SearchBoxPage),
          key: 'SearchBox',
          name: 'SearchBox',
          url: '#/examples/searchbox'
        },
        {
          getComponent: cb => cb(require<any>('../components/Spinner/SpinnerPage').SpinnerPage),
          key: 'Spinner',
          name: 'Spinner',
          url: '#/examples/spinner'
        },
        {
          getComponent: cb => cb(require<any>('../components/TeachingBubble/TeachingBubblePage').TeachingBubblePage),
          key: 'TeachingBubble',
          name: 'TeachingBubble',
          url: '#/examples/teachingbubble'
        },
        {
          getComponent: cb => cb(require<any>('../components/TextField/TextFieldPage').TextFieldPage),
          key: 'TextField',
          name: 'TextField',
          url: '#/examples/textfield'
        },
        {
          getComponent: cb => cb(require<any>('../components/Toggle/TogglePage').TogglePage),
          key: 'Toggle',
          name: 'Toggle',
          url: '#/examples/toggle'
        },
        {
          getComponent: cb => cb(require<any>('../components/Tooltip/TooltipPage').TooltipPage),
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
          getComponent: cb => cb(require<any>('../components/ColorPicker/ColorPickerPage').ColorPickerPage),
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker'
        },
        {
          getComponent: cb => cb(require<any>('../components/GroupedList/GroupedListPage').GroupedListPage),
          key: 'GroupedList',
          name: 'GroupedList',
          url: '#examples/groupedlist'
        },
        {
          getComponent: cb => cb(require<any>('../components/Image/ImagePage').ImagePage),
          key: 'Image',
          name: 'Image',
          url: '#/examples/image'
        },
        {
          getComponent: cb => cb(require<any>('../components/Layer/LayerPage').LayerPage),
          key: 'Layer',
          name: 'Layer',
          url: '#/examples/layer'
        },
        {
          getComponent: cb => cb(require<any>('../components/Nav/NavPage').NavPage),
          key: 'Nav',
          name: 'Nav',
          url: '#/examples/nav'
        },
        {
          getComponent: cb => cb(require<any>('../components/Slider/SliderPage').SliderPage),
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
          getComponent: cb => cb(require<any>('../components/FocusTrapZone/FocusTrapZonePage').FocusTrapZonePage),
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#examples/focustrapzone'
        },
        {
          getComponent: cb => cb(require<any>('../components/FocusZone/FocusZonePage').FocusZonePage),
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#examples/focuszone'
        },
        {
          getComponent: cb => cb(require<any>('../components/MarqueeSelection/MarqueeSelectionPage').MarqueeSelectionPage),
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          url: '#examples/marqueeselection'
        },
        {
          getComponent: cb => cb(require<any>('../utilities/selection/SelectionPage').SelectionPage),
          key: 'Selection',
          name: 'Selection',
          url: '#examples/selection'
        },
        {
          getComponent: cb => cb(require<any>('../components/Theme/ThemePage').ThemePage),
          key: 'Theme',
          name: 'Themes',
          url: '#examples/themes'
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
      name: 'Fabric',
      url: 'http://dev.office.com/fabric'
    },
    {
      name: 'Github',
      url: 'http://www.github.com/officedev'
    }
  ]

};

export const App = (props) => <AppBase appDefinition={ AppDefinition } { ...props } />;
