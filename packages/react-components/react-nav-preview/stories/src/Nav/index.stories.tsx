import { Nav } from '@fluentui/react-nav-preview';

// Todo: light these up
// import descriptionMd from './NavDescription.md';
// import bestPracticesMd from './NavBestPractices.md';

export { NavDrawerDefault } from '../NavDrawer/NavDrawerDefault.stories';
export { NavDrawerSize } from '../NavDrawer/NavDrawerSize.stories';
export { NavDrawerControlled } from '../NavDrawer/NavDrawerControlled.stories';
export { NavDrawerSplitSize } from '../NavDrawer/NavDrawerSplitSize.stories';

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
