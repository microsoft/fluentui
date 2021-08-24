import * as React from 'react';
import { AccordionPanel } from './AccordionPanel';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('AccordionPanel', () => {
  isConformant({
    Component: AccordionPanel,
    displayName: 'AccordionPanel',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for AccordionPanel in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<AccordionPanel>Default AccordionPanel</AccordionPanel>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
