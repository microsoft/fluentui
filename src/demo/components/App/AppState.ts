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
import { PickersPage } from '../../pages/PickersPage/PickersPage';
import { PersonaPage } from '../../pages/PersonaPage/PersonaPage';
import { PivotPage } from '../../pages/PivotPage/PivotPage';
import { ProgressIndicatorPage } from '../../pages/ProgressIndicatorPage/ProgressIndicatorPage';
import { SearchBoxPage } from '../../pages/SearchBoxPage/SearchBoxPage';
import { SelectionPage } from '../../pages/SelectionPage/SelectionPage';
import { SliderPage } from '../../pages/SliderPage/SliderPage';
import { SpinnerPage } from '../../pages/SpinnerPage/SpinnerPage';
import { TeachingBubblePage } from '../../pages/TeachingBubblePage/TeachingBubblePage';
import { TextFieldPage } from '../../pages/TextFieldPage/TextFieldPage';
import { TogglePage } from '../../pages/TogglePage/TogglePage';
import { TooltipPage } from '../../pages/TooltipPage/TooltipPage';
import { ThemePage } from '../../pages/ThemePage/ThemePage';
import { DetailsListBasicExample } from '../../pages/DetailsListPage/examples/DetailsList.Basic.Example';

export enum ExampleStatus {
  placeholder,
  started,
  beta,
  release
}

export interface IAppState {
  appTitle: string;
  testPages: any[];
  examplePages: INavLinkGroup[];
  headerLinks: INavLink[];
}

