import StaggerDescription from './StaggerDescription.md';

// Basic examples
export { Presence } from './StaggerPresence.stories';
export { Heterogeneous } from './StaggerHeterogeneous.stories';
export { Reversed } from './StaggerReversed.stories';
export { ItemDelay } from './StaggerItemDelay.stories';
export { StaggerIn } from './StaggerStaggerIn.stories';
export { StaggerOut } from './StaggerStaggerOut.stories';
export { Text } from './StaggerText.stories';
export { PlainElements } from './StaggerPlainElements.stories';

// Real-world examples
export { ExpandableContainer } from './StaggerExpandableContainer.stories';
export { BouncingDots } from './StaggerBouncingDots.stories';
export { StaggerSpinners } from './StaggerSpinners.stories';

export default {
  title: 'Motion/Choreography (preview)/Stagger',
  parameters: {
    docs: {
      description: {
        component: StaggerDescription,
      },
    },
  },
};
