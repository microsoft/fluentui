import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { Dropdown } from './Dropdown';
import { render } from '@testing-library/react';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { DropdownList } from '../DropdownList/index';
import { DropdownOption } from '../DropdownOption/index';

describe('Dropdown', () => {
  isConformant({
    skipAsPropTests: true,
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
    Component: Dropdown,
    displayName: 'Dropdown',
    requiredProps: {
      children: [
        <DropdownList key="item">
          <DropdownOption>Item</DropdownOption>
        </DropdownList>,
      ],
    },
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    resetIdsForTests();

    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Dropdown in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <Dropdown>
        <DropdownList>
          <DropdownOption>Item</DropdownOption>
        </DropdownList>
      </Dropdown>,
    );

    expect(container).toMatchSnapshot();
  });
});
