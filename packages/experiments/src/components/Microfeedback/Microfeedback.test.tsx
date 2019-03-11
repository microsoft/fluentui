import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Microfeedback } from './Microfeedback';

describe('Microfeedback', () => {
  it('renders correctly with no props', () => {
    const tree = renderer.create(<Microfeedback />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders text prop correctly', () => {
    const tree = renderer.create(<Microfeedback text="textProp" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
