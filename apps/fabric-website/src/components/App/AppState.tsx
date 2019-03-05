import * as React from 'react';

// Props
import { INavPage } from '../Nav/Nav.types';
import { ComponentPage } from '../ComponentPage/ComponentPage';
import { PageHeader } from '../PageHeader/PageHeader';

export interface IAppState {
  appTitle: string;
  pages: INavPage[];
}

// Giving the loading component a height so that the left nav loads in full screen and there is less flashing as the component page loads.
const loadingPageHeight: string = 'calc(100vh - 100px)';
const LoadingComponent = (props: any): JSX.Element => {
  return (
    <div style={{ height: loadingPageHeight }}>
      <ComponentPage>
        <PageHeader pageTitle={props.title} backgroundColor="#038387" />
      </ComponentPage>
    </div>
  );
};
const StylesLoadingComponent = (props: any): JSX.Element => {
  return (
    <div style={{ height: loadingPageHeight }}>
      <PageHeader pageTitle={props.title} backgroundColor="#006f94" />
    </div>
  );
};

export const AppState: IAppState = {
  appTitle: 'Office UI Fabric',
  pages: [
    {
      title: 'Fabric',
      url: '#/',
      className: 'fabricPage',
      isHomePage: true,
      isUhfLink: true,
      component: require<any>('../../pages/HomePage/HomePage').HomePage
    },
    {
      title: 'Get started',
      url: '#/get-started',
      className: 'getStartedPage',
      isUhfLink: true,
      component: require<any>('../../pages/GetStarted/GetStartedPage').GetStartedPage
    },
    {
      title: 'Styles',
      url: '#/styles',
      className: 'stylesPage',
      isUhfLink: true,
      component: () => <LoadingComponent title="Styles" />,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Overviews/StylesPage').StylesPage)),
      pages: [
        {
          title: 'Animations',
          url: '#/styles/animations',
          component: () => <StylesLoadingComponent title="Animations" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Styles/AnimationsPage/AnimationsPage').AnimationsPage))
        },
        {
          title: 'Brand icons',
          url: '#/styles/brand-icons',
          component: () => <StylesLoadingComponent title="Brand icons" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Styles/BrandIconsPage/BrandIconsPage').BrandIconsPage))
        },
        {
          title: 'Colors',
          url: '#/styles/colors',
          component: () => <StylesLoadingComponent title="Colors" />,
          getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Styles/ColorsPage/ColorsPage').ColorsPage))
        },
        {
          title: 'Icons',
          url: '#/styles/icons',
          component: () => <StylesLoadingComponent title="Icons" />,
          getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Styles/IconsPage/IconsPage').IconsPage))
        },
        {
          title: 'Layout',
          url: '#/styles/layout',
          component: () => <StylesLoadingComponent title="Layout" />,
          getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Styles/LayoutPage/LayoutPage').LayoutPage))
        },
        {
          title: 'Localization',
          url: '#/styles/localization',
          component: () => <StylesLoadingComponent title="Localization" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Styles/LocalizationPage/LocalizationPage').LocalizationPage))
        },
        {
          title: 'Colors',
          url: '#/styles/themegenerator',
          isHiddenFromMainNav: true, // moved to Customizations but entry left here to preserve old URL
          component: () => <StylesLoadingComponent title="Colors" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Customizations/ColorsCustomizationPage').ColorsCustomizationPage))
        },
        {
          title: 'Typography',
          url: '#/styles/typography',
          component: () => <StylesLoadingComponent title="Typography" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Styles/TypographyPage/TypographyPage').TypographyPage))
        },
        {
          title: 'Utilities',
          url: '#/styles/utilities',
          component: () => <StylesLoadingComponent title="Utilities" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Styles/UtilitiesPage/UtilitiesPage').UtilitiesPage))
        }
      ]
    },
    {
      title: 'Components',
      url: '#/components',
      className: 'componentsPage',
      isUhfLink: true,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Overviews/ComponentsPage').ComponentsPage)),
      pages: [
        {
          title: 'Basic Inputs',
          url: '#/components',
          className: 'componentsPage',
          isCategory: true,
          pages: [
            {
              title: 'Button',
              url: '#/components/button',
              isFilterable: true,
              component: () => <LoadingComponent title="Button" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ButtonComponentPage').ButtonComponentPage))
            },
            {
              title: 'Checkbox',
              url: '#/components/checkbox',
              isFilterable: true,
              component: () => <LoadingComponent title="Checkbox" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/CheckboxComponentPage').CheckboxComponentPage))
            },
            {
              title: 'ChoiceGroup',
              url: '#/components/choicegroup',
              isFilterable: true,
              component: () => <LoadingComponent title="ChoiceGroup" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ChoiceGroupComponentPage').ChoiceGroupComponentPage))
            },
            {
              title: 'ComboBox',
              url: '#/components/ComboBox',
              isFilterable: true,
              component: () => <LoadingComponent title="ComboBox" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ComboBoxComponentPage').ComboBoxComponentPage))
            },
            {
              title: 'ContextualMenu',
              url: '#/components/contextualmenu',
              isFilterable: true,
              component: () => <LoadingComponent title="ContextualMenu" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/ContextualMenuComponentPage').ContextualMenuComponentPage)
                )
            },
            {
              title: 'Dropdown',
              url: '#/components/dropdown',
              isFilterable: true,
              component: () => <LoadingComponent title="Dropdown" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/DropdownComponentPage').DropdownComponentPage))
            },
            {
              title: 'Label',
              url: '#/components/label',
              isFilterable: true,
              component: () => <LoadingComponent title="Label" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/LabelComponentPage').LabelComponentPage))
            },
            {
              title: 'Link',
              url: '#/components/link',
              isFilterable: true,
              component: () => <LoadingComponent title="Link" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/LinkComponentPage').LinkComponentPage))
            },
            {
              title: 'Rating',
              url: '#/components/rating',
              isFilterable: true,
              component: () => <LoadingComponent title="Rating" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/RatingComponentPage').RatingComponentPage))
            },
            {
              title: 'Slider',
              url: '#/components/slider',
              isFilterable: true,
              component: () => <LoadingComponent title="Slider" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/SliderComponentPage').SliderComponentPage))
            },
            {
              title: 'SpinButton',
              url: '#/components/spinbutton',
              isFilterable: true,
              component: () => <LoadingComponent title="SpinButton" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/SpinButtonComponentPage').SpinButtonComponentPage))
            },
            {
              title: 'Text',
              url: '#/components/text',
              isFilterable: true,
              component: () => <LoadingComponent title="Text" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/TextComponentPage').TextComponentPage))
            },
            {
              title: 'TextField',
              url: '#/components/textfield',
              isFilterable: true,
              component: () => <LoadingComponent title="TextField" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/TextFieldComponentPage').TextFieldComponentPage))
            },
            {
              title: 'Toggle',
              url: '#/components/toggle',
              isFilterable: true,
              component: () => <LoadingComponent title="Toggle" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ToggleComponentPage').ToggleComponentPage))
            }
          ]
        },
        {
          title: 'Navigation',
          url: '#/components',
          className: 'componentsPage',
          isCategory: true,
          pages: [
            {
              title: 'Breadcrumb',
              url: '#/components/breadcrumb',
              isFilterable: true,
              component: () => <LoadingComponent title="Breadcrumb" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/BreadcrumbComponentPage').BreadcrumbComponentPage))
            },
            {
              title: 'CommandBar',
              url: '#/components/commandbar',
              isFilterable: true,
              component: () => <LoadingComponent title="CommandBar" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/CommandBarComponentPage').CommandBarComponentPage))
            },
            {
              title: 'Nav',
              url: '#/components/nav',
              isFilterable: true,
              component: () => <LoadingComponent title="Nav" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/NavComponentPage').NavComponentPage))
            },
            {
              title: 'OverflowSet',
              url: '#/components/overflowset',
              isFilterable: true,
              component: () => <LoadingComponent title="OverflowSet" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/OverflowSetComponentPage').OverflowSetComponentPage))
            },
            {
              title: 'Pivot',
              url: '#/components/pivot',
              isFilterable: true,
              component: () => <LoadingComponent title="Pivot" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/PivotComponentPage').PivotComponentPage))
            },
            {
              title: 'SearchBox',
              url: '#/components/searchbox',
              isFilterable: true,
              component: () => <LoadingComponent title="SearchBox" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/SearchBoxComponentPage').SearchBoxComponentPage))
            }
          ]
        },
        {
          title: 'Layout',
          url: '#/components',
          className: 'componentsPage',
          isCategory: true,
          pages: [
            {
              title: 'Stack',
              url: '#/components/stack',
              isFilterable: true,
              component: () => <LoadingComponent title="Stack" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/StackComponentPage').StackComponentPage))
            }
          ]
        },
        {
          title: 'Content',
          url: '#/components',
          className: 'componentsPage',
          isCategory: true,
          pages: [
            {
              title: 'ActivityItem',
              url: '#/components/activityitem',
              isFilterable: true,
              component: () => <LoadingComponent title="ActivityItem" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/ActivityItemComponentPage').ActivityItemComponentPage)
                )
            },
            {
              title: 'Calendar',
              url: '#/components/Calendar',
              isFilterable: true,
              component: () => <LoadingComponent title="Calendar" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/CalendarComponentPage').CalendarComponentPage))
            },
            {
              title: 'DetailsList',
              url: '#/components/detailslist',
              isFilterable: true,
              component: () => <LoadingComponent title="DetailsList" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/DetailsList/DetailsListComponentPage').DetailsListComponentPage)
                ),
              pages: [
                {
                  title: 'Basic',
                  url: '#/components/detailslist/basic',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Basic DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(require<any>('../../pages/Components/DetailsList/DetailsListBasicComponentPage').DetailsListBasicComponentPage)
                    )
                },
                {
                  title: 'Compact',
                  url: '#/components/detailslist/compact',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Compact DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(require<any>('../../pages/Components/DetailsList/DetailsListCompactComponentPage').DetailsListCompactComponentPage)
                    )
                },
                {
                  title: 'Grouped',
                  url: '#/components/detailslist/grouped',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Grouped DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(require<any>('../../pages/Components/DetailsList/DetailsListGroupedComponentPage').DetailsListGroupedComponentPage)
                    )
                },
                {
                  title: 'Large Grouped',
                  url: '#/components/detailslist/largegrouped',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Large Grouped DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListLargeGroupedComponentPage')
                          .DetailsListLargeGroupedComponentPage
                      )
                    )
                },
                {
                  title: 'Custom Item Columns',
                  url: '#/components/detailslist/customitemcolumns',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Custom Item Columns DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListCustomColumnsComponentPage')
                          .DetailsListCustomColumnsComponentPage
                      )
                    )
                },
                {
                  title: 'Custom Item Rows',
                  url: '#/components/detailslist/customitemrows',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Custom Item Rows DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListCustomRowsComponentPage')
                          .DetailsListCustomRowsComponentPage
                      )
                    )
                },
                {
                  title: 'Custom Footer',
                  url: '#/components/detailslist/customfooter',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Custom Footer DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListCustomFooterComponentPage')
                          .DetailsListCustomFooterComponentPage
                      )
                    )
                },
                {
                  title: 'Custom Group Headers',
                  url: '#/components/detailslist/customgroupheaders',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Custom Group Headers DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListCustomGroupHeadersComponentPage')
                          .DetailsListCustomGroupHeadersComponentPage
                      )
                    )
                },
                {
                  title: 'Variable Row Heights',
                  url: '#/components/detailslist/variablerowheights',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Variable Row Heights DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListAdvancedComponentPage').DetailsListAdvancedComponentPage
                      )
                    )
                },
                {
                  title: 'Drag & Drop',
                  url: '#/components/detailslist/draganddrop',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Drag &amp; Drop DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListDragDropComponentPage').DetailsListDragDropComponentPage
                      )
                    )
                },
                {
                  title: 'Inner Navigation',
                  url: '#/components/detailslist/innernavigation',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Inner Navigation DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/DetailsList/DetailsListNavigatingFocusComponentPage')
                          .DetailsListNavigatingFocusComponentPage
                      )
                    )
                },
                {
                  title: 'Shimmer',
                  url: '#/components/detailslist/shimmer',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Shimmer DetailsList" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(require<any>('../../pages/Components/DetailsList/DetailsListShimmerComponentPage').DetailsListShimmerComponentPage)
                    )
                }
              ]
            },
            {
              title: 'Facepile',
              url: '#/components/facepile',
              isFilterable: true,
              component: () => <LoadingComponent title="Facepile" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/FacepileComponentPage').FacepileComponentPage))
            },
            {
              title: 'GroupedList',
              url: '#/components/groupedlist',
              isFilterable: true,
              component: () => <LoadingComponent title="GroupedList" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/GroupedListComponentPage').GroupedListComponentPage))
            },
            {
              title: 'Icon',
              url: '#/components/icon',
              isFilterable: true,
              component: () => <LoadingComponent title="Icon" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/IconComponentPage').IconComponentPage))
            },
            {
              title: 'Image',
              url: '#/components/image',
              isFilterable: true,
              component: () => <LoadingComponent title="Image" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ImageComponentPage').ImageComponentPage))
            },
            {
              title: 'List',
              url: '#/components/list',
              isFilterable: true,
              component: () => <LoadingComponent title="List" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ListComponentPage').ListComponentPage))
            },
            {
              title: 'Persona',
              url: '#/components/persona',
              isFilterable: true,
              component: () => <LoadingComponent title="Persona" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/PersonaComponentPage').PersonaComponentPage))
            }
          ]
        },
        {
          title: 'Pickers',
          url: '#/components',
          className: 'componentsPage',
          isCategory: true,
          pages: [
            {
              title: 'Pickers',
              url: '#/components/pickers',
              isFilterable: true,
              component: () => <LoadingComponent title="Pickers" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/PickersComponentPage').PickersComponentPage))
            },
            {
              title: 'ColorPicker',
              url: '#/components/colorpicker',
              isFilterable: true,
              component: () => <LoadingComponent title="ColorPicker" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ColorPickerComponentPage').ColorPickerComponentPage))
            },
            {
              title: 'DatePicker',
              url: '#/components/datepicker',
              isFilterable: true,
              component: () => <LoadingComponent title="DatePicker" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/DatePickerComponentPage').DatePickerComponentPage))
            },
            {
              title: 'PeoplePicker',
              url: '#/components/peoplepicker',
              isFilterable: true,
              component: () => <LoadingComponent title="PeoplePicker" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/PeoplePickerComponentPage').PeoplePickerComponentPage)
                )
            },
            {
              title: 'SwatchColorPicker',
              url: '#/components/swatchcolorpicker',
              isFilterable: true,
              component: () => <LoadingComponent title="SwatchColorPicker" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/SwatchColorPickerComponentPage').SwatchColorPickerComponentPage)
                )
            }
          ]
        },
        {
          title: 'Progress & Validation',
          url: '#/components',
          className: 'componentsPage',
          isCategory: true,
          pages: [
            {
              title: 'MessageBar',
              url: '#/components/messagebar',
              isFilterable: true,
              component: () => <LoadingComponent title="MessageBar" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/MessageBarComponentPage').MessageBarComponentPage))
            },
            {
              title: 'ProgressIndicator',
              url: '#/components/progressindicator',
              isFilterable: true,
              component: () => <LoadingComponent title="ProgressIndicator" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/ProgressIndicatorComponentPage').ProgressIndicatorComponentPage)
                )
            },
            {
              title: 'Shimmer',
              url: '#/components/shimmer',
              isFilterable: true,
              component: () => <LoadingComponent title="Shimmer" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ShimmerComponentPage').ShimmerComponentPage))
            },
            {
              title: 'Spinner',
              url: '#/components/spinner',
              isFilterable: true,
              component: () => <LoadingComponent title="Spinner" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/SpinnerComponentPage').SpinnerComponentPage))
            }
          ]
        },
        {
          title: 'Surfaces',
          url: '#/components',
          className: 'componentsPage',
          isCategory: true,
          component: () => <LoadingComponent title="Surfaces" />,
          getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Overviews/ComponentsPage').ComponentsPage)),
          pages: [
            {
              title: 'Callout',
              url: '#/components/callout',
              isFilterable: true,
              component: () => <LoadingComponent title="Callout" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/CalloutComponentPage').CalloutComponentPage))
            },
            {
              title: 'Dialog',
              url: '#/components/dialog',
              isFilterable: true,
              component: () => <LoadingComponent title="Dialog" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/DialogComponentPage').DialogComponentPage))
            },
            {
              title: 'DocumentCard',
              url: '#/components/documentcard',
              isFilterable: true,
              component: () => <LoadingComponent title="DocumentCard" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/DocumentCardComponentPage').DocumentCardComponentPage)
                )
            },
            {
              title: 'HoverCard',
              url: '#/components/hovercard',
              isFilterable: true,
              component: () => <LoadingComponent title="HoverCard" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/HoverCardComponentPage').HoverCardComponentPage))
            },
            {
              title: 'Layer',
              url: '#/components/layer',
              isFilterable: true,
              component: () => <LoadingComponent title="Layer" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/LayerComponentPage').LayerComponentPage))
            },
            {
              title: 'Modal',
              url: '#/components/modal',
              isFilterable: true,
              component: () => <LoadingComponent title="Modal" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ModalComponentPage').ModalComponentPage))
            },
            {
              title: 'Overlay',
              url: '#/components/overlay',
              isFilterable: true,
              component: () => <LoadingComponent title="Overlay" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/OverlayComponentPage').OverlayComponentPage))
            },
            {
              title: 'Panel',
              url: '#/components/panel',
              isFilterable: true,
              component: () => <LoadingComponent title="Panel" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/PanelComponentPage').PanelComponentPage))
            },
            {
              title: 'ScrollablePane',
              isFilterable: true,
              url: '#/components/scrollablepane',
              component: () => <LoadingComponent title="ScrollablePane" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/ScrollablePaneComponentPage').ScrollablePaneComponentPage)
                )
            },
            {
              title: 'TeachingBubble',
              url: '#/components/teachingbubble',
              isFilterable: true,
              component: () => <LoadingComponent title="TeachingBubble" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/TeachingBubbleComponentPage').TeachingBubbleComponentPage)
                )
            },
            {
              title: 'Tooltip',
              url: '#/components/tooltip',
              isFilterable: true,
              component: () => <LoadingComponent title="Tooltip" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/TooltipComponentPage').TooltipComponentPage))
            },
            {
              title: 'Coachmark',
              url: '#/components/coachmark',
              isFilterable: true,
              component: () => <LoadingComponent title="Coachmark" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/CoachmarkComponentPage').CoachmarkComponentPage))
            }
          ]
        },
        {
          title: 'Utilities',
          url: '#/components/utilities',
          className: 'componentsPage',
          isCategory: true,
          component: () => <LoadingComponent title="Utilities" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Components/ComponentUtilitiesPage').ComponentUtilitiesPage)),
          pages: [
            {
              title: 'FocusTrapZone',
              url: '#/components/focustrapzone',
              isFilterable: true,
              component: () => <LoadingComponent title="FocusTrapZone" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/FocusTrapZoneUtilityPage').FocusTrapZoneUtilityPage))
            },
            {
              title: 'FocusZone',
              url: '#/components/focuszone',
              isFilterable: true,
              component: () => <LoadingComponent title="FocusZone" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/FocusZoneUtilityPage').FocusZoneUtilityPage))
            },
            {
              title: 'MarqueeSelection',
              url: '#/components/marqueeselection',
              isFilterable: true,
              component: () => <LoadingComponent title="MarqueeSelection" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/MarqueeSelectionUtilityPage').MarqueeSelectionUtilityPage)
                )
            },
            {
              title: 'ResizeGroup',
              url: '#/components/resizegroup',
              isFilterable: true,
              component: () => <LoadingComponent title="ResizeGroup" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ResizeGroupComponentPage').ResizeGroupComponentPage))
            },
            {
              title: 'Selection',
              url: '#/components/selection',
              isFilterable: true,
              component: () => <LoadingComponent title="Selection" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/SelectionUtilityPage').SelectionUtilityPage))
            },
            {
              title: 'Themes',
              url: '#/components/themes',
              isHiddenFromMainNav: true, // moved to Customizations but entry left here to preserve old URL
              component: () => <LoadingComponent title="Themes" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ThemesUtilityPage').ThemesUtilityPage))
            }
          ]
        },
        {
          title: 'Customization',
          url: '#/components/customizations',
          className: 'componentsPage',
          isCategory: true,
          component: () => <LoadingComponent title="Customization" />,
          getComponent: cb =>
            require.ensure([], require => cb(require<any>('../../pages/Components/ComponentUtilitiesPage').ComponentUtilitiesPage)),
          pages: [
            {
              title: 'Themes',
              url: '#/components/customizations/themes',
              isFilterable: true,
              component: () => <LoadingComponent title="Themes" />,
              getComponent: cb =>
                require.ensure([], require => cb(require<any>('../../pages/Components/ThemesUtilityPage').ThemesUtilityPage))
            },
            {
              title: 'Colors',
              url: '#/components/customizations/colors',
              isFilterable: true,
              component: () => <LoadingComponent title="Colors" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Customizations/ColorsCustomizationPage').ColorsCustomizationPage)
                )
            }
          ]
        },
        {
          title: 'Accessibility',
          url: '#/components/accessibility',
          className: 'componentsPage',
          isCategory: true,
          component: () => <LoadingComponent title="Accessibility" />,
          pages: [
            {
              title: 'Announced',
              url: '#/components/announced',
              isFilterable: true,
              component: () => <LoadingComponent title="Announced" />,
              getComponent: cb =>
                require.ensure([], require =>
                  cb(require<any>('../../pages/Components/Announced/AnnouncedComponentPage').AnnouncedComponentPage)
                ),
              pages: [
                {
                  title: 'Quick Actions',
                  url: '#/components/announced/quickactions',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Announced Quick Actions" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/Announced/AnnouncedQuickActionsComponentPage')
                          .AnnouncedQuickActionsComponentPage
                      )
                    )
                },
                {
                  title: 'Search Results',
                  url: '#/components/announced/searchresults',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Announced Search Results" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/Announced/AnnouncedSearchResultsComponentPage')
                          .AnnouncedSearchResultsComponentPage
                      )
                    )
                },
                {
                  title: 'Lazy Loading',
                  url: '#/components/announced/lazyloading',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Announced Lazy Loading" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/Announced/AnnouncedLazyLoadingComponentPage').AnnouncedLazyLoadingComponentPage
                      )
                    )
                },
                {
                  title: 'Bulk Operations',
                  url: '#/components/announced/bulkoperations',
                  isFilterable: true,
                  component: () => <LoadingComponent title="Announced Bulk Operations" />,
                  getComponent: cb =>
                    require.ensure([], require =>
                      cb(
                        require<any>('../../pages/Components/Announced/AnnouncedBulkOperationsComponentPage')
                          .AnnouncedBulkOperationsComponentPage
                      )
                    )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Resources',
      url: '#/resources',
      className: 'resourcesPage',
      isUhfLink: true,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/ResourcesPage/ResourcesPage').ResourcesPage))
    },
    {
      title: 'Blog',
      url: '#/blog',
      className: 'blogPage',
      isUhfLink: true,
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/BlogPage/BlogPage').BlogPage))
    },
    {
      title: 'Blog Post',
      url: '#/blog/blog-post',
      className: 'blogPostPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/BlogPage/BlogPost').BlogPost))
    },
    {
      title: 'Fabric JS',
      url: '#/fabric-js',
      className: 'fabricJsPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Interstitials/FabricJSPage').FabricJSPage))
    },
    {
      title: 'Angular JS',
      url: '#/angular-js',
      className: 'angularJsPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Interstitials/AngularJSPage').AngularJSPage))
    },
    {
      title: 'Fabric iOS',
      url: '#/fabric-ios',
      className: 'fabricIosPage',
      isHiddenFromMainNav: true,
      getComponent: cb => require.ensure([], require => cb(require<any>('../../pages/Interstitials/FabricIOSPage').FabricIOSPage))
    }
  ]
};
