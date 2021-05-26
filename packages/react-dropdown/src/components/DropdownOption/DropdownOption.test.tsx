import * as React from 'react';
import '@testing-library/jest-dom';
import { DropdownOption } from './DropdownOption';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('DropdownOption', () => {
  isConformant({
    Component: DropdownOption,
    displayName: 'DropdownOption',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for DropdownOption in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<DropdownOption>Default DropdownOption</DropdownOption>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
