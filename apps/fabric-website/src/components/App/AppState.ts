// Main pages
import { BlogPage } from '../../pages/BlogPage/BlogPage';
import { BlogPost } from '../../pages/BlogPage/BlogPost';
import { GetStartedPage } from '../../pages/GetStarted/GetStartedPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { ResourcesPage } from '../../pages/ResourcesPage/ResourcesPage';
import { StylesPage } from '../../pages/Overviews/StylesPage';
import { ComponentsPage } from '../../pages/Overviews/ComponentsPage';

// Style pages
import { AnimationsPage } from '../../pages/Styles/AnimationsPage/AnimationsPage';
import { BrandIconsPage } from '../../pages/Styles/BrandIconsPage/BrandIconsPage';
import { ColorsPage } from '../../pages/Styles/ColorsPage/ColorsPage';
import { IconsPage } from '../../pages/Styles/IconsPage/IconsPage';
import { LayoutPage } from '../../pages/Styles/LayoutPage/LayoutPage';
import { LocalizationPage } from '../../pages/Styles/LocalizationPage/LocalizationPage';
import { TypographyPage } from '../../pages/Styles/TypographyPage/TypographyPage';
import { UtilitiesPage } from '../../pages/Styles/UtilitiesPage/UtilitiesPage';

// Component pages
import { BreadcrumbComponentPage } from '../../pages/Components/BreadcrumbComponentPage';
import { ButtonComponentPage } from '../../pages/Components/ButtonComponentPage';
import { CalloutComponentPage } from '../../pages/Components/CalloutComponentPage';
import { CheckboxComponentPage } from '../../pages/Components/CheckboxComponentPage';
import { ChoiceGroupComponentPage } from '../../pages/Components/ChoiceGroupComponentPage';
import { ColorPickerComponentPage } from '../../pages/Components/ColorPickerComponentPage';
import { CommandBarComponentPage } from '../../pages/Components/CommandBarComponentPage';
import { ContextualMenuComponentPage } from '../../pages/Components/ContextualMenuComponentPage';
import { DatePickerComponentPage } from '../../pages/Components/DatePickerComponentPage';
import { DetailsListComponentPage } from '../../pages/Components/DetailsListComponentPage';
import { DialogComponentPage } from '../../pages/Components/DialogComponentPage';
import { DocumentCardComponentPage } from '../../pages/Components/DocumentCardComponentPage';
import { DropdownComponentPage } from '../../pages/Components/DropdownComponentPage';
import { FacepileComponentPage } from '../../pages/Components/FacepileComponentPage';
import { GroupedListComponentPage } from '../../pages/Components/GroupedListComponentPage';
import { ImageComponentPage } from '../../pages/Components/ImageComponentPage';
import { LabelComponentPage } from '../../pages/Components/LabelComponentPage';
import { LayerComponentPage } from '../../pages/Components/LayerComponentPage';
import { LinkComponentPage } from '../../pages/Components/LinkComponentPage';
import { ListComponentPage } from '../../pages/Components/ListComponentPage';
import { MessageBarComponentPage } from '../../pages/Components/MessageBarComponentPage';
import { NavComponentPage } from '../../pages/Components/NavComponentPage';
import { OverlayComponentPage } from '../../pages/Components/OverlayComponentPage';
import { PanelComponentPage } from '../../pages/Components/PanelComponentPage';
import { PersonaComponentPage } from '../../pages/Components/PersonaComponentPage';
import { PivotComponentPage } from '../../pages/Components/PivotComponentPage';
import { ProgressIndicatorComponentPage } from '../../pages/Components/ProgressIndicatorComponentPage';
import { SearchBoxComponentPage } from '../../pages/Components/SearchBoxComponentPage';
import { SliderComponentPage } from '../../pages/Components/SliderComponentPage';
import { SpinnerComponentPage } from '../../pages/Components/SpinnerComponentPage';
import { TextFieldComponentPage } from '../../pages/Components/TextFieldComponentPage';
import { ToggleComponentPage } from '../../pages/Components/ToggleComponentPage';
import { PickersComponentPage } from '../../pages/Components/PickersComponentPage';
import { PeoplePickerComponentPage } from '../../pages/Components/PeoplePickerComponentPage';
import { ComponentUtilitiesPage } from '../../pages/Components/ComponentUtilitiesPage';
import { FocusTrapZoneUtilityPage } from '../../pages/Components/FocusTrapZoneUtilityPage';
import { FocusZoneUtilityPage } from '../../pages/Components/FocusZoneUtilityPage';
import { MarqueeSelectionUtilityPage } from '../../pages/Components/MarqueeSelectionUtilityPage';
import { SelectionUtilityPage } from '../../pages/Components/SelectionUtilityPage';
import { ThemesUtilityPage } from '../../pages/Components/ThemesUtilityPage';
import { ThemerPage } from '../../pages/Components/ThemerPage';
// todo themer

