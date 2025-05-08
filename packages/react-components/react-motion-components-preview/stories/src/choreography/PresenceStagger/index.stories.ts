import { PresenceStagger } from './../../../../library/src/choreography/PresenceStagger';
import PresenceStaggerDescription from './PresenceStaggerDescription.md';

export { Default } from './PresenceStaggerDefault.stories';

export default {
  title: 'Motion/Choreography (preview)/PresenceStagger',
  component: PresenceStagger,
  parameters: {
    docs: {
      description: {
        component: PresenceStaggerDescription,
      },
    },
  },
};
