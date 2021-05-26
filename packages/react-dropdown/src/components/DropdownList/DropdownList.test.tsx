import * as React from 'react';
import { DropdownList } from './DropdownList';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { DropdownListProvider } from '../../contexts/dropdownListContext';

describe('DropdownList', () => {
  isConformant({
    Component: DropdownList,
    displayName: 'DropdownList',
    helperComponents: [DropdownListProvider],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for DropdownList in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<DropdownList>Default DropdownList</DropdownList>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
