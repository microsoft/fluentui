import { Nav } from '@fluentui/react-nav-preview';

// Todo: light these up
// import descriptionMd from './NavDescription.md';
// import bestPracticesMd from './NavBestPractices.md';

export { Basic } from '../NavDrawer/Basic.stories';
export { VariableDensityItems } from '../NavDrawer/VariableDensityItems.stories';
export { Controlled } from '../NavDrawer/Controlled.stories';
export { SplitNavItems } from '../NavDrawer/SplitNavItems.stories';

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
