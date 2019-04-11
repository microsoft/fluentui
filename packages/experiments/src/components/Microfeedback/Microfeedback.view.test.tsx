import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { MicrofeedbackView } from './Microfeedback.view';

// PLEASE NOTE:
// It's recommended that you do snapshot tests against the component (see MicrofeedbackTest.tsx)
// in order to capture styling and guard against styling regressions. However, view tests can be helpful for testing
// view-only props that are not exposed via the component's API. (If styling is important for view props cases, consider
// a component test exercising these props as well.)

// Views are just pure functions with no statefulness, which means they can get full code coverage
// with snapshot tests exercising permutations of the props.
describe('MicrofeedbackView', () => {
  it('renders status view prop correctly', () => {
    const tree = renderer.create(<MicrofeedbackView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
