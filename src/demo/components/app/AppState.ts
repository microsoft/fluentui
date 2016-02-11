import * as React from 'react';

import BreadcrumbExample from '../../pages/examples/BreadcrumbExample';
import ButtonExample from '../../pages/examples/ButtonExample';
import CalloutExample from '../../pages/examples/CalloutExample';
import ChoiceFieldExample from '../../pages/examples/ChoiceFieldExample';
import CommandBarExample from '../../pages/examples/CommandBarExample';
import ContextualMenuExample from '../../pages/examples/ContextualMenuExample';
import DatePickerExample from '../../pages/examples/DatePickerExample';
import DialogExample from '../../pages/examples/DialogExample';
import DropdownExample from '../../pages/examples/DropdownExample';
import LabelExample from '../../pages/examples/LabelExample';
import LinkExample from '../../pages/examples/LinkExample';
import ListExample from '../../pages/examples/ListExample';
import ListItemExample from '../../pages/examples/ListItemExample';
import NavBarExample from '../../pages/examples/NavBarExample';
import OrgChartExample from '../../pages/examples/OrgChartExample';
import OverlayExample from '../../pages/examples/OverlayExample';
import PanelExample from '../../pages/examples/PanelExample';
import PeoplePickerExample from '../../pages/examples/PeoplePickerExample';
import PersonaCardExample from '../../pages/examples/PersonaCardExample';
import PersonaExample from '../../pages/examples/PersonaExample';
import PivotExample from '../../pages/examples/PivotExample';
import ProgressIndicatorExample from '../../pages/examples/ProgressIndicatorExample';
import SearchBoxExample from '../../pages/examples/SearchBoxExample';
import SpinnerExample from '../../pages/examples/SpinnerExample';
import TableExample from '../../pages/examples/TableExample';
import TextFieldExample from '../../pages/examples/TextFieldExample';
import ToggleExample from '../../pages/examples/ToggleExample';

export enum ExampleStatus {
  placeholder,
  started,
  beta,
  release
}

export interface ILink {
  name: string;
  url: string;
  component?: any;
  status?: ExampleStatus
}

export interface ILinkGroup {
  name: string;
  links: ILink[];
}

export interface IAppState {
  appTitle: string;
  headerLinks: ILink[];
  examplePages: ILinkGroup[];
}

const AppState: IAppState = {
  appTitle: 'Office UI Fabric - React components',

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
  ],

  examplePages: [
    {
      name: 'Basic components',
      links: [
        {
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb',
          component: BreadcrumbExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Button',
          url: '#/examples/button',
          component: ButtonExample,
          status: ExampleStatus.started
        },
        {
          name: 'Callout',
          url: '#/examples/callout',
          component: CalloutExample,
          status: ExampleStatus.started
        },
        {
          name: 'ChoiceField',
          url: '#/examples/choicefield',
          component: ChoiceFieldExample,
          status: ExampleStatus.started
        },
        {
          name: 'CommandBar',
          url: '#/examples/commandbar',
          component: CommandBarExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'ContextualMenu',
          url: '#/examples/contextmenu',
          component: ContextualMenuExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'DatePicker',
          url: '#/examples/datepicker',
          component: DatePickerExample,
          status: ExampleStatus.started
        },
        {
          name: 'Dialog',
          url: '#/examples/dialog',
          component: DialogExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Dropdown',
          url: '#/examples/dropdown',
          component: DropdownExample,
          status: ExampleStatus.started
        },
        {
          name: 'Label',
          url: '#/examples/label',
          component: LabelExample,
          status: ExampleStatus.started
        },
        {
          name: 'Link',
          url: '#/examples/link',
          component: LinkExample,
          status: ExampleStatus.beta
        },
        {
          name: 'List',
          url: '#/examples/list',
          component: ListExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'ListItem',
          url: '#/examples/listitem',
          component: ListItemExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'NavBar',
          url: '#/examples/navbar',
          component: NavBarExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'OrgChart',
          url: '#/examples/orgchart',
          component: OrgChartExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Overlay',
          url: '#/examples/overlay',
          component: OverlayExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Panel',
          url: '#/examples/panel',
          component: PanelExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'PeoplePicker',
          url: '#/examples/peoplepicker',
          component: PeoplePickerExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Persona',
          url: '#/examples/persona',
          component: PersonaExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'PersonaCard',
          url: '#/examples/personacard',
          component: PersonaCardExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Pivot',
          url: '#/examples/pivot',
          component: PivotExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'ProgresIndicator',
          url: '#/examples/progressindicator',
          component: ProgressIndicatorExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'SearchBox',
          url: '#/examples/searchbox',
          component: SearchBoxExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Spinner',
          url: '#/examples/spinner',
          component: SpinnerExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Table',
          url: '#/examples/table',
          component: TableExample,
          status: ExampleStatus.placeholder
        },
        {
          name: 'TextField',
          url: '#/examples/textfield',
          component: TextFieldExample,
          status: ExampleStatus.started
        },
        {
          name: 'Toggle',
          url: '#/examples/toggle',
          component: ToggleExample,
          status: ExampleStatus.started
        }
      ]
    },
    {
      name: 'Utilities',
      links: [
        {
          name: 'Event groups',
          url: '#examples/eventgroup'
        },
        {
          name: 'Focus zones',
          url: '#examples/focuszone'
        },
        {
          name: 'Selection management',
          url: '#examples/selectionManagement'
        }
      ]
    }
  ]
};

export default AppState;
