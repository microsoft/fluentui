import { Stagger } from '@fluentui/react-motion-components-preview';
import StaggerDescription from './StaggerDescription.md';

// Basic examples - show simple features first
export { Presence } from './StaggerPresence.stories';
export { PlainElements } from './StaggerPlainElements.stories';
export { Reversed } from './StaggerReversed.stories';
export { ItemDelay } from './StaggerItemDelay.stories';
export { StaggerIn } from './StaggerStaggerIn.stories';
export { StaggerOut } from './StaggerStaggerOut.stories';
export { Text } from './StaggerText.stories';

// Real-world examples
export { ExpandableContainer } from './StaggerExpandableContainer.stories';
export { BouncingDots } from './StaggerBouncingDots.stories';
export { StaggerSpinners } from './StaggerSpinners.stories';

// Advanced configuration - power user features at the end
export { HideMode } from './StaggerHideMode.stories';
export { DelayMode } from './StaggerDelayMode.stories';

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
