import * as React from 'react';

// Props
import { INavPage } from '../Nav/Nav.Props';
import { ComponentPage } from '../ComponentPage/ComponentPage';
import { PageHeader } from '../PageHeader/PageHeader';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

export interface IAppState {
  appTitle: string;
  pages: INavPage[];
}

function LoadingComponent(props: any): JSX.Element {
  return (
    <ComponentPage>
      <PageHeader pageTitle={ props.title } backgroundColor='#038387' />
    </ComponentPage>
  );
}

export const AppState: IAppState = {
  appTitle: 'Office UI Fabric',
  pages: [
    {
      title: 'Component Status',
      url: '#/component-status',
      className: 'fabricPage',
      component: require<any>('../../pages/ComponentStatus/ComponentStatusPage').ComponentStatusPage
    },
    {
      title: 'Fabric',
      url: '#/',
      className: 'fabricPage',
      component: require<any>('../../pages/HomePage/HomePage').HomePage,
      isHomePage: true
    },
    {
      title: 'Get started',
      url: '#/get-started',
      className: 'getStartedPage',
      component: require<any>('../../pages/GetStarted/GetStartedPage').GetStartedPage,
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
      component: require<any>('../../pages/Overviews/ComponentsPage').ComponentsPage,
      pages: [
        {
          title: 'Breadcrumb',
          url: '#/components/breadcrumb',
          component: () => <LoadingComponent title='Breadcrumb' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/BreadcrumbComponentPage').BreadcrumbComponentPage))
        },
        {
          title: 'Button',
          url: '#/components/button',
          component: () => <LoadingComponent title='Button' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ButtonComponentPage').ButtonComponentPage)),

        },
        {
          title: 'Callout',
          url: '#/components/callout',
          component: () => <LoadingComponent title='Callout' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/CalloutComponentPage').CalloutComponentPage))

        },
        {
          title: 'Checkbox',
          url: '#/components/checkbox',
          component: () => <LoadingComponent title='Checkbox' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/CheckboxComponentPage').CheckboxComponentPage))
        },
        {
          title: 'ChoiceGroup',
          url: '#/components/choicegroup',
          component: () => <LoadingComponent title='ChoiceGroup' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ChoiceGroupComponentPage').ChoiceGroupComponentPage))

        },
        {
          title: 'ColorPicker',
          url: '#/components/colorpicker',
          component: () => <LoadingComponent title='ColorPicker' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ColorPickerComponentPage').ColorPickerComponentPage))
        },
        {
          title: 'ComboBox',
          url: '#/components/ComboBox',
          component: () => <LoadingComponent title='ComboBox' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ComboBoxComponentPage').ComboBoxComponentPage))

        },
        {
          title: 'CommandBar',
          url: '#/components/commandbar',
          component: () => <LoadingComponent title='CommandBar' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/CommandBarComponentPage').CommandBarComponentPage))
        },
        {
          title: 'ContextualMenu',
          url: '#/components/contextualmenu',
          component: () => <LoadingComponent title='ContextualMenu' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ContextualMenuComponentPage').ContextualMenuComponentPage))

        },
        {
          title: 'DatePicker',
          url: '#/components/datepicker',
          component: () => <LoadingComponent title='DatePicker' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DatePickerComponentPage').DatePickerComponentPage))
        },
        {
          title: 'DetailsList',
          url: '#/components/detailslist',
          component: () => <LoadingComponent title='DetailsList' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DetailsListComponentPage').DetailsListComponentPage))
        },
        {
          title: 'Dialog',
          url: '#/components/dialog',
          component: () => <LoadingComponent title='Dialog' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DialogComponentPage').DialogComponentPage))
        },
        {
          title: 'DocumentCard',
          url: '#/components/documentcard',
          component: () => <LoadingComponent title='DocumentCard' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DocumentCardComponentPage').DocumentCardComponentPage))
        },
        {
          title: 'Dropdown',
          url: '#/components/dropdown',
          component: () => <LoadingComponent title='Dropdown' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/DropdownComponentPage').DropdownComponentPage))

        },
        {
          title: 'Facepile',
          url: '#/components/facepile',
          component: () => <LoadingComponent title='Facepile' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/FacepileComponentPage').FacepileComponentPage))

        },
        {
          title: 'GroupedList',
          url: '#/components/groupedlist',
          component: () => <LoadingComponent title='GroupedList' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/GroupedListComponentPage').GroupedListComponentPage))

        },
        {
          title: 'Image',
          url: '#/components/image',
          component: () => <LoadingComponent title='Image' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ImageComponentPage').ImageComponentPage))
        },
        {
          title: 'Label',
          url: '#/components/label',
          component: () => <LoadingComponent title='Label' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/LabelComponentPage').LabelComponentPage))
        },
        {
          title: 'Layer',
          url: '#/components/layer',
          component: () => <LoadingComponent title='Layer' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/LayerComponentPage').LayerComponentPage))

        },
        {
          title: 'Link',
          url: '#/components/link',
          component: () => <LoadingComponent title='Link' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/LinkComponentPage').LinkComponentPage))
        },
        {
          title: 'List',
          url: '#/components/list',
          component: () => <LoadingComponent title='List' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ListComponentPage').ListComponentPage))
        },
        {
          title: 'MessageBar',
          url: '#/components/messagebar',
          component: () => <LoadingComponent title='MessageBar' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/MessageBarComponentPage').MessageBarComponentPage))
        },
        {
          title: 'Modal',
          url: '#/components/modal',
          component: () => <LoadingComponent title='Modal' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ModalComponentPage').ModalComponentPage))
        },
        {
          title: 'Nav',
          url: '#/components/nav',
          component: () => <LoadingComponent title='Nav' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/NavComponentPage').NavComponentPage))
        },
        {
          title: 'Overlay',
          url: '#/components/overlay',
          component: () => <LoadingComponent title='Overlay' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/OverlayComponentPage').OverlayComponentPage))
        },
        {
          title: 'Panel',
          url: '#/components/panel',
          component: () => <LoadingComponent title='Panel' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PanelComponentPage').PanelComponentPage))
        },
        {
          title: 'Persona',
          url: '#/components/persona',
          component: () => <LoadingComponent title='Persona' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PersonaComponentPage').PersonaComponentPage))
        },
        {
          title: 'Pickers',
          url: '#/components/pickers',
          component: () => <LoadingComponent title='Pickers' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PickersComponentPage').PickersComponentPage))
        },
        {
          title: 'PeoplePicker',
          url: '#/components/peoplepicker',
          component: () => <LoadingComponent title='PeoplePicker' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PeoplePickerComponentPage').PeoplePickerComponentPage))
        },
        {
          title: 'Pivot',
          url: '#/components/pivot',
          component: () => <LoadingComponent title='Pivot' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/PivotComponentPage').PivotComponentPage))
        },
        {
          title: 'ProgressIndicator',
          url: '#/components/progressindicator',
          component: () => <LoadingComponent title='ProgressIndicator' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ProgressIndicatorComponentPage').ProgressIndicatorComponentPage))
        },
        {
          title: 'Rating',
          url: '#/components/rating',
          component: () => <LoadingComponent title='Rating' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/RatingComponentPage').RatingComponentPage))
        },
        {
          title: 'SearchBox',
          url: '#/components/searchbox',
          component: () => <LoadingComponent title='SearchBox' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SearchBoxComponentPage').SearchBoxComponentPage))
        },
        {
          title: 'Slider',
          url: '#/components/slider',
          component: () => <LoadingComponent title='Slider' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SliderComponentPage').SliderComponentPage))
        },
        {
          title: 'Spinner',
          url: '#/components/spinner',
          component: () => <LoadingComponent title='Spinner' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SpinnerComponentPage').SpinnerComponentPage))
        },
        {
          title: 'SpinButton',
          url: '#/components/spinbutton',
          component: () => <LoadingComponent title='SpinButton' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SpinButtonComponentPage').SpinButtonComponentPage))
        },
        {
          title: 'SwatchColorPicker',
          url: '#/components/swatchcolorpicker',
          component: () => <LoadingComponent title='SwatchColorPicker' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SwatchColorPickerComponentPage').SwatchColorPickerComponentPage))
        },
        {
          title: 'TextField',
          url: '#/components/textfield',
          component: () => <LoadingComponent title='TextField' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/TextFieldComponentPage').TextFieldComponentPage))
        },
        {
          title: 'Toggle',
          url: '#/components/toggle',
          component: () => <LoadingComponent title='Toggle' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ToggleComponentPage').ToggleComponentPage))
        },
        {
          title: 'Tooltip',
          url: '#/components/tooltip',
          component: () => <LoadingComponent title='Tooltip' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/TooltipComponentPage').TooltipComponentPage))
        },
        {
          title: 'Utilities',
          url: '#/components/utilities',
          component: () => <LoadingComponent title='Utilities' />,
          getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/ComponentUtilitiesPage').ComponentUtilitiesPage)),
          pages: [
            {
              title: 'FocusTrapZone',
              url: '#/components/focustrapzone',
              component: () => <LoadingComponent title='FocusTrapZone' />,
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/FocusTrapZoneUtilityPage').FocusTrapZoneUtilityPage))
            },
            {
              title: 'FocusZone',
              url: '#/components/focuszone',
              component: () => <LoadingComponent title='FocusZone' />,
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/FocusZoneUtilityPage').FocusZoneUtilityPage))
            },
            {
              title: 'MarqueeSelection',
              url: '#/components/marqueeselection',
              component: () => <LoadingComponent title='MarqueeSelection' />,
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/MarqueeSelectionUtilityPage').MarqueeSelectionUtilityPage))
            },
            {
              title: 'Selection',
              url: '#/components/selection',
              component: () => <LoadingComponent title='Selection' />,
              getComponent: cb => require.ensure([], (require) => cb(require<any>('../../pages/Components/SelectionUtilityPage').SelectionUtilityPage))
            },
            {
              title: 'Themes',
              url: '#/components/themes',
              component: () => <LoadingComponent title='Themes' />,
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