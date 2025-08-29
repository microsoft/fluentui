import { Stagger } from '@fluentui/react-motion-components-preview';
import StaggerDescription from './StaggerDescription.md';

export { Default } from './StaggerDefault.stories';
export { Reversed } from './StaggerReversed.stories';
export { ItemDelay } from './StaggerItemDelay.stories';
export { PlainElements } from './StaggerPlainElements.stories';
export { ModeComparison } from './StaggerModeComparison.stories';
export { OneWayIn } from './StaggerOneWayIn.stories';
export { ExpandableContainer } from './StaggerExpandableContainer.stories';
export { StaggerSpinners } from './StaggerSpinners.stories';
export { BouncingDots } from './StaggerBouncingDots.stories';

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
