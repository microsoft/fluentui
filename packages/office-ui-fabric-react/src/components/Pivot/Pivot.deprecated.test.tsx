import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as WarnUtil from '@uifabric/utilities/lib-commonjs/warn';
import { resetIds } from '../../Utilities';

import { Pivot, PivotItem } from './index';

describe('Pivot', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    jest.spyOn(WarnUtil, 'warnDeprecations').mockImplementation(() => {
      /** no impl **/
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  it('renders link Pivot correctly', () => {
    const component = renderer.create(
      <Pivot>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
