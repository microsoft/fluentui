import * as React from 'react';
import { Divider } from './Divider';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Divider', () => {
  isConformant({
    Component: Divider,
    displayName: 'Divider',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Divider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Divider>Default Divider</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
