import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { IPersonaCoinStyles } from './PersonaCoin.types';
import { PersonaCoinView } from './PersonaCoin.view';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

// These tests will ensure that your styles regions have classname representation in snapshot output.
// (Also, classNames is a required prop for views, so we have to supply it for tests.)
const testPersonaCoinClassNames: IProcessedStyleSet<IPersonaCoinStyles> = {
  root: 'test-cn-root',
  subComponentStyles: {}
};

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('PersonaCoinView', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PersonaCoinView text="textProp" status="statusProp" classNames={testPersonaCoinClassNames} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
