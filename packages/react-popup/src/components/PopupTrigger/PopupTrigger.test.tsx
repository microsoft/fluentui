import * as React from 'react';
import { PopupTrigger } from './PopupTrigger';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';

describe('PopupTrigger', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for PopupTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <PopupTrigger>
        <button>Popup trigger</button>
      </PopupTrigger>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
