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

export interface ILink {
  name: string;
  url: string;
  component?: any;
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
          component: BreadcrumbExample
        },
        {
          name: 'Button',
          url: '#/page=button',
          component: ButtonExample
        },
        {
          name: 'Callout',
          url: '#/examples/callout',
          component: CalloutExample
        },
        {
          name: 'ChoiceField',
          url: '#/examples/choicefield',
          component: ChoiceFieldExample
        },
        {
          name: 'CommandBar',
          url: '#/examples/commandbar',
          component: CommandBarExample
        },
        {
          name: 'ContextualMenu',
          url: '#/examples/contextmenu',
          component: ContextualMenuExample
        },
        {
          name: 'DatePicker',
          url: '#/examples/datepicker',
          component: DatePickerExample
        },
        {
          name: 'Dialog',
          url: '#/examples/dialog',
          component: DialogExample
        },
        {
          name: 'Dropdown',
          url: '#/examples/dropdown',
          component: DropdownExample
        },
        {
          name: 'Label',
          url: '#/examples/label',
          component: LabelExample
        },
        {
          name: 'Link',
          url: '#/examples/link',
          component: LinkExample
        },
        {
          name: 'List',
          url: '#/examples/list',
          component: ListExample
        },
        {
          name: 'ListItem',
          url: '#/examples/listitem',
          component: ListItemExample
        },
        {
          name: 'NavBar',
          url: '#/examples/navbar',
          component: NavBarExample
        },
        {
          name: 'OrgChart',
          url: '#/examples/orgchart',
          component: OrgChartExample
        },
        {
          name: 'Overlay',
          url: '#/examples/overlay',
          component: OverlayExample
        },
        {
          name: 'Panel',
          url: '#/examples/panel',
          component: PanelExample
        },
        {
          name: 'PeoplePicker',
          url: '#/examples/peoplepicker',
          component: PeoplePickerExample
        },
        {
          name: 'Persona',
          url: '#/examples/persona',
          component: PersonaExample
        },
        {
          name: 'PersonaCard',
          url: '#/examples/personacard',
          component: PersonaCardExample
        },
        {
          name: 'Pivot',
          url: '#/examples/pivot',
          component: PivotExample
        },
        {
          name: 'ProgresIndicator',
          url: '#/examples/progressindicator',
          component: ProgressIndicatorExample
        },
        {
          name: 'SearchBox',
          url: '#/examples/searchbox',
          component: SearchBoxExample
        },
        {
          name: 'Spinner',
          url: '#/examples/spinner',
          component: SpinnerExample
        },
        {
          name: 'Table',
          url: '#/examples/table',
          component: TableExample
        },
        {
          name: 'TextField',
          url: '#/examples/textfield',
          component: TextFieldExample
        },
        {
          name: 'Toggle',
          url: '#/examples/toggle',
          component: ToggleExample
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
