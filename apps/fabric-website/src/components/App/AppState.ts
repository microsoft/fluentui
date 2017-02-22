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
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/HomePage/HomePage').HomePage)),
      isHomePage: true
    },
    {
      title: 'Get started',
      url: '#/get-started',
      className: 'getStartedPage',
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/GetStarted/GetStartedPage').GetStartedPage)),
    },
    {
      title: 'Styles',
      url: '#/styles',
      className: 'stylesPage',
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Overviews/StylesPage').StylesPage)),
      pages: [
        {
          title: 'Animations',
          url: '#/styles/animations',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/AnimationsPage/AnimationsPage').AnimationsPage))
        },
        {
          title: 'Brand icons',
          url: '#/styles/brand-icons',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/BrandIconsPage/BrandIconsPage').BrandIconsPage))
        },
        {
          title: 'Colors',
          url: '#/styles/colors',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/ColorsPage/ColorsPage').ColorsPage))
        },
        {
          title: 'Icons',
          url: '#/styles/icons',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/IconsPage/IconsPage').IconsPage))
        },
        {
          title: 'Layout',
          url: '#/styles/layout',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/LayoutPage/LayoutPage').LayoutPage))
        },
        {
          title: 'Localization',
          url: '#/styles/localization',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/LocalizationPage/LocalizationPage').LocalizationPage))
        },
        {
          title: 'Typography',
          url: '#/styles/typography',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/TypographyPage/TypographyPage').TypographyPage))
        },
        {
          title: 'Utilities',
          url: '#/styles/utilities',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Styles/UtilitiesPage/UtilitiesPage').UtilitiesPage))
        }

      ]
    },
    {
      title: 'Components',
      url: '#/components',
      className: 'componentsPage',
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Overviews/ComponentsPage').ComponentsPage)),
      pages: [
        {
          title: 'Breadcrumb',
          url: '#/components/breadcrumb',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/BreadcrumbComponentPage').BreadcrumbComponentPage))
        },
        {
          title: 'Button',
          url: '#/components/button',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ButtonComponentPage').ButtonComponentPage)),

        },
        {
          title: 'Callout',
          url: '#/components/callout',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/CalloutComponentPage').CalloutComponentPage))

        },
        {
          title: 'Checkbox',
          url: '#/components/checkbox',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/CheckboxComponentPage').CheckboxComponentPage))
        },
        {
          title: 'ChoiceGroup',
          url: '#/components/choicegroup',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ChoiceGroupComponentPage').ChoiceGroupComponentPage))

        },
        {
          title: 'ColorPicker',
          url: '#/components/colorpicker',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ColorPickerComponentPage').ColorPickerComponentPage))
        },
        {
          title: 'CommandBar',
          url: '#/components/commandbar',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/CommandBarComponentPage').CommandBarComponentPage))
        },
        {
          title: 'ContextualMenu',
          url: '#/components/contextualmenu',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ContextualMenuComponentPage').ContextualMenuComponentPage))

        },
        {
          title: 'DatePicker',
          url: '#/components/datepicker',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DatePickerComponentPage').DatePickerComponentPage))
        },
        {
          title: 'DetailsList',
          url: '#/components/detailslist',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DetailsListComponentPage').DetailsListComponentPage))
        },
        {
          title: 'Dialog',
          url: '#/components/dialog',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DialogComponentPage').DialogComponentPage))
        },
        {
          title: 'DocumentCard',
          url: '#/components/documentcard',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DocumentCardComponentPage').DocumentCardComponentPage))
        },
        {
          title: 'Dropdown',
          url: '#/components/dropdown',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DropdownComponentPage').DropdownComponentPage))

        },
        {
          title: 'Facepile',
          url: '#/components/facepile',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/FacepileComponentPage').FacepileComponentPage))

        },
        {
          title: 'GroupedList',
          url: '#/components/groupedlist',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/GroupedListComponentPage').GroupedListComponentPage))

        },
        {
          title: 'Image',
          url: '#/components/image',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ImageComponentPage').ImageComponentPage))
        },
        {
          title: 'Label',
          url: '#/components/label',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/LabelComponentPage').LabelComponentPage))
        },
        {
          title: 'Layer',
          url: '#/components/layer',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/LayerComponentPage').LayerComponentPage))

        },
        {
          title: 'Link',
          url: '#/components/link',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/LinkComponentPage').LinkComponentPage))
        },
        {
          title: 'List',
          url: '#/components/list',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ListComponentPage').ListComponentPage))
        },
        {
          title: 'MessageBar',
          url: '#/components/messagebar',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/MessageBarComponentPage').MessageBarComponentPage))
        },
        {
          title: 'Nav',
          url: '#/components/nav',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/NavComponentPage').NavComponentPage))
        },
        {
          title: 'Overlay',
          url: '#/components/overlay',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/OverlayComponentPage').OverlayComponentPage))
        },
        {
          title: 'Panel',
          url: '#/components/panel',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PanelComponentPage').PanelComponentPage))
        },
        {
          title: 'Persona',
          url: '#/components/persona',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PersonaComponentPage').PersonaComponentPage))
        },
        {
          title: 'Pickers',
          url: '#/components/pickers',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PickersComponentPage').PickersComponentPage))
        },
        {
          title: 'PeoplePicker',
          url: '#/components/peoplepicker',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PeoplePickerComponentPage').PeoplePickerComponentPage))
        },
        {
          title: 'Pivot',
          url: '#/components/pivot',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PivotComponentPage').PivotComponentPage))
        },
        {
          title: 'ProgressIndicator',
          url: '#/components/progressindicator',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ProgressIndicatorComponentPage').ProgressIndicatorComponentPage))
        },
        {
          title: 'SearchBox',
          url: '#/components/searchbox',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SearchBoxComponentPage').SearchBoxComponentPage))
        },
        {
          title: 'Slider',
          url: '#/components/slider',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SliderComponentPage').SliderComponentPage))
        },
        {
          title: 'Spinner',
          url: '#/components/spinner',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SpinnerComponentPage').SpinnerComponentPage))
        },
        {
          title: 'TextField',
          url: '#/components/textfield',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/TextFieldComponentPage').TextFieldComponentPage))
        },
        {
          title: 'Toggle',
          url: '#/components/toggle',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ToggleComponentPage').ToggleComponentPage))
        },
        {
          title: 'Utilities',
          url: '#/components/utilities',
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ComponentUtilitiesPage').ComponentUtilitiesPage)),
          pages: [
            {
              title: 'FocusTrapZone',
              url: '#/components/focustrapzone',
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/FocusTrapZoneUtilityPage').FocusTrapZoneUtilityPage))
            },
            {
              title: 'FocusZone',
              url: '#/components/focuszone',
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/FocusZoneUtilityPage').FocusZoneUtilityPage))
            },
            {
              title: 'MarqueeSelection',
              url: '#/components/marqueeselection',
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/MarqueeSelectionUtilityPage').MarqueeSelectionUtilityPage))
            },
            {
              title: 'Selection',
              url: '#/components/selection',
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SelectionUtilityPage').SelectionUtilityPage))
            },
            {
              title: 'Themes',
              url: '#/components/themes',
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ThemesUtilityPage').ThemesUtilityPage))
            }
          ]
        }
      ]
    },
    {
      title: 'Resources',
      url: '#/resources',
      className: 'resourcesPage',
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/ResourcesPage/ResourcesPage').ResourcesPage))
    },
    {
      title: 'Blog',
      url: '#/blog',
      className: 'blogPage',
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/BlogPage/BlogPage').BlogPage))
    },
    {
      title: 'Blog Post',
      url: '#/blog/blog-post',
      className: 'blogPostPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/BlogPage/BlogPost').BlogPost))
    },
    {
      title: 'Fabric JS',
      url: '#/fabric-js',
      className: 'fabricJsPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Interstitials/FabricJSPage').FabricJSPage))
    },
    {
      title: 'Angular JS',
      url: '#/angular-js',
      className: 'angularJsPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Interstitials/AngularJSPage').AngularJSPage))
    },
    {
      title: 'Fabric iOS',
      url: '#/fabric-ios',
      className: 'fabricIosPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Interstitials/FabricIOSPage').FabricIOSPage))
    }
  ]
};
