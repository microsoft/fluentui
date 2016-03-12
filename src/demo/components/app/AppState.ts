import * as React from 'react';

import BreadcrumbPage from '../../pages/BreadcrumbPage/BreadcrumbPage';
import ButtonPage from '../../pages/ButtonPage/ButtonPage';
import CalloutPage from '../../pages/CalloutPage/CalloutPage';
import CheckboxPage from '../../pages/CheckboxPage/CheckboxPage';
import ChoiceGroupPage from '../../pages/ChoiceGroupPage/ChoiceGroupPage';
import CommandBarPage from '../../pages/CommandBarPage/CommandBarPage';
import ContextualMenuPage from '../../pages/ContextualMenuPage/ContextualMenuPage';
import DatePickerPage from '../../pages/DatePickerPage/DatePickerPage';
import DetailsListPage from '../../pages/DetailsListPage/DetailsListPage';
import DialogPage from '../../pages/DialogPage/DialogPage';
import DropdownPage from '../../pages/DropdownPage/DropdownPage';
import FocusZonePage from '../../pages/FocusZonePage/FocusZonePage';
import LabelPage from '../../pages/LabelPage/LabelPage';
import LinkPage from '../../pages/LinkPage/LinkPage';
import ListPage from '../../pages/ListPage/ListPage';
import NavBarPage from '../../pages/NavBarPage/NavBarPage';
import OrgChartPage from '../../pages/OrgChartPage/OrgChartPage';
import OverlayPage from '../../pages/OverlayPage/OverlayPage';
import PanelPage from '../../pages/PanelPage/PanelPage';
import PeoplePickerPage from '../../pages/PeoplePickerPage/PeoplePickerPage';
import PersonaCardPage from '../../pages/PersonaCardPage/PersonaCardPage';
import PersonaPage from '../../pages/PersonaPage/PersonaPage';
import PivotPage from '../../pages/PivotPage/PivotPage';
import ProgressIndicatorPage from '../../pages/ProgressIndicatorPage/ProgressIndicatorPage';
import SearchBoxPage from '../../pages/SearchBoxPage/SearchBoxPage';
import SpinnerPage from '../../pages/SpinnerPage/SpinnerPage';
import TablePage from '../../pages/TablePage/TablePage';
import TextFieldPage from '../../pages/TextFieldPage/TextFieldPage';
import TogglePage from '../../pages/TogglePage/TogglePage';
import Themes from '../../pages/Themes';

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

export const AppState: IAppState = {
  appTitle: 'Fabric - React',

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
          component: BreadcrumbPage,
          status: ExampleStatus.started
        },
        {
          name: 'Button',
          url: '#/examples/button',
          component: ButtonPage,
          status: ExampleStatus.beta
        },
        {
          name: 'Callout',
          url: '#/examples/callout',
          component: CalloutPage,
          status: ExampleStatus.started
        },
        {
          name: 'Checkbox',
          url: '#/examples/checkbox',
          component: CheckboxPage,
          status: ExampleStatus.beta
        },
        {
          name: 'ChoiceGroup',
          url: '#/examples/ChoiceGroup',
          component: ChoiceGroupPage,
          status: ExampleStatus.started
        },
        {
          name: 'CommandBar',
          url: '#/examples/commandbar',
          component: CommandBarPage,
          status: ExampleStatus.beta
        },
        {
          name: 'ContextualMenu',
          url: '#/examples/contextmenu',
          component: ContextualMenuPage,
          status: ExampleStatus.started
        },
        {
          name: 'DatePicker',
          url: '#/examples/datepicker',
          component: DatePickerPage,
          status: ExampleStatus.started
        },
        {
          name: 'DetailsList',
          url: '#/examples/detailslist',
          component: DetailsListPage,
          status: ExampleStatus.beta
        },
        {
          name: 'Dialog',
          url: '#/examples/dialog',
          component: DialogPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Dropdown',
          url: '#/examples/dropdown',
          component: DropdownPage,
          status: ExampleStatus.beta
        },
        {
          name: 'Label',
          url: '#/examples/label',
          component: LabelPage,
          status: ExampleStatus.started
        },
        {
          name: 'Link',
          url: '#/examples/link',
          component: LinkPage,
          status: ExampleStatus.started
        },
        {
          name: 'List',
          url: '#/examples/list',
          component: ListPage,
          status: ExampleStatus.started
        },
        {
          name: 'NavBar',
          url: '#/examples/navbar',
          component: NavBarPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'OrgChart',
          url: '#/examples/orgchart',
          component: OrgChartPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Overlay',
          url: '#/examples/overlay',
          component: OverlayPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Panel',
          url: '#/examples/panel',
          component: PanelPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'PeoplePicker',
          url: '#/examples/peoplepicker',
          component: PeoplePickerPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Persona',
          url: '#/examples/persona',
          component: PersonaPage,
          status: ExampleStatus.beta
        },
        {
          name: 'PersonaCard',
          url: '#/examples/personacard',
          component: PersonaCardPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Pivot',
          url: '#/examples/pivot',
          component: PivotPage,
          status: ExampleStatus.started
        },
        {
          name: 'ProgressIndicator',
          url: '#/examples/progressindicator',
          component: ProgressIndicatorPage,
          status: ExampleStatus.beta
        },
        {
          name: 'SearchBox',
          url: '#/examples/searchbox',
          component: SearchBoxPage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'Spinner',
          url: '#/examples/spinner',
          component: SpinnerPage,
          status: ExampleStatus.beta
        },
        {
          name: 'Table',
          url: '#/examples/table',
          component: TablePage,
          status: ExampleStatus.placeholder
        },
        {
          name: 'TextField',
          url: '#/examples/textfield',
          component: TextFieldPage,
          status: ExampleStatus.started
        },
        {
          name: 'Toggle',
          url: '#/examples/toggle',
          component: TogglePage,
          status: ExampleStatus.beta
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
          url: '#examples/focuszone',
          component: FocusZonePage,
          status: ExampleStatus.started
        },
        {
          name: 'Selection management',
          url: '#examples/selectionManagement'
        },
        {
          name: 'Themes',
          url: '#examples/themes',
          component: Themes
        }
      ]
    }
  ]
};

export default AppState;
