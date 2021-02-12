import * as React from 'react';
import { MenuGroupHeader } from './MenuGroupHeader';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('MenuGroupHeader', () => {
  isConformant({
    Component: MenuGroupHeader,
    displayName: 'MenuGroupHeader',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuGroupHeader in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuGroupHeader>Default MenuGroupHeader</MenuGroupHeader>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
