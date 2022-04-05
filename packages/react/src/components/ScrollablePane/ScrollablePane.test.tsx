import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ScrollablePane } from './ScrollablePane';

describe('ScrollablePane', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ScrollablePane />, {
      // We need a real element here so the MutationObserver doesn't explode.
      createNodeMock: element => document.createElement('div'),
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
