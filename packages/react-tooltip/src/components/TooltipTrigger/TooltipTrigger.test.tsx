import * as React from 'react';
import { TooltipTrigger } from './TooltipTrigger';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { TooltipTriggerProps } from './TooltipTrigger.types';

describe('TooltipTrigger', () => {
  isConformant<TooltipTriggerProps>({
    Component: TooltipTrigger,
    displayName: 'TooltipTrigger',
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for TooltipTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <TooltipTrigger tooltip="Hello world">
        <button>hello world</button>
      </TooltipTrigger>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
