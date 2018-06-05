import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Fabric } from './Fabric';

describe('Fabric', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Fabric>test</Fabric>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
