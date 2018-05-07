import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { MarqueeSelection } from './MarqueeSelection';
import { Selection } from 'office-ui-fabric-react/lib/MarqueeSelection';

describe('MarqueeSelection', () => {
  it('renders MarqueeSelection correctly', () => {
    const component = renderer.create(<MarqueeSelection selection={ new Selection() } />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
