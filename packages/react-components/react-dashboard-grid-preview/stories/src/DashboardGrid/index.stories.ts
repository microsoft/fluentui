import {
  DashboardGrid,
  DashboardGridProvider,
} from '@fluentui/react-dashboard-grid-preview';

export { ParityPlayground } from './DashboardGridParityPlayground.stories';
export { ShadowDom } from './DashboardGridShadowDom.stories';
export { Print } from './DashboardGridPrint.stories';

export default {
  id: 'components-dashboard-grid-preview',
  title: 'Components/DashboardGrid (preview)',
  component: DashboardGrid,
  subcomponents: { DashboardGridProvider },
  parameters: {
    docs: {
      description: {
        component:
          'DashboardGrid provides responsive, nested, pointer, keyboard Arrange mode, persistence, and print behavior for dashboard layouts.',
      },
    },
  },
};
