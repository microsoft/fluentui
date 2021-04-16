import * as React from 'react';
import { TooltipProvider } from './TooltipProvider';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('TooltipProvider', () => {
  isConformant({
    Component: TooltipProvider,
    displayName: 'TooltipProvider',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for TooltipProvider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<TooltipProvider>Default TooltipProvider</TooltipProvider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
