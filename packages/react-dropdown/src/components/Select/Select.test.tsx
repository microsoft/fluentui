import * as React from 'react';
import '@testing-library/jest-dom';
import { Select } from './Select';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Select in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Select>Default Select</Select>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
