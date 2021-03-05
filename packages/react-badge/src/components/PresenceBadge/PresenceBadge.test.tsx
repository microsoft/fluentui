import * as React from 'react';
import { PresenceBadge } from './PresenceBadge';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Presence', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'Presence',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Badge in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<PresenceBadge />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
