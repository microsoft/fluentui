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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Pivot correctly with custom className', () => {
    const component = renderer.create(
      <Pivot className='specialClassName'>
        <PivotItem linkText='' className='specialClassName' />
        <PivotItem linkText='' />
      </Pivot>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});