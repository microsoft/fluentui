import * as React from 'react';

import BreadcrumbExample from '../../pages/examples/Breadcrumb/BreadcrumbExample';
import ButtonExample from '../../pages/examples/Button/ButtonExample';
import CalloutExample from '../../pages/examples/Callout/CalloutExample';
import CheckboxExample from '../../pages/examples/Checkbox/CheckboxExample';
import ChoiceGroupExample from '../../pages/examples/ChoiceGroup/ChoiceGroupExample';
import CommandBarExample from '../../pages/examples/CommandBar/CommandBarExample';
import ContextualMenuExample from '../../pages/examples/ContextualMenu/ContextualMenuExample';
import DatePickerExample from '../../pages/examples/DatePicker/DatePickerExample';
import DetailsListExample from '../../pages/examples/DetailsList/DetailsListExample';
import DialogExample from '../../pages/examples/Dialog/DialogExample';
import DropdownExample from '../../pages/examples/Dropdown/DropdownExample';
import LabelExample from '../../pages/examples/Label/LabelExample';
import LinkExample from '../../pages/examples/Link/LinkExample';
import ListExample from '../../pages/examples/List/ListExample';
import NavBarExample from '../../pages/examples/NavBar/NavBarExample';
import OrgChartExample from '../../pages/examples/OrgChart/OrgChartExample';
import OverlayExample from '../../pages/examples/Overlay/OverlayExample';
import PanelExample from '../../pages/examples/Panel/PanelExample';
import PeoplePickerExample from '../../pages/examples/PeoplePicker/PeoplePickerExample';
import PersonaCardExample from '../../pages/examples/PersonaCard/PersonaCardExample';
import PersonaExample from '../../pages/examples/Persona/PersonaExample';
import PivotExample from '../../pages/examples/Pivot/PivotExample';
import ProgressIndicatorExample from '../../pages/examples/ProgressIndicator/ProgressIndicatorExample';
import SearchBoxExample from '../../pages/examples/SearchBox/SearchBoxExample';
import SpinnerExample from '../../pages/examples/Spinner/SpinnerExample';
import TableExample from '../../pages/examples/Table/TableExample';
import TextFieldExample from '../../pages/examples/TextField/TextFieldExample';
import ToggleExample from '../../pages/examples/Toggle/ToggleExample';
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

const AppState: IAppState = {
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
          component: BreadcrumbExample,
          status: ExampleStatus.started
        },
        {
          name: 'Button',
          url: '#/examples/button',
          component: ButtonExample,
          status: ExampleStatus.beta
        },
        {
          name: 'Callout',
          url: '#/examples/callout',
          component: CalloutExample,
          status: ExampleStatus.started
        },
        {
          name: 'Checkbox',
          url: '#/examples/checkbox',
          component: CheckboxExample,
          status: ExampleStatus.beta
        },
        {
          name: 'ChoiceGroup',
          url: '#/examples/ChoiceGroup',
          component: ChoiceGroupExample,
          status: ExampleStatus.started
        },
        {
          name: 'CommandBar',
          url: '#/examples/commandbar',
          component: CommandBarExample,
          status: ExampleStatus.beta
        },
        {
          name: 'ContextualMenu',
          url: '#/examples/contextmenu',
          component: ContextualMenuExample,
          status: ExampleStatus.started
        },
        {
          name: 'DatePicker',
          url: '#/examples/datepicker',
          component: DatePickerExample,
          status: ExampleStatus.started
        },
        {
          name: 'DetailsList',
          url: '#/examples/detailslist',
          component: DetailsListExample,
          status: ExampleStatus.beta
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
          status: ExampleStatus.beta
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
          status: ExampleStatus.beta
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
          status: ExampleStatus.beta
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
          status: ExampleStatus.started
        },
        {
          name: 'ProgressIndicator',
          url: '#/examples/progressindicator',
          component: ProgressIndicatorExample,
          status: ExampleStatus.started
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
