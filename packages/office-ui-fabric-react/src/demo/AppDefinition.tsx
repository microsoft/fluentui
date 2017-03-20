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
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/BreadcrumbPage/BreadcrumbPage').BreadcrumbPage)),
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ButtonPage/ButtonPage').ButtonPage)),
          key: 'Button',
          name: 'Button',
          url: '#/examples/button'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/CalendarPage/CalendarPage').CalendarPage)),
          key: 'Calendar',
          name: 'Calendar',
          url: '#/examples/calendar'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/CalloutPage/CalloutPage').CalloutPage)),
          key: 'Callout',
          name: 'Callout',
          url: '#/examples/callout'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/CheckboxPage/CheckboxPage').CheckboxPage)),
          key: 'Checkbox',
          name: 'Checkbox',
          url: '#/examples/checkbox'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ChoiceGroupPage/ChoiceGroupPage').ChoiceGroupPage)),
          key: 'ChoiceGroup',
          name: 'ChoiceGroup',
          url: '#/examples/choicegroup'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/CommandBarPage/CommandBarPage').CommandBarPage)),
          key: 'CommandBar',
          name: 'CommandBar',
          url: '#/examples/commandbar'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ContextualMenuPage/ContextualMenuPage').ContextualMenuPage)),
          key: 'ContextualMenu',
          name: 'ContextualMenu',
          url: '#/examples/contextmenu'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/DatePickerPage/DatePickerPage').DatePickerPage)),
          key: 'DatePicker',
          name: 'DatePicker',
          url: '#/examples/datepicker'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/DetailsListPage/DetailsListPage').DetailsListPage)),
          key: 'DetailsList',
          name: 'DetailsList',
          url: '#/examples/detailslist'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/DialogPage/DialogPage').DialogPage)),
          key: 'Dialog',
          name: 'Dialog',
          url: '#/examples/dialog'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/DocumentCardPage/DocumentCardPage').DocumentCardPage)),
          key: 'DocumentCard',
          name: 'DocumentCard',
          url: '#/examples/documentcard'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/DropdownPage/DropdownPage').DropdownPage)),
          key: 'Dropdown',
          name: 'Dropdown',
          url: '#/examples/dropdown'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/FacepilePage/FacepilePage').FacepilePage)),
          key: 'Facepile',
          name: 'Facepile',
          url: '#/examples/facepile'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/IconPage/IconPage').IconPage)),
          key: 'Icon',
          name: 'Icon',
          url: '#/examples/icon'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/LabelPage/LabelPage').LabelPage)),
          key: 'Label',
          name: 'Label',
          url: '#/examples/label'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/LinkPage/LinkPage').LinkPage)),
          key: 'Link',
          name: 'Link',
          url: '#/examples/link'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ListPage/ListPage').ListPage)),
          key: 'List',
          name: 'List',
          url: '#/examples/list'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/MessageBarPage/MessageBarPage').MessageBarPage)),
          key: 'MessageBar',
          name: 'MessageBar',
          url: '#/examples/messagebar'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/OverlayPage/OverlayPage').OverlayPage)),
          key: 'Overlay',
          name: 'Overlay',
          url: '#/examples/overlay'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/PanelPage/PanelPage').PanelPage)),
          key: 'Panel',
          name: 'Panel',
          url: '#/examples/panel'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/PickersPage/PickersPage').PickersPage)),
          key: 'Pickers',
          name: 'Pickers',
          url: '#/examples/pickers'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/PeoplePickerPage/PeoplePickerPage').PeoplePickerPage)),
          key: 'PeoplePicker',
          name: 'PeoplePicker',
          url: '#/examples/PeoplePicker'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/PersonaPage/PersonaPage').PersonaPage)),
          key: 'Persona',
          name: 'Persona',
          url: '#/examples/persona'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/PivotPage/PivotPage').PivotPage)),
          key: 'Pivot',
          name: 'Pivot',
          url: '#/examples/pivot'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ProgressIndicatorPage/ProgressIndicatorPage').ProgressIndicatorPage)),
          key: 'ProgressIndicator',
          name: 'ProgressIndicator',
          url: '#/examples/progressindicator'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/RatingPage/RatingPage').RatingPage)),
          key: 'Rating',
          name: 'Rating',
          url: '#/examples/rating'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/SearchBoxPage/SearchBoxPage').SearchBoxPage)),
          key: 'SearchBox',
          name: 'SearchBox',
          url: '#/examples/searchbox'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/SpinnerPage/SpinnerPage').SpinnerPage)),
          key: 'Spinner',
          name: 'Spinner',
          url: '#/examples/spinner'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/TeachingBubblePage/TeachingBubblePage').TeachingBubblePage)),
          key: 'TeachingBubble',
          name: 'TeachingBubble',
          url: '#/examples/teachingbubble'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/TextFieldPage/TextFieldPage').TextFieldPage)),
          key: 'TextField',
          name: 'TextField',
          url: '#/examples/textfield'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/TogglePage/TogglePage').TogglePage)),
          key: 'Toggle',
          name: 'Toggle',
          url: '#/examples/toggle'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/TooltipPage/TooltipPage').TooltipPage)),
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
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ColorPickerPage/ColorPickerPage').ColorPickerPage)),
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/GroupedListPage/GroupedListPage').GroupedListPage)),
          key: 'GroupedList',
          name: 'GroupedList',
          url: '#examples/groupedlist'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ImagePage/ImagePage').ImagePage)),
          key: 'Image',
          name: 'Image',
          url: '#/examples/image'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/LayerPage/LayerPage').LayerPage)),
          key: 'Layer',
          name: 'Layer',
          url: '#/examples/layer'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/NavPage/NavPage').NavPage)),
          key: 'Nav',
          name: 'Nav',
          url: '#/examples/nav'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/SliderPage/SliderPage').SliderPage)),
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
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/FocusTrapZonePage/FocusTrapZonePage').FocusTrapZonePage)),
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#examples/focustrapzone'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/FocusZonePage/FocusZonePage').FocusZonePage)),
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#examples/focuszone'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/MarqueeSelectionPage/MarqueeSelectionPage').MarqueeSelectionPage)),
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          url: '#examples/marqueeselection'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/SelectionPage/SelectionPage').SelectionPage)),
          key: 'Selection',
          name: 'Selection',
          url: '#examples/selection'
        },
        {
          getComponent: cb => require.ensure([], () => cb(require<any>('./pages/ThemePage/ThemePage').ThemePage)),
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