export const AppState: IAppState = {
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
          component: BreadcrumbPage,
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          status: ExampleStatus.beta,
          url: '#/examples/breadcrumb'
        },
        {
          component: ButtonPage,
          key: 'Button',
          name: 'Button',
          status: ExampleStatus.beta,
          url: '#/examples/button'
        },
        {
          component: CalloutPage,
          key: 'Callout',
          name: 'Callout',
          status: ExampleStatus.beta,
          url: '#/examples/callout'
        },
        {
          component: CheckboxPage,
          key: 'Checkbox',
          name: 'Checkbox',
          status: ExampleStatus.beta,
          url: '#/examples/checkbox'
        },
        {
          component: ChoiceGroupPage,
          key: 'ChoiceGroup',
          name: 'ChoiceGroup',
          status: ExampleStatus.beta,
          url: '#/examples/choicegroup'
        },
        {
          component: CommandBarPage,
          key: 'CommandBar',
          name: 'CommandBar',
          status: ExampleStatus.beta,
          url: '#/examples/commandbar'
        },
        {
          component: ContextualMenuPage,
          key: 'ContextualMenu',
          name: 'ContextualMenu',
          status: ExampleStatus.beta,
          url: '#/examples/contextmenu'
        },
        {
          component: DatePickerPage,
          key: 'DatePicker',
          name: 'DatePicker',
          status: ExampleStatus.beta,
          url: '#/examples/datepicker'
        },
        {
          component: DetailsListPage,
          key: 'DetailsList',
          name: 'DetailsList',
          status: ExampleStatus.beta,
          url: '#/examples/detailslist'
        },
        {
          component: DialogPage,
          key: 'Dialog',
          name: 'Dialog',
          status: ExampleStatus.beta,
          url: '#/examples/dialog'
        },
        {
          component: DocumentCardPage,
          key: 'DocumentCard',
          name: 'DocumentCard',
          status: ExampleStatus.beta,
          url: '#/examples/documentcard'
        },
        {
          component: DropdownPage,
          key: 'Dropdown',
          name: 'Dropdown',
          status: ExampleStatus.beta,
          url: '#/examples/dropdown'
        },
        {
          component: FacepilePage,
          key: 'Facepile',
          name: 'Facepile',
          status: ExampleStatus.started,
          url: '#/examples/facepile'
        },
        {
          component: LabelPage,
          key: 'Label',
          name: 'Label',
          status: ExampleStatus.beta,
          url: '#/examples/label'
        },
        {
          component: LinkPage,
          key: 'Link',
          name: 'Link',
          status: ExampleStatus.beta,
          url: '#/examples/link'
        },
        {
          component: ListPage,
          key: 'List',
          name: 'List',
          status: ExampleStatus.beta,
          url: '#/examples/list'
        },
        {
          component: MessageBarPage,
          key: 'MessageBar',
          name: 'MessageBar',
          status: ExampleStatus.placeholder,
          url: '#/examples/messagebar'
        },
        {
          component: OverlayPage,
          key: 'Overlay',
          name: 'Overlay',
          status: ExampleStatus.beta,
          url: '#/examples/overlay'
        },
        {
          component: PanelPage,
          key: 'Panel',
          name: 'Panel',
          status: ExampleStatus.beta,
          url: '#/examples/panel'
        },
        {
          component: PickersPage,
          key: 'Pickers',
          name: 'Pickers',
          status: ExampleStatus.started,
          url: '#/examples/pickers'
        },
        {
          component: PersonaPage,
          key: 'Persona',
          name: 'Persona',
          status: ExampleStatus.beta,
          url: '#/examples/persona'
        },
        {
          component: PivotPage,
          key: 'Pivot',
          name: 'Pivot',
          status: ExampleStatus.started,
          url: '#/examples/pivot'
        },
        {
          component: ProgressIndicatorPage,
          key: 'ProgressIndicator',
          name: 'ProgressIndicator',
          status: ExampleStatus.beta,
          url: '#/examples/progressindicator'
        },
        {
          component: SearchBoxPage,
          key: 'SearchBox',
          name: 'SearchBox',
          status: ExampleStatus.started,
          url: '#/examples/searchbox'
        },
        {
          component: SpinnerPage,
          key: 'Spinner',
          name: 'Spinner',
          status: ExampleStatus.beta,
          url: '#/examples/spinner'
        },
        {
          component: TeachingBubblePage,
          key: 'TeachingBubble',
          name: 'TeachingBubble',
          status: ExampleStatus.beta,
          url: '#/examples/teachingbubble'
        },
        {
          component: TextFieldPage,
          key: 'TextField',
          name: 'TextField',
          status: ExampleStatus.beta,
          url: '#/examples/textfield'
        },
        {
          component: TogglePage,
          key: 'Toggle',
          name: 'Toggle',
          status: ExampleStatus.beta,
          url: '#/examples/toggle'
        },
        {
          component: TooltipPage,
          key: 'Tooltip',
          name: 'Tooltip',
          status: ExampleStatus.beta,
          url: '#/examples/Tooltip'
        }
      ],
      name: 'Basic components'
    },
    {
      links: [
        {
          component: ColorPickerPage,
          key: 'ColorPicker',
          name: 'ColorPicker',
          status: ExampleStatus.started,
          url: '#/examples/colorpicker'
        },
        {
          component: GroupedListPage,
          key: 'GroupedList',
          name: 'GroupedList',
          status: ExampleStatus.started,
          url: '#examples/groupedlist'
        },
        {
          component: ImagePage,
          key: 'Image',
          name: 'Image',
          status: ExampleStatus.beta,
          url: '#/examples/image'
        },
        {
          component: LayerPage,
          key: 'Layer',
          name: 'Layer',
          status: ExampleStatus.beta,
          url: '#/examples/layer'
        },
        {
          component: NavPage,
          key: 'Nav',
          name: 'Nav',
          status: ExampleStatus.started,
          url: '#/examples/nav'
        },
        {
          component: SliderPage,
          key: 'Slider',
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
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          status: ExampleStatus.beta,
          url: '#examples/focustrapzone'
        },
        {
          component: FocusZonePage,
          key: 'FocusZone',
          name: 'FocusZone',
          status: ExampleStatus.beta,
          url: '#examples/focuszone'
        },
        {
          component: MarqueeSelectionPage,
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          status: ExampleStatus.beta,
          url: '#examples/marqueeselection'
        },
        {
          component: SelectionPage,
          key: 'Selection',
          name: 'Selection',
          status: ExampleStatus.beta,
          url: '#examples/selection'
        },
        {
          component: ThemePage,
          key: 'Themes',
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
