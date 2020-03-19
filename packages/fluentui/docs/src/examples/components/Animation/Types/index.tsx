import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import { Segment } from '@fluentui/react-northstar';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Animation specified by the name property."
      examplePath="components/Animation/Types/AnimationExample"
    />
    <ComponentExample
      title="Duration"
      description="An Animation can specify how long time an animation should take to complete."
      examplePath="components/Animation/Types/AnimationExampleDuration"
    />
    <ComponentExample
      title="Delay"
      description="An Animation can specify a delay for the start of an animation."
      examplePath="components/Animation/Types/AnimationExampleDelay"
    />
    <ComponentExample
      title="Direction"
      description="An Animation can specify whether an animation should be played forwards, backwards or in alternate cycles."
      examplePath="components/Animation/Types/AnimationExampleDirection"
    />
    <ComponentExample
      title="Iteration count"
      description="An Animation can specify the number of times an animation should run or specify infinite to make the animation continue forever."
      examplePath="components/Animation/Types/AnimationExampleIterationCount"
    />
    <ComponentExample
      title="Fill mode"
      description="An Animation can specify a style for the target element when the animation is not playing (before it starts, after it ends, or both)."
      examplePath="components/Animation/Types/AnimationExampleFillMode"
    />
    <ComponentExample
      title="Timing function"
      description="An Animation can specify the speed curve of the animation."
      examplePath="components/Animation/Types/AnimationExampleTimingFunction"
    />
    <ComponentExample
      title="Play state"
      description="An Animation can specify whether the animation is running or paused. "
      examplePath="components/Animation/Types/AnimationExamplePlayState"
    />
    <ComponentExample
      title="Keyframe params"
      description="An Animation can specify different params for the keyframe."
      examplePath="components/Animation/Types/AnimationExampleKeyframeParams"
    >
      <Segment style={{ marginTop: '10px' }} color="orange" inverted>
        Be aware, each unique keyframeParams will render as a new @keyframes!
      </Segment>
    </ComponentExample>
  </ExampleSection>
);

export default Types;
