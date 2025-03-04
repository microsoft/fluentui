// import { DefaultExperiments as Experiments } from './Experiments.stories';
import ExperimentsDescription from './ExperimentsDescription.md';

// import { Default } from './ExperimentsDefault.stories';
// export { Default } from './ExperimentsDefault.stories';
export { ExperimentsRotate as Rotate } from './ExperimentsRotate.stories';
export { ExperimentsBlur as Blur } from './ExperimentsBlur.stories';
export { ExperimentsSpiral as Spiral } from './ExperimentsSpiral.stories';

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
