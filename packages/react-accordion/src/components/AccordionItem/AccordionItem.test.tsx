import * as React from 'react';
import { AccordionItem } from './AccordionItem';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('AccordionItem', () => {
  isConformant({
    Component: AccordionItem,
    displayName: 'AccordionItem',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for AccordionItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<AccordionItem>Default AccordionItem</AccordionItem>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
