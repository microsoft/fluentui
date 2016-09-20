import { BreadcrumbPage } from '../../pages/BreadcrumbPage/BreadcrumbPage';
import { ButtonPage } from '../../pages/ButtonPage/ButtonPage';
import { CalloutPage } from '../../pages/CalloutPage/CalloutPage';
import { ColorPickerPage } from '../../pages/ColorPickerPage/ColorPickerPage';
import { DocumentCardPage } from '../../pages/DocumentCardPage/DocumentCardPage';
import { CheckboxPage } from '../../pages/CheckboxPage/CheckboxPage';
import { ChoiceGroupPage } from '../../pages/ChoiceGroupPage/ChoiceGroupPage';
import { CommandBarPage } from '../../pages/CommandBarPage/CommandBarPage';
import { ContextualMenuPage } from '../../pages/ContextualMenuPage/ContextualMenuPage';
import { DatePickerPage } from '../../pages/DatePickerPage/DatePickerPage';
import { DetailsListPage } from '../../pages/DetailsListPage/DetailsListPage';
import { DialogPage } from '../../pages/DialogPage/DialogPage';
import { DropdownPage } from '../../pages/DropdownPage/DropdownPage';
import { FacepilePage } from '../../pages/Facepile/FacepilePage';
import { FocusZonePage } from '../../pages/FocusZonePage/FocusZonePage';
import { FocusTrapZonePage } from '../../pages/FocusTrapZonePage/FocusTrapZonePage';
import { GroupedListPage } from '../../pages/GroupedListPage/GroupedListPage';
import { ImagePage } from '../../pages/ImagePage/ImagePage';
import { INavLink, INavLinkGroup } from '../../../components/Nav/index';
import { LabelPage } from '../../pages/LabelPage/LabelPage';
import { LayerPage } from '../../pages/LayerPage/LayerPage';
import { LinkPage } from '../../pages/LinkPage/LinkPage';
import { ListPage } from '../../pages/ListPage/ListPage';
import { MarqueeSelectionPage } from '../../pages/MarqueeSelectionPage/MarqueeSelectionPage';
import { MessageBarPage } from '../../pages/MessageBarPage/MessageBarPage';
import { NavPage } from '../../pages/NavPage/NavPage';
import { OverlayPage } from '../../pages/OverlayPage/OverlayPage';
import { PanelPage } from '../../pages/PanelPage/PanelPage';
import { PeoplePickerPage } from '../../pages/PeoplePickerPage/PeoplePickerPage';
import { PersonaPage } from '../../pages/PersonaPage/PersonaPage';
import { PivotPage } from '../../pages/PivotPage/PivotPage';
import { ProgressIndicatorPage } from '../../pages/ProgressIndicatorPage/ProgressIndicatorPage';
import { SearchBoxPage } from '../../pages/SearchBoxPage/SearchBoxPage';
import { SelectionPage } from '../../pages/SelectionPage/SelectionPage';
import { SliderPage } from '../../pages/SliderPage/SliderPage';
import { SpinnerPage } from '../../pages/SpinnerPage/SpinnerPage';
import { TextFieldPage } from '../../pages/TextFieldPage/TextFieldPage';
import { TogglePage } from '../../pages/TogglePage/TogglePage';
import { ThemePage } from '../../pages/ThemePage/ThemePage';

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
          status: ExampleStatus.beta,
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
          status: ExampleStatus.beta,
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
          status: ExampleStatus.beta,
          url: '#/examples/choicegroup'
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
          component: DatePickerPage,
          name: 'DatePicker',
          status: ExampleStatus.beta,
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
          component: DocumentCardPage,
          name: 'DocumentCard',
          status: ExampleStatus.beta,
          url: '#/examples/documentcard'
        },
        {
          component: DropdownPage,
          name: 'Dropdown',
          status: ExampleStatus.beta,
          url: '#/examples/dropdown'
        },
        {
          component: FacepilePage,
          name: 'Facepile',
          status: ExampleStatus.started,
          url: '#/examples/facepile'
        },
        {
          component: LabelPage,
          name: 'Label',
          status: ExampleStatus.beta,
          url: '#/examples/label'
        },
        {
          component: LinkPage,
          name: 'Link',
          status: ExampleStatus.beta,
          url: '#/examples/link'
        },
        {
          component: ListPage,
          name: 'List',
          status: ExampleStatus.beta,
          url: '#/examples/list'
        },
        {
          component: MessageBarPage,
          name: 'MessageBar',
          status: ExampleStatus.placeholder,
          url: '#/examples/messagebar'
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
          status: ExampleStatus.beta,
          url: '#/examples/overlay'
        },
        {
          component: PanelPage,
          name: 'Panel',
          status: ExampleStatus.beta,
          url: '#/examples/panel'
        },
        {
          component: PeoplePickerPage,
          name: 'PeoplePicker',
          status: ExampleStatus.started,
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
          component: TextFieldPage,
          name: 'TextField',
          status: ExampleStatus.beta,
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
          component: ColorPickerPage,
          name: 'ColorPicker',
          status: ExampleStatus.started,
          url: '#/examples/colorpicker'
        },
        {
          component: GroupedListPage,
          name: 'GroupedList',
          status: ExampleStatus.started,
          url: '#examples/groupedlist'
        },
        {
          component: ImagePage,
          name: 'Image',
          status: ExampleStatus.beta,
          url: '#/examples/image'
        },
        {
          component: LayerPage,
          name: 'Layer',
          status: ExampleStatus.beta,
          url: '#/examples/layer'
        },
        {
          component: NavPage,
          name: 'Nav',
          status: ExampleStatus.started,
          url: '#/examples/nav'
        },
        {
          component: SliderPage,
          name: 'Slider',
          status: ExampleStatus.beta,
          url: '#/examples/slider'
        }
      ],
      name: 'Extended components'
    },
    {
      links: [
        {
          component: FocusTrapZonePage,
          name: 'FocusTrapZone',
          status: ExampleStatus.beta,
          url: '#examples/focustrapzone'
        },
        {
          component: FocusZonePage,
          name: 'FocusZone',
          status: ExampleStatus.beta,
          url: '#examples/focuszone'
        },
        {
          component: MarqueeSelectionPage,
          name: 'MarqueeSelection',
          status: ExampleStatus.beta,
          url: '#examples/marqueeselection'
        },
        {
          component: SelectionPage,
          name: 'Selection',
          status: ExampleStatus.beta,
          url: '#examples/selection'
        },
        {
          component: ThemePage,
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
