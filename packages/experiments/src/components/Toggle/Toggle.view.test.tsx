import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { IToggleStyles } from './Toggle.types';
import { ToggleView } from './Toggle.view';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

// These tests will ensure that your styles regions have classname representation in snapshot output.
// (Also, classNames is a required prop for views, so we have to supply it for tests.)
const testToggleClassNames: IProcessedStyleSet<IToggleStyles> = {
  root: 'test-cn-root',
  label: 'test-cn-label',
  container: 'test-cn-container',
  pill: 'test-cn-pill',
  thumb: 'test-cn-thumb',
  text: 'test-cn-text',
  subComponentStyles: {}
};

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('ToggleView', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ToggleView label="LabelProp" onText="On" offText="Off" checked={true} classNames={testToggleClassNames} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
