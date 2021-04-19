import * as React from 'react';
import { Tooltip } from './Tooltip';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Tooltip in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Tooltip>Default Tooltip</Tooltip>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
