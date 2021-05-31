import * as React from 'react';
import '@testing-library/jest-dom';
import { DropdownTrigger } from './DropdownTrigger';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('DropdownTrigger', () => {
  isConformant({
    Component: DropdownTrigger,
    displayName: 'DropdownTrigger',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for DropdownTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<DropdownTrigger>Default DropdownTrigger</DropdownTrigger>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
