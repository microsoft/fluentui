import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { MarqueeSelection } from './MarqueeSelection';

describe('MarqueeSelection', () => {
  it('renders MarqueeSelection correctly', () => {
    const component = renderer.create(<MarqueeSelection />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
}