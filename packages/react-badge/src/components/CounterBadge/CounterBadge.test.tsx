import * as React from 'react';
import { CounterBadge } from './CounterBadge';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for CounterBadge in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<CounterBadge>Default CounterBadge</CounterBadge>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
