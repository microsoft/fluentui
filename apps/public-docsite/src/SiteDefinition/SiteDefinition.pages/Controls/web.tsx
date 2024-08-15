import * as React from 'react';
import { INavPage, LoadingComponent } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage } from '../../../pages/Controls/ControlsAreaPage';
import { IPageJson } from '@fluentui/react/lib/common/DocPage.types';

export type CategoryPage = Partial<Omit<INavPage, 'pages'>> & { subPages?: ICategory };

export interface ICategory {
  [component: string]: CategoryPage;
}

// Exporting this object to be used in generating a TOC (table of content) for docs.microsoft documentation repo.
// Any changes to this object need to be communicated to avoid accidental breaking of the documentation
// and to allow the appropriate actions to be taken to mitigate this.
export const categories: { [name: string]: ICategory } = {
  'Basic Inputs': {
    Button: {},
    Checkbox: {},
    ChoiceGroup: {},
    ComboBox: {},
    Dropdown: {},
    Label: {},
    Link: {},
    Rating: {},
    SearchBox: {},
    Slider: {},
    SpinButton: {},
    TextField: {},
    Toggle: {},
  },
  'Galleries & Pickers': {
    Pickers: {},
    Calendar: {},
    ColorPicker: {},
    DatePicker: {},
    PeoplePicker: {},
    SwatchColorPicker: {},
    TimePicker: {},
  },
  'Items & Lists': {
    List: { title: 'Basic List' },
    DetailsList: {
      subPages: {
        // Names, titles, and URLs here are partial.
        // A simple entry like this:
        //   Basic: {}
        // will produce an actual page like this:
        //   component: DetailsListBasicPage
        //   title:     DetailsList - Basic
        //   url:       #/controls/web/detailslist/basic
        // An entry like this:
        //   CustomColumns: { title: 'Custom Item Columns', url: 'customitemcolumns' }
        // will produce an actual page like this:
        //   component: DetailsListCustomColumnsPage
        //   title:     DetailsList - Custom Item Columns
        //   url:       #/controls/web/detailslist/customitemcolumns
        Basic: {},
        Compact: {},
        Grouped: {},
        LargeGrouped: { title: 'Large Grouped' },
        GroupedV2: { title: 'Grouped V2' },
        LargeGroupedV2: { title: 'Large Grouped V2' },
        ScrollToIndexGroupedV2: { title: 'Scroll To Index Grouped V2' },
        CustomColumns: { title: 'Custom Item Columns', url: 'customitemcolumns' },
        CustomRows: { title: 'Custom Item Rows', url: 'customitemrows' },
        CustomFooter: { title: 'Custom Footer' },
        CustomGroupHeaders: { title: 'Custom Group Headers' },
        Advanced: { title: 'Variable Row Heights', url: 'variablerowheights' },
        KeyboardDragDrop: { title: 'Keyboard Column Reorder & Resize', url: 'keyboardcolumnreorderresize' },
        KeyboardOverrides: { title: 'Keyboard Overrides', url: 'keyboardoverrides' },
        DragDrop: { title: 'Drag & Drop', url: 'draganddrop' },
        NavigatingFocus: { title: 'Inner Navigation', url: 'innernavigation' },
        Shimmer: {},
        ProportionalColumns: { title: 'Proportional Columns', url: 'proportionalcolumns' },
      },
    },
    GroupedList: {},
    ActivityItem: {},
    DocumentCard: {},
    Facepile: {},
    HoverCard: {},
    Persona: {},
  },
  'Commands, Menus & Navs': {
    Breadcrumb: {},
    CommandBar: {},
    ContextualMenu: {},
    Nav: {},
    OverflowSet: {},
    Pivot: {},
  },
  'Notification & Engagement': {
    Coachmark: {},
    MessageBar: {},
    TeachingBubble: {},
  },
  Progress: {
    ProgressIndicator: {},
    Shimmer: {},
    Spinner: {},
  },
  Surfaces: {
    Callout: {},
    Dialog: {},
    Modal: {},
    Panel: {},
    ScrollablePane: {},
    Tooltip: {},
  },
  Charts: {
    Legends: {},
    LineChart: {},
    AreaChart: {},
    DonutChart: {},
    VerticalBarChart: {
      subPages: {
        Grouped: { title: 'Grouped' },
        VerticalStackedBarChart: { title: 'Stacked' },
      },
    },
    GaugeChart: {},
    HeatMapChart: {},
    HorizontalBarChart: {
      subPages: {
        StackedBarChart: { title: 'Stacked' },
        MultiStackedBarChart: { title: 'Multi Stacked' },
        WithAxis: { title: 'With Axis' },
      },
    },
    PieChart: {},
    SankeyChart: {},
    SparklineChart: {},
    TreeChart: {},
  },
  Utilities: {
    Announced: {
      subPages: {
        QuickActions: { title: 'Quick Actions' },
        SearchResults: { title: 'Search Results' },
        LazyLoading: { title: 'Lazy Loading' },
        BulkOperations: { title: 'Bulk Operations' },
      },
    },
    FocusTrapZone: {},
    FocusZone: {},
    Icon: {},
    Image: {},
    Keytips: {},
    Layer: {},
    MarqueeSelection: {},
    Overlay: {},
    Popup: {},
    ResizeGroup: {},
    Selection: {},
    Separator: {},
    Stack: {},
    Text: {},
    ThemeProvider: {},
    Themes: {},
  },
  References: {},
  // The "Other" category can be useful for local development, but it currently can also cause
  // non-web controls (such as Chip) to show up on the web controls page.
  // Other: {}
};

