// import { DefaultExperiments as Experiments } from './Experiments.stories';
import ExperimentsDescription from './ExperimentsDescription.md';

// import { Default } from './ExperimentsDefault.stories';
// export { Default } from './ExperimentsDefault.stories';
export { ExperimentsRotate as Rotate } from './ExperimentsRotate.stories';
export { ExperimentsBlur as Blur } from './ExperimentsBlur.stories';
export { ExperimentsSpiral as Spiral } from './ExperimentsSpiral.stories';
export { ExperimentsWipe as Wipe } from './ExperimentsWipe.stories';
export { ExperimentsSlideUnder as SlideUnder } from './ExperimentsSlideUnder.stories';
export { ExperimentsSeries as Series } from './ExperimentsSeries.stories';

export default {
  title: 'Motion/Experiments',
  // component: Default,
  parameters: {
    docs: {
      description: {
        component: ExperimentsDescription,
      },
    },
  },
};
