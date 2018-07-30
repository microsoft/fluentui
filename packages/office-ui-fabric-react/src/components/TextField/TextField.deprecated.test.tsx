import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as WarnUtil from '@uifabric/utilities/lib-commonjs/warn';

import { resetIds } from '../../Utilities';
import { TextField } from './TextField';

describe('TextField deprecated', () => {
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
    resetIds();
  });

  it('renders with deprecated props affecting styling', () => {
    const component = renderer.create(<TextField addonString={'test addonString'} iconClass={'test-iconClass'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
