import * as React from 'react';
import { Popup } from './Popup';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';

describe('Popup', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Popup in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Popup>Default Popup</Popup>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
