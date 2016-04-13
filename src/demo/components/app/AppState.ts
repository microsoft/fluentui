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
import { INavLink, INavLinkGroup } from '../../../components/Nav/index';
import LabelPage from '../../pages/LabelPage/LabelPage';
import LayerPage from '../../pages/LayerPage/LayerPage';
import LinkPage from '../../pages/LinkPage/LinkPage';
import ListPage from '../../pages/ListPage/ListPage';
import NavPage from '../../pages/NavPage/NavPage';
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

export interface IAppState {
  appTitle: string;
  examplePages: INavLinkGroup[];
  headerLinks: INavLink[];
}

export const AppState: IAppState = {
  appTitle: 'Fabric - React',

  examplePages: [
    {
      links: [
        {
          component: BreadcrumbPage,
          name: 'Breadcrumb',
          status: ExampleStatus.started,
          url: '#/examples/breadcrumb'
        },
        {
          component: ButtonPage,
          name: 'Button',
          status: ExampleStatus.beta,
          url: '#/examples/button'
        },
        {
          component: CalloutPage,
          name: 'Callout',
          status: ExampleStatus.started,
          url: '#/examples/callout'
        },
        {
          component: CheckboxPage,
          name: 'Checkbox',
          status: ExampleStatus.beta,
          url: '#/examples/checkbox'
        },
        {
          component: ChoiceGroupPage,
          name: 'ChoiceGroup',
          status: ExampleStatus.started,
          url: '#/examples/ChoiceGroup'
        },
        {
          component: CommandBarPage,
          name: 'CommandBar',
          status: ExampleStatus.beta,
          url: '#/examples/commandbar'
        },
        {
          component: ContextualMenuPage,
          name: 'ContextualMenu',
          status: ExampleStatus.beta,
          url: '#/examples/contextmenu'
        },
        {
          name: 'DatePicker',
          component: DatePickerPage,
          status: ExampleStatus.started,
          url: '#/examples/datepicker'
        },
        {
          component: DetailsListPage,
          name: 'DetailsList',
          status: ExampleStatus.beta,
          url: '#/examples/detailslist'
        },
        {
          component: DialogPage,
          name: 'Dialog',
          status: ExampleStatus.beta,
          url: '#/examples/dialog'
        },
        {
          component: DropdownPage,
          name: 'Dropdown',
          status: ExampleStatus.beta,
          url: '#/examples/dropdown'
        },
        {
          component: LabelPage,
          name: 'Label',
          status: ExampleStatus.started,
          url: '#/examples/label'
        },
        {
          component: LayerPage,
          name: 'Layer',
          status: ExampleStatus.started,
          url: '#/examples/layer'
        },
        {
          component: LinkPage,
          name: 'Link',
          status: ExampleStatus.started,
          url: '#/examples/link'
        },
        {
          component: ListPage,
          name: 'List',
          status: ExampleStatus.started,
          url: '#/examples/list'
        },
        {
          component: NavPage,
          name: 'Nav',
          status: ExampleStatus.started,
          url: '#/examples/Nav'
        },
        {
          component: OrgChartPage,
          name: 'OrgChart',
          status: ExampleStatus.placeholder,
          url: '#/examples/orgchart'
        },
        {
          component: OverlayPage,
          name: 'Overlay',
          status: ExampleStatus.placeholder,
          url: '#/examples/overlay'
        },
        {
          component: PanelPage,
          name: 'Panel',
          status: ExampleStatus.placeholder,
          url: '#/examples/panel'
        },
        {
          component: PeoplePickerPage,
          name: 'PeoplePicker',
          status: ExampleStatus.placeholder,
          url: '#/examples/peoplepicker'
        },
        {
          component: PersonaPage,
          name: 'Persona',
          status: ExampleStatus.beta,
          url: '#/examples/persona'
        },
        {
          component: PersonaCardPage,
          name: 'PersonaCard',
          status: ExampleStatus.placeholder,
          url: '#/examples/personacard'
        },
        {
          component: PivotPage,
          name: 'Pivot',
          status: ExampleStatus.started,
          url: '#/examples/pivot'
        },
        {
          component: ProgressIndicatorPage,
          name: 'ProgressIndicator',
          status: ExampleStatus.beta,
          url: '#/examples/progressindicator'
        },
        {
          component: SearchBoxPage,
          name: 'SearchBox',
          status: ExampleStatus.started,
          url: '#/examples/searchbox'
        },
        {
          component: SpinnerPage,
          name: 'Spinner',
          status: ExampleStatus.beta,
          url: '#/examples/spinner'
        },
        {
          component: TablePage,
          name: 'Table',
          status: ExampleStatus.placeholder,
          url: '#/examples/table'
        },
        {
          component: TextFieldPage,
          name: 'TextField',
          status: ExampleStatus.started,
          url: '#/examples/textfield'
        },
        {
          component: TogglePage,
          name: 'Toggle',
          status: ExampleStatus.beta,
          url: '#/examples/toggle'
        }
      ],
      name: 'Basic components'
    },
    {
      links: [
        {
          name: 'Event groups',
          url: '#examples/eventgroup'
        },
        {
          component: FocusZonePage,
          name: 'Focus zones',
          status: ExampleStatus.started,
          url: '#examples/focuszone'
        },
        {
          name: 'Selection management',
          url: '#examples/selectionManagement'
        },
        {
          component: Themes,
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

export default AppState;
