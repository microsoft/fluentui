import * as React from 'react';
import { Label } from './Label';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Label', () => {
  isConformant({
    Component: Label,
    displayName: 'Label',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Label in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Label>Default Label</Label>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
