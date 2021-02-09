import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ScrollablePane } from './ScrollablePane';

describe('ScrollablePane', () => {
  it('renders correctly', () => {
    // Trying to call MutationObserver.observe in ScrollablePane.componentDidMount on a fake node
    // causes an exception in react 17/jest 25. Just mock it since it's not important for this test.
    jest.spyOn(MutationObserver.prototype, 'observe').mockImplementation();

    const component = renderer.create(<ScrollablePane />, {
      createNodeMock: element => ({}),
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
