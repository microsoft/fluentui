import { Stagger } from '@fluentui/react-motion-components-preview';
import StaggerDescription from './StaggerDescription.md';

export { Default } from './StaggerDefault.stories';
export { UserCards } from './StaggerUserCards.stories';
export { DashboardTiles } from './StaggerDashboard.stories';
export { NotificationCenter } from './StaggerNotifications.stories';
export { FileExplorer } from './StaggerFileExplorer.stories';
export { AdvancedConfiguration } from './StaggerAdvancedConfiguration.stories';

export default {
  title: 'Motion/Choreography (preview)/Stagger',
  component: Stagger,
  parameters: {
    docs: {
      description: {
        component: StaggerDescription,
      },
    },
  },
};