// Interstitial pages
import { AngularJSPage } from '../../pages/Interstitials/AngularJSPage';
import { FabricIOSPage } from '../../pages/Interstitials/FabricIOSPage';
import { FabricJSPage } from '../../pages/Interstitials/FabricJSPage';

// Props
import { INavPage } from '../Nav/Nav.Props';

export interface IAppState {
  appTitle: string;
  pages: INavPage[];
}

export const AppState: IAppState = {
  appTitle: 'Office UI Fabric',
  pages: [
    {
      title: 'Fabric',
      url: '#/',
      className: 'fabricPage',
      component: HomePage,
      isHomePage: true
    },
    {
      title: 'Get started',
      url: '#/get-started',
      className: 'getStartedPage',
      component: GetStartedPage
    },
    {
      title: 'Styles',
      url: '#/styles',
      className: 'stylesPage',
      component: StylesPage,
      pages: [
        {
          title: 'Animations',
          url: '#/styles/animations',
          component: AnimationsPage
        },
        {
          title: 'Brand icons',
          url: '#/styles/brand-icons',
          component: BrandIconsPage
        },
        {
          title: 'Colors',
          url: '#/styles/colors',
          component: ColorsPage
        },
        {
          title: 'Icons',
          url: '#/styles/icons',
          component: IconsPage
        },
        {
          title: 'Layout',
          url: '#/styles/layout',
          component: LayoutPage
        },
        {
          title: 'Localization',
          url: '#/styles/localization',
          component: LocalizationPage
        },
        {
          title: 'Typography',
          url: '#/styles/typography',
          component: TypographyPage
        },
        {
          title: 'Utilities',
          url: '#/styles/utilities',
          component: UtilitiesPage
        }
      ]
    },
    {
      title: 'Components',
      url: '#/components',
      className: 'componentsPage',
      component: ComponentsPage,
      pages: [
        {
          title: 'Breadcrumb',
          url: '#/components/breadcrumb',
          component: BreadcrumbComponentPage
        },
        {
          title: 'Button',
          url: '#/components/button',
          component: ButtonComponentPage
        },
        {
          title: 'Callout',
          url: '#/components/callout',
          component: CalloutComponentPage
        },
        {
          title: 'Checkbox',
          url: '#/components/checkbox',
          component: CheckboxComponentPage
        },
        {
          title: 'ChoiceGroup',
          url: '#/components/choicegroup',
          component: ChoiceGroupComponentPage
        },
        {
          title: 'ColorPicker',
          url: '#/components/colorpicker',
          component: ColorPickerComponentPage
        },
        {
          title: 'CommandBar',
          url: '#/components/commandbar',
          component: CommandBarComponentPage
        },
        {
          title: 'ContextualMenu',
          url: '#/components/contextualmenu',
          component: ContextualMenuComponentPage
        },
        {
          title: 'DatePicker',
          url: '#/components/datepicker',
          component: DatePickerComponentPage
        },
        {
          title: 'DetailsList',
          url: '#/components/detailslist',
          component: DetailsListComponentPage
        },
        {
          title: 'Dialog',
          url: '#/components/dialog',
          component: DialogComponentPage
        },
        {
          title: 'DocumentCard',
          url: '#/components/documentcard',
          component: DocumentCardComponentPage
        },
        {
          title: 'Dropdown',
          url: '#/components/dropdown',
          component: DropdownComponentPage
        },
        {
          title: 'Facepile',
          url: '#/components/facepile',
          component: FacepileComponentPage
        },
        {
          title: 'GroupedList',
          url: '#/components/groupedlist',
          component: GroupedListComponentPage
        },
        {
          title: 'Image',
          url: '#/components/image',
          component: ImageComponentPage
        },
        {
          title: 'Label',
          url: '#/components/label',
          component: LabelComponentPage
        },
        {
          title: 'Layer',
          url: '#/components/layer',
          component: LayerComponentPage
        },
        {
          title: 'Link',
          url: '#/components/link',
          component: LinkComponentPage
        },
        {
          title: 'List',
          url: '#/components/list',
          component: ListComponentPage
        },
        {
          title: 'MessageBar',
          url: '#/components/messagebar',
          component: MessageBarComponentPage
        },
        {
          title: 'Nav',
          url: '#/components/nav',
          component: NavComponentPage
        },
        {
          title: 'Overlay',
          url: '#/components/overlay',
          component: OverlayComponentPage
        },
        {
          title: 'Panel',
          url: '#/components/panel',
          component: PanelComponentPage
        },
        {
          title: 'Persona',
          url: '#/components/persona',
          component: PersonaComponentPage
        },
        {
          title: 'Pickers',
          url: '#/components/pickers',
          component: PickersComponentPage
        },
        {
          title: 'PeoplePicker',
          url: '#/components/peoplepicker',
          component: PeoplePickerComponentPage
        },
        {
          title: 'Pivot',
          url: '#/components/pivot',
          component: PivotComponentPage
        },
        {
          title: 'ProgressIndicator',
          url: '#/components/progressindicator',
          component: ProgressIndicatorComponentPage
        },
        {
          title: 'SearchBox',
          url: '#/components/searchbox',
          component: SearchBoxComponentPage
        },
        {
          title: 'Slider',
          url: '#/components/slider',
          component: SliderComponentPage
        },
        {
          title: 'Spinner',
          url: '#/components/spinner',
          component: SpinnerComponentPage
        },
        {
          title: 'TextField',
          url: '#/components/textfield',
          component: TextFieldComponentPage
        },
        {
          title: 'Toggle',
          url: '#/components/toggle',
          component: ToggleComponentPage
        },
        {
          title: 'Utilities',
          url: '#/components/utilities',
          component: ComponentUtilitiesPage,
          pages: [
            {
              title: 'FocusTrapZone',
              url: '#/components/focustrapzone',
              component: FocusTrapZoneUtilityPage
            },
            {
              title: 'FocusZone',
              url: '#/components/focuszone',
              component: FocusZoneUtilityPage
            },
            {
              title: 'MarqueeSelection',
              url: '#/components/marqueeselection',
              component: MarqueeSelectionUtilityPage
            },
            {
              title: 'Selection',
              url: '#/components/selection',
              component: SelectionUtilityPage
            },
            {
              title: 'Themes',
              url: '#/components/themes',
              component: ThemesUtilityPage
            },
            {
              title: 'Theming',
              url: '#/components/themer',
              component: ThemerPage
            }
          ]
        }
      ]
    },
    {
      title: 'Resources',
      url: '#/resources',
      className: 'resourcesPage',
      component: ResourcesPage
    },
    {
      title: 'Blog',
      url: '#/blog',
      className: 'blogPage',
      component: BlogPage
    },
    {
      title: 'Blog Post',
      url: '#/blog/blog-post',
      className: 'blogPostPage',
      component: BlogPost,
      isHiddenFromMainNav: true
    },
    {
      title: 'Fabric JS',
      url: '#/fabric-js',
      className: 'fabricJsPage',
      component: FabricJSPage,
      isHiddenFromMainNav: true
    },
    {
      title: 'Angular JS',
      url: '#/angular-js',
      className: 'angularJsPage',
      component: AngularJSPage,
      isHiddenFromMainNav: true
    },
    {
      title: 'Fabric iOS',
      url: '#/fabric-ios',
      className: 'fabricIosPage',
      component: FabricIOSPage,
      isHiddenFromMainNav: true
    }
  ]
};
