import * as React from 'react';
import { MenuGroup } from './MenuGroup';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('MenuGroup', () => {
  isConformant({
    Component: MenuGroup,
    displayName: 'MenuGroup',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuGroup in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuGroup>Default MenuGroup</MenuGroup>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
