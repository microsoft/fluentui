import * as React from 'react';
import { AccordionItem } from './AccordionItem';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { AccordionItemContext } from './AccordionItemContext';

describe('AccordionItem', () => {
  isConformant({
    Component: AccordionItem,
    displayName: 'AccordionItem',
    helperComponents: [AccordionItemContext.Provider],
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
    const component = renderer.create(<AccordionItem value={0}>Default AccordionItem</AccordionItem>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
