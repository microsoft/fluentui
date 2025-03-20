// import { DefaultExperiments as Experiments } from './Experiments.stories';
import ExperimentsDescription from './ExperimentsDescription.md';

// import { Default } from './ExperimentsDefault.stories';
// export { Default } from './ExperimentsDefault.stories';
export { ExperimentsRotate as Rotate } from './ExperimentsRotate.stories';
export { ExperimentsRotateAB as RotateAB } from './ExperimentsRotateAB.stories';
export { ExperimentsBlur as Blur } from './ExperimentsBlur.stories';
export { ExperimentsBlurAB as BlurAB } from './ExperimentsBlurAB.stories';
export { ExperimentsSpiral as Spiral } from './ExperimentsSpiral.stories';
export { ExperimentsWipe as Wipe } from './ExperimentsWipe.stories';
export { ExperimentsSlideUnder as SlideUnder } from './ExperimentsSlideUnder.stories';
// export { ExperimentsSlideScaleAB as SlideScaleAB } from './ExperimentsSlideScaleAB.stories';
// TODO: fix the lack of .In and .Out in the SlideUnder component
// export { ExperimentsSlideUnderAB as SlideUnderAB } from './ExperimentsSlideUnderAB.stories';
export { ExperimentsReverseSlower as ReverseSlower } from './ExperimentsReverseSlower.stories';
export { ExperimentsSeries as Series } from './ExperimentsSeries.stories';
export { ExperimentsStaggerSkeleton as StaggerSkeleton } from './ExperimentsStaggerSkeleton.stories';
export { ExperimentsStagger as Stagger } from './ExperimentsStagger.stories';
export { ExperimentsCarousel as Carousel } from './ExperimentsCarousel.stories';

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
