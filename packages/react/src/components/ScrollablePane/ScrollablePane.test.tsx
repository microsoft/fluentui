import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ScrollablePane } from './ScrollablePane';

describe('ScrollablePane', () => {
  it('renders correctly', () => {
    // Trying to call MutationObserver.observe in ScrollablePane.componentDidMount on a fake node
    // causes an exception in React 17. Just mock it since it's not important for this test.
    jest.spyOn(MutationObserver.prototype, 'observe').mockImplementation();

    const component = renderer.create(<ScrollablePane />, {
      // We need a real element here so the MutationObserver doesn't explode.
      createNodeMock: element => document.createElement('div'),
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
