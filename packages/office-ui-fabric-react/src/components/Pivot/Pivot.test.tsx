import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Pivot } from './Pivot';
import { PivotItem } from './PivotItem';

describe('Pivot', () => {
  it('renders Pivot correctly', () => {
    const component = renderer.create(
      <Pivot>
        <PivotItem linkText='' />
        <PivotItem linkText='' />
      </Pivot>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});