import * as React from 'react';
import { IAppDefinition, IAppLink, ApiReferencesTableSet } from '@fluentui/react-docsite-components';
import { DetailsListBasicExample } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.Basic.Example';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { AppThemes } from './theme/AppThemes';

const propertiesTableMargins = mergeStyles({
  marginLeft: '40px',
  marginRight: '40px',
});

function loadReferences(): IAppLink[] {
  const requireContext = require.context('../dist/api/references', false, /\w+\.page\.json$/);

  return requireContext.keys().map(pagePath => {
    const pageName = pagePath.match(/(\w+)\.page\.json/)![1];
    return {
      component: () => (
        <ApiReferencesTableSet className={propertiesTableMargins} jsonDocs={requireContext(pagePath)} showAll />
      ),
      key: pageName,
      name: pageName,
      url: '#/examples/references/' + pageName.toLowerCase(),
    };
  });
}

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI React',
  themes: AppThemes,
  testPages: [
    {
      component: DetailsListBasicExample,
      key: 'DetailsListBasicExample',
      name: 'DetailsListBasicExample',
      url: '#/tests/detailslistbasicexample',
    },
  ],
  examplePages: [
    {
      name: 'Basic components',
      links: [
        {
          component: require<any>('./components/pages/ActivityItemPage').ActivityItemPage,
          key: 'ActivityItem',
          name: 'ActivityItem',
          url: '#/examples/activityitem',
        },
        {
          component: require<any>('./components/pages/BreadcrumbPage').BreadcrumbPage,
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb',
        },
        {
          component: require<any>('./components/pages/ButtonPage').ButtonPage,
          key: 'Button',
          name: 'Button',
          url: '#/examples/button',
        },
        {
          component: require<any>('./components/pages/CalendarPage').CalendarPage,
          key: 'Calendar',
          name: 'Calendar',
          url: '#/examples/calendar',
        },
        {
          component: require<any>('./components/pages/CalloutPage').CalloutPage,
          key: 'Callout',
          name: 'Callout',
          url: '#/examples/callout',
        },
        {
          component: require<any>('./components/pages/CheckboxPage').CheckboxPage,
          key: 'Checkbox',
          name: 'Checkbox',
          url: '#/examples/checkbox',
        },
        {
          component: require<any>('./components/pages/ChoiceGroupPage').ChoiceGroupPage,
          key: 'ChoiceGroup',
          name: 'ChoiceGroup',
          url: '#/examples/choicegroup',
        },
        {
          component: require<any>('./components/pages/CoachmarkPage').CoachmarkPage,
          key: 'Coachmark',
          name: 'Coachmark',
          url: '#/examples/coachmark',
        },
        {
          component: require<any>('./components/pages/ColorPickerPage').ColorPickerPage,
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker',
        },
        {
          component: require<any>('./components/pages/ComboBoxPage').ComboBoxPage,
          key: 'ComboBox',
          name: 'ComboBox',
          url: '#/examples/ComboBox',
        },
        {
          component: require<any>('./components/pages/CommandBarPage').CommandBarPage,
          key: 'CommandBar',
          name: 'CommandBar',
          url: '#/examples/commandbar',
        },
        {
          component: require<any>('./components/pages/ContextualMenuPage').ContextualMenuPage,
          key: 'ContextualMenu',
          name: 'ContextualMenu',
          url: '#/examples/contextualmenu',
        },
        {
          component: require<any>('./components/pages/DatePickerPage').DatePickerPage,
          key: 'DatePicker',
          name: 'DatePicker',
          url: '#/examples/datepicker',
        },
        {
          component: require<any>('./components/pages/DetailsList/DetailsListPage').DetailsListPage,
          key: 'DetailsList',
          name: 'DetailsList',
          url: '#/examples/detailslist',
          links: [
            {
              component: require<any>('./components/pages/DetailsList/DetailsListBasicPage').DetailsListBasicPage,
              key: 'DetailsList - Basic',
              name: 'DetailsList - Basic',
              url: '#/examples/detailslist/basic',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListAdvancedPage').DetailsListAdvancedPage,
              key: 'DetailsList - Advanced',
              name: 'DetailsList - Advanced',
              url: '#/examples/detailslist/variablerowheights',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListAnimationPage')
                .DetailsListAnimationPage,
              key: 'DetailsList - Animation',
              name: 'DetailsList - Animation',
              url: '#/examples/detailslist/animation',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListCompactPage').DetailsListCompactPage,
              key: 'DetailsList - Compact',
              name: 'DetailsList - Compact',
              url: '#/examples/detailslist/compact',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListCustomColumnsPage')
                .DetailsListCustomColumnsPage,
              key: 'DetailsList - CustomColumns',
              name: 'DetailsList - CustomColumns',
              url: '#/examples/detailslist/customitemcolumns',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListCustomGroupHeadersPage')
                .DetailsListCustomGroupHeadersPage,
              key: 'DetailsList - CustomGroupHeaders',
              name: 'DetailsList - CustomGroupHeaders',
              url: '#/examples/detailslist/customgroupheaders',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListCustomRowsPage')
                .DetailsListCustomRowsPage,
              key: 'DetailsList - CustomRows',
              name: 'DetailsList - CustomRows',
              url: '#/examples/detailslist/customitemrows',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListCustomFooterPage')
                .DetailsListCustomFooterPage,
              key: 'DetailsList - CustomFooter',
              name: 'DetailsList - CustomFooter',
              url: '#/examples/detailslist/customfooter',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListDragDropPage').DetailsListDragDropPage,
              key: 'DetailsList - DragDrop',
              name: 'DetailsList - DragDrop',
              url: '#/examples/detailslist/draganddrop',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListLargeGroupedPage')
                .DetailsListLargeGroupedPage,
              key: 'DetailsList - LargeGrouped',
              name: 'DetailsList - LargeGrouped',
              url: '#/examples/detailslist/largegrouped',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListNavigatingFocusPage')
                .DetailsListNavigatingFocusPage,
              key: 'DetailsList - NavigatingFocus',
              name: 'DetailsList - NavigatingFocus',
              url: '#/examples/detailslist/innernavigation',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListShimmerPage').DetailsListShimmerPage,
              key: 'DetailsList - Shimmer',
              name: 'DetailsList - Shimmer',
              url: '#/examples/detailslist/shimmer',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListSimpleGroupedPage')
                .DetailsListSimpleGroupedPage,
              key: 'DetailsList - SimpleGrouped',
              name: 'DetailsList - SimpleGrouped',
              url: '#/examples/detailslist/grouped',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListKeyboardDragDropPage')
                .DetailsListKeyboardDragDropPage,
              key: 'DetailsList - Keyboard Column Reorder & Resize',
              name: 'DetailsList - Keyboard Column Reorder & Resize',
              url: '#/examples/detailslist/keyboardcolumnreorderresize',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListKeyboardOverridesPage')
                .DetailsListKeyboardOverridesPage,
              key: 'DetailsList - Keyboard Overrides',
              name: 'DetailsList - Keyboard Overrides',
              url: '#/examples/detailslist/keyboardoverrides',
            },
            {
              component: require<any>('./components/pages/DetailsList/DetailsListProportionalColumnsPage')
                .DetailsListProportionalColumnsPage,
              key: 'DetailsList - Proportional Columns',
              name: 'DetailsList - Proportional Columns',
              url: '#/examples/detailslist/proportionalcolumns',
            },
          ],
        },
        {
          component: require<any>('./components/pages/DialogPage').DialogPage,
          key: 'Dialog',
          name: 'Dialog',
          url: '#/examples/dialog',
        },
        {
          component: require<any>('./components/pages/DividerPage').DividerPage,
          key: 'Divider',
          name: 'Divider',
          url: '#/examples/divider',
        },
        {
          component: require<any>('./components/pages/DocumentCardPage').DocumentCardPage,
          key: 'DocumentCard',
          name: 'DocumentCard',
          url: '#/examples/documentcard',
        },
        {
          component: require<any>('./components/pages/DropdownPage').DropdownPage,
          key: 'Dropdown',
          name: 'Dropdown',
          url: '#/examples/dropdown',
        },
        {
          component: require<any>('./components/pages/FacepilePage').FacepilePage,
          key: 'Facepile',
          name: 'Facepile',
          url: '#/examples/facepile',
        },
        {
          component: require<any>('./components/pages/FloatingPeoplePickerPage').FloatingPeoplePickerPage,
          key: 'FloatingPeoplePicker',
          name: 'FloatingPeoplePicker',
          url: '#/examples/floatingpeoplepicker',
        },
        {
          component: require<any>('./components/pages/GroupedListPage').GroupedListPage,
          key: 'GroupedList',
          name: 'GroupedList',
          url: '#/examples/groupedlist',
        },
        {
          component: require<any>('./components/pages/HoverCardPage').HoverCardPage,
          key: 'HoverCard',
          name: 'HoverCard',
          url: '#/examples/hovercard',
        },
        {
          component: require<any>('./components/pages/IconPage').IconPage,
          key: 'Icon',
          name: 'Icon',
          url: '#/examples/icon',
        },
        {
          component: require<any>('./components/pages/ImagePage').ImagePage,
          key: 'Image',
          name: 'Image',
          url: '#/examples/image',
        },
        {
          component: require<any>('./components/pages/KeytipsPage').KeytipsPage,
          key: 'Keytips',
          name: 'Keytips',
          url: '#/examples/keytips',
        },
        {
          component: require<any>('./components/pages/LabelPage').LabelPage,
          key: 'Label',
          name: 'Label',
          url: '#/examples/label',
        },
        {
          component: require<any>('./components/pages/LayerPage').LayerPage,
          key: 'Layer',
          name: 'Layer',
          url: '#/examples/layer',
        },
        {
          component: require<any>('./components/pages/LinkPage').LinkPage,
          key: 'Link',
          name: 'Link',
          url: '#/examples/link',
        },
        {
          component: require<any>('./components/pages/ListPage').ListPage,
          key: 'List',
          name: 'List',
          url: '#/examples/list',
        },
        {
          component: require<any>('./components/pages/MessageBarPage').MessageBarPage,
          key: 'MessageBar',
          name: 'MessageBar',
          url: '#/examples/messagebar',
        },
        {
          component: require<any>('./components/pages/ModalPage').ModalPage,
          key: 'Modal',
          name: 'Modal',
          url: '#/examples/modal',
        },
        {
          component: require<any>('./components/pages/NavPage').NavPage,
          key: 'Nav',
          name: 'Nav',
          url: '#/examples/nav',
        },
        {
          component: require<any>('./components/pages/OverflowSetPage').OverflowSetPage,
          key: 'OverflowSet',
          name: 'OverflowSet',
          url: '#/examples/overflowset',
        },
        {
          component: require<any>('./components/pages/OverlayPage').OverlayPage,
          key: 'Overlay',
          name: 'Overlay',
          url: '#/examples/overlay',
        },
        {
          component: require<any>('./components/pages/PanelPage').PanelPage,
          key: 'Panel',
          name: 'Panel',
          url: '#/examples/panel',
        },
        {
          component: require<any>('./components/pages/PeoplePickerPage').PeoplePickerPage,
          key: 'PeoplePicker',
          name: 'PeoplePicker',
          url: '#/examples/peoplepicker',
        },
        {
          component: require<any>('./components/pages/PersonaPage').PersonaPage,
          key: 'Persona',
          name: 'Persona',
          url: '#/examples/persona',
        },
        {
          component: require<any>('./components/pages/PickersPage').PickersPage,
          key: 'Pickers',
          name: 'Pickers',
          url: '#/examples/pickers',
        },
        {
          component: require<any>('./components/pages/PivotPage').PivotPage,
          key: 'Pivot',
          name: 'Pivot',
          url: '#/examples/pivot',
        },
        {
          component: require<any>('./components/pages/PopupPage').PopupPage,
          key: 'Popup',
          name: 'Popup',
          url: '#/examples/Popup',
        },
        {
          component: require<any>('./components/pages/ProgressIndicatorPage').ProgressIndicatorPage,
          key: 'ProgressIndicator',
          name: 'ProgressIndicator',
          url: '#/examples/progressindicator',
        },
        {
          component: require<any>('./components/pages/RatingPage').RatingPage,
          key: 'Rating',
          name: 'Rating',
          url: '#/examples/rating',
        },
        {
          component: require<any>('./components/pages/ResizeGroupPage').ResizeGroupPage,
          key: 'ResizeGroup',
          name: 'ResizeGroup',
          url: '#/examples/resizegroup',
        },
        {
          component: require<any>('./components/pages/ScrollablePanePage').ScrollablePanePage,
          key: 'ScrollablePane',
          name: 'ScrollablePane',
          url: '#/examples/scrollablepane',
        },
        {
          component: require<any>('./components/pages/SearchBoxPage').SearchBoxPage,
          key: 'SearchBox',
          name: 'SearchBox',
          url: '#/examples/searchbox',
        },
        {
          component: require<any>('./components/pages/SelectedPeopleListPage').SelectedPeopleListPage,
          key: 'SelectedPeopleList',
          name: 'SelectedPeopleList',
          url: '#/examples/selectedpeoplelist',
        },
        {
          component: require<any>('./components/pages/SeparatorPage').SeparatorPage,
          key: 'Separator',
          name: 'Separator',
          url: '#/examples/separator',
        },
        {
          component: require<any>('./components/pages/ShimmerPage').ShimmerPage,
          key: 'Shimmer',
          name: 'Shimmer',
          url: '#/examples/shimmer',
        },
        {
          component: require<any>('./components/pages/SliderPage').SliderPage,
          key: 'Slider',
          name: 'Slider',
          url: '#/examples/slider',
        },
        {
          component: require<any>('./components/pages/SpinButtonPage').SpinButtonPage,
          key: 'SpinButton',
          name: 'SpinButton',
          url: '#/examples/spinbutton',
        },
        {
          component: require<any>('./components/pages/SpinnerPage').SpinnerPage,
          key: 'Spinner',
          name: 'Spinner',
          url: '#/examples/spinner',
        },
        {
          component: require<any>('./components/pages/StackPage').StackPage,
          key: 'Stack',
          name: 'Stack',
          url: '#/examples/stack',
        },
        {
          component: require<any>('./components/pages/SwatchColorPickerPage').SwatchColorPickerPage,
          key: 'SwatchColorPicker',
          name: 'SwatchColorPicker',
          url: '#/examples/swatchcolorpicker',
        },
        {
          component: require<any>('./components/pages/TeachingBubblePage').TeachingBubblePage,
          key: 'TeachingBubble',
          name: 'TeachingBubble',
          url: '#/examples/teachingbubble',
        },
        {
          component: require<any>('./components/pages/TextPage').TextPage,
          key: 'Text',
          name: 'Text',
          url: '#/examples/text',
        },
        {
          component: require<any>('./components/pages/TextFieldPage').TextFieldPage,
          key: 'TextField',
          name: 'TextField',
          url: '#/examples/textfield',
        },
        {
          component: require<any>('./components/pages/TimePickerPage').TimePickerPage,
          key: 'TimePicker',
          name: 'TimePicker',
          url: '#/examples/timepicker',
        },
        {
          component: require<any>('./components/pages/TogglePage').TogglePage,
          key: 'Toggle',
          name: 'Toggle',
          url: '#/examples/toggle',
        },
        {
          component: require<any>('./components/pages/TooltipPage').TooltipPage,
          key: 'Tooltip',
          name: 'Tooltip',
          url: '#/examples/tooltip',
        },
      ],
    },
    {
      name: 'Extended components',
      links: [
        {
          component: require<any>('./components/pages/ExtendedPeoplePickerPage').ExtendedPeoplePickerPage,
          key: 'ExtendedPeoplePicker',
          name: 'ExtendedPeoplePicker',
          url: '#/examples/extendedpeoplepicker',
        },
      ],
    },
    {
      name: 'Charting',
      links: [
        {
          component: require<any>('./components/pages/Charting/LegendsPage').LegendsPage,
          key: 'Legends',
          name: 'Legends',
          url: '#/examples/ChartLegends',
        },
        {
          component: require<any>('./components/pages/Charting/LineChartPage').LineChartPage,
          key: 'LineChart',
          name: 'LineChart',
          url: '#/examples/LineChart',
        },
        {
          component: require<any>('./components/pages/Charting/AreaChartPage').AreaChartPage,
          key: 'AreaChart',
          name: 'AreaChart',
          url: '#/examples/AreaChart',
        },
        {
          component: require<any>('./components/pages/Charting/DonutChartPage').AreaChartPage,
          key: 'DonutChart',
          name: 'DonutChart',
          url: '#/examples/DonutChart',
        },
        {
          name: 'VerticalBarChart',
          key: 'VerticalBarChart',
          url: '#/examples/VerticalBarChart',
          links: [
            {
              component: require<any>('./components/pages/Charting/VerticalStackedBarChartPage')
                .VerticalStackedBarChartPage,
              key: 'VerticalBarChart - Stacked',
              name: 'VerticalBarChart - Stacked',
              url: '#/examples/VerticalBarChart/Stacked',
            },
            {
              component: require<any>('./components/pages/Charting/GroupedVerticalBarChartPage')
                .GroupedVerticalBarChartPage,
              key: 'VerticalBarChart - Grouped',
              name: 'VerticalBarChart - Grouped',
              url: '#/examples/VerticalBarChart/Grouped',
            },
          ],
        },
        {
          component: require<any>('./components/pages/Charting/GaugeChartPage').GaugeChartPage,
          key: 'GaugeChart',
          name: 'GaugeChart',
          url: '#/examples/GaugeChart',
        },
        {
          component: require<any>('./components/pages/Charting/HeatMapChartPage').HeatMapChartPage,
          key: 'HeatMapChart',
          name: 'HeatMapChart',
          url: '#/examples/HeatMapChart',
        },
        {
          component: require<any>('./components/pages/Charting/HorizontalBarChartPage').HorizontalBarChartPage,
          key: 'HorizontalBarChart',
          name: 'HorizontalBarChart',
          url: '#/examples/HorizontalBarChart',
          links: [
            {
              component: require<any>('./components/pages/Charting/HorizontalBarChartWithAxisPage')
                .HorizontalBarChartWithAxisPage,
              key: 'HorizontalBarChart - WithAxis',
              name: 'HorizontalBarChart - WithAxis',
              url: '#/examples/HorizontalBarChart/WithAxis',
            },
            {
              component: require<any>('./components/pages/Charting/MultiStackedBarChartPage').MultiStackedBarChartPage,
              key: 'HorizontalBarChart - MultiStacked',
              name: 'HorizontalBarChart - MultiStacked',
              url: '#/examples/HorizontalBarChart/MultiStacked',
            },
            {
              component: require<any>('./components/pages/Charting/StackedBarChartPage').StackedBarChartPage,
              key: 'HorizontalBarChart - Stacked',
              name: 'HorizontalBarChart - Stacked',
              url: '#/examples/HorizontalBarChart/Stacked',
            },
          ],
        },
        {
          component: require<any>('./components/pages/Charting/PieChartPage').PieChartPage,
          key: 'PieChart',
          name: 'PieChart',
          url: '#/examples/PieChart',
        },
        {
          component: require<any>('./components/pages/Charting/SankeyChartPage').SankeyChartPage,
          key: 'SankeyChart',
          name: 'SankeyChart',
          url: '#/examples/SankeyChart',
        },
        {
          component: require<any>('./components/pages/Charting/SparklineChartPage').SparklineChartPage,
          key: 'SparklineChart',
          name: 'SparklineChart',
          url: '#/examples/SparklineChart',
        },
        {
          component: require<any>('./components/pages/Charting/TreeChartPage').TreeChartPage,
          key: 'TreeChart',
          name: 'TreeChart',
          url: '#/examples/TreeChart',
        },
      ],
    },
    {
      name: 'Utilities',
      links: [
        {
          component: require<any>('./components/pages/FocusTrapZonePage').FocusTrapZonePage,
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#/examples/focustrapzone',
        },
        {
          component: require<any>('./components/pages/FocusZonePage').FocusZonePage,
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#/examples/focuszone',
        },
        {
          component: require<any>('./components/pages/MarqueeSelectionPage').MarqueeSelectionPage,
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          url: '#/examples/marqueeselection',
        },
        {
          component: require<any>('./components/pages/SelectionPage').SelectionPage,
          key: 'Selection',
          name: 'Selection',
          url: '#/examples/selection',
        },
        {
          component: require<any>('./components/pages/ThemePage').ThemePage,
          key: 'Theme',
          name: 'Themes',
          url: '#/examples/themes',
        },
        {
          component: require<any>('./components/pages/ThemeProviderPage').ThemeProviderPage,
          key: 'ThemeProvider',
          name: 'ThemeProvider',
          url: '#/examples/themeprovider',
        },
        {
          component: require<any>('./components/pages/ColorsPage').ColorsPage,
          key: 'Colors',
          name: 'Colors',
          url: '#/examples/themegenerator',
        },
      ],
    },
    {
      name: 'Accessibility',
      links: [
        {
          component: require<any>('./components/pages/Announced/AnnouncedPage').AnnouncedPage,
          key: 'Announced',
          name: 'Announced',
          url: '#/examples/announced',
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedQuickActionsPage').AnnouncedQuickActionsPage,
          key: 'Announced - Quick Actions',
          name: 'Announced - Quick Actions',
          url: '#/examples/announced/quickactions',
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedSearchResultsPage').AnnouncedSearchResultsPage,
          key: 'Announced - Search Results',
          name: 'Announced - Search Results',
          url: '#/examples/announced/searchresults',
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedLazyLoadingPage').AnnouncedLazyLoadingPage,
          key: 'Announced - Lazy Loading',
          name: 'Announced - Lazy Loading',
          url: '#/examples/announced/lazyloading',
        },
        {
          component: require<any>('./components/pages/Announced/AnnouncedBulkOperationsPage')
            .AnnouncedBulkOperationsPage,
          key: 'Announced - Bulk Operations',
          name: 'Announced - Bulk Operations',
          url: '#/examples/announced/bulkoperations',
        },
      ],
    },
    {
      name: 'References',
      links: loadReferences(),
    },
  ],

  headerLinks: [
    {
      name: 'Getting started',
      url: '#/',
    },
    {
      name: 'Components Checklist',
      url: '#/components-status',
    },
    {
      name: 'Fabric',
      url: 'https://developer.microsoft.com/en-us/fluentui',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/microsoft/fluentui',
    },
  ],
};
