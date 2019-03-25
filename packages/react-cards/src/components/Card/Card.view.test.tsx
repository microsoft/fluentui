import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { CardView } from './Card.view';

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('CardView', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CardView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
