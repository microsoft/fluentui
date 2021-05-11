import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ScrollablePane } from './ScrollablePane';

describe('ScrollablePane', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ScrollablePane />, {
      createNodeMock: element => ({}),
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
