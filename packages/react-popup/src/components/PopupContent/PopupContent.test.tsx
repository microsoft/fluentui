import * as React from 'react';
import { PopupContent } from './PopupContent';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('PopupContent', () => {
  isConformant({
    Component: PopupContent,
    displayName: 'PopupContent',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for PopupContent in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<PopupContent>Default PopupContent</PopupContent>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