function generateCategories() {
  const categoryNames = Object.keys(categories);
  const pagesByCategory: { [category: string]: INavPage[] } = {};
  for (const category of categoryNames) {
    pagesByCategory[category] = [];
  }

  // Relative to this file, each page is located at a path like:
  // ../../../pages/Controls/DetailsListPage/DetailsListPage
  // or for sub-pages:
  // ../../../pages/Controls/DetailsListPage/DetailsListBasicPage

  // Use require.context to get a list of all the pages
  // https://webpack.js.org/api/module-methods/#requirecontext
  const requireContext = require.context('../../../pages/Controls', true, /^\.\/\w+Page\/\w+Page$/, 'lazy');

  /** Sub-page paths found while iterating through the list of actual pages */
  const componentSubPages: { [componentName: string]: string[] } = {};
  /** Generated page objects which will have sub-pages */
  const subPageCategories: { [componentName: string]: INavPage & CategoryPage } = {};

  // Make an INavPage object in the appropriate category for each page
  for (const pagePath of requireContext.keys()) {
    // pagePath will be like this:  ./DetailsListPage/DetailsListPage
    // or like this for a sub-page: ./DetailsListPage/DetailsListBasicPage
    const pathParts = pagePath.split('/');
    const componentName = pathParts[1].replace(/Page$/, ''); // DetailsList
    const isSubPage = pathParts[1] !== pathParts[2];
    if (isSubPage) {
      componentSubPages[componentName] = componentSubPages[componentName] || [];
      componentSubPages[componentName].push(pagePath);
      continue;
    }

    let foundCategory = false;
    for (const categoryName of categoryNames) {
      // Check each category to see if it contains the component
      const componentPageInfo = categories[categoryName][componentName];
      if (componentPageInfo) {
        // Add a page for the component to the appropriate category
        const page = _generatePage(requireContext, componentName, pagePath, componentPageInfo);
        pagesByCategory[categoryName].push(page);
        if (page.subPages) {
          // If this page has sub-pages, save the generated page and its sub-page info for later
          subPageCategories[componentName] = page;
        }
        foundCategory = true;
        break;
      }
    }

    // Stray pages go under "Other"
    if (!foundCategory && pagesByCategory.Other) {
      pagesByCategory.Other.push(_generatePage(requireContext, componentName, pagePath, {}));
    }
  }

  // Handle the sub-pages
  for (const parentComponentName of Object.keys(subPageCategories)) {
    const parentCategory = subPageCategories[parentComponentName];
    const subPages = parentCategory.subPages!;
    // clean up the parent page: remove the subPages prop, which isn't used in the real nav
    delete parentCategory.subPages;

    const childPagePaths = componentSubPages[parentComponentName];
    if (!childPagePaths.length) {
      continue; // no pages in this category
    }

    const parentPage = parentCategory as INavPage;
    // First page in the category is a non-category version of the parent page
    parentPage.pages = [{ ...parentPage }];
    parentPage.isCategory = true;
    delete parentPage.url;

    for (const pagePath of childPagePaths) {
      // pagePath will be like ./DetailsList/DetailsListBasicPage
      const pathParts = pagePath.split('/');
      // DetailsListBasic
      const pageComponentName = pathParts[2].replace(/Page$/, '');
      // Basic
      const pageName = pageComponentName.replace(parentComponentName, '');

      const subPageOverrides = subPages[pageName];
      if (subPageOverrides) {
        parentPage.pages.push(
          _generatePage(requireContext, pageComponentName, pagePath, {
            ...subPageOverrides,
            title: `${parentComponentName} - ${subPageOverrides.title || pageName}`,
            url: `${parentComponentName}/${subPageOverrides.url || pageName}`.toLowerCase(),
          }),
        );
      }
    }
  }

  // Add reference pages
  pagesByCategory.References = [...pagesByCategory.References, ..._loadReferences()];

  // Convert the categories to an array (filter out empty categories)
  return categoryNames
    .filter(category => !!pagesByCategory[category].length)
    .map(category => ({
      title: category,
      isCategory: true,
      pages: pagesByCategory[category],
    }));
}

function _generatePage(
  requireContext: __WebpackModuleApi.RequireContext,
  componentName: string,
  pagePath: string,
  overrides: CategoryPage,
): CategoryPage & INavPage {
  const { url, ...nonUrlOverrides } = overrides;
  return {
    title: componentName,
    url: '#/controls/web/' + (url || componentName.toLowerCase()),
    component: () => <LoadingComponent title={overrides.title || componentName} />,
    getComponent: cb => requireContext(pagePath).then((mod: any) => cb(mod[componentName + 'Page'])),
    ...nonUrlOverrides,
  };
}

function _loadReferences(): INavPage[] {
  const requireContext = require.context(
    '@fluentui/public-docsite-resources/dist/api/references',
    false,
    /\w+\.page\.json$/,
    'lazy',
  );

  return requireContext.keys().map(pagePath => {
    const pageName = pagePath.match(/(\w+)\.page\.json/)![1];
    return {
      title: pageName,
      url: '#/controls/web/references/' + pageName.toLowerCase(),
      isFilterable: true,
      component: () => <LoadingComponent title={pageName} />,
      getComponent: cb =>
        requireContext(pagePath).then((jsonDocs: IPageJson) => {
          cb(() => <ControlsAreaPage jsonDocs={jsonDocs} title={pageName} hideImplementationTitle />);
        }),
    };
  });
}

export const controlsPagesWeb: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/web',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb =>
      require.ensure([], require =>
        cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage),
      ),
  },
  ...generateCategories(),
];
