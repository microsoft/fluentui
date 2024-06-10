import { Nav } from '@fluentui/react-nav-preview';

// import descriptionMd from './NavDescription.md';
// import bestPracticesMd from './NavBestPractices.md';

// export { Default } from './NavDefault.stories';
// export { WithDefaultSelection } from './NavWithDefaultSelection.stories';
// export { WithNestedSubItems } from './NavWithNestedSubItems.stories';
// export { WithNestedSubItemsDefaultSelection } from './NavWithNestedSubItemsWithDefaultSelection.stories';
// export { WithNestedSubItemsWithDefaultSelectionSingleCategory } from './NavWithNestedSubItemsWithDefaultSelectionSingleCategory.stories';

export { NavDrawerDefault } from '../NavDrawer/NavDrawerDefault.stories';
export { NavDrawerSize } from '../NavDrawer/NavDrawerSize.stories';

export default {
  title: 'Preview Components/Nav',
  component: Nav,
  parameters: {
    // docs: {
    //   description: {
    //     component: [descriptionMd, bestPracticesMd].join('\n'),
    //   },
    // },
  },
};
