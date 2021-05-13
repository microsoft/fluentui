import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { AccordionHeader } from './AccordionHeader';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { AccordionHeaderContext } from './useAccordionHeaderContext';

describe('AccordionHeader', () => {
  isConformant({
    Component: AccordionHeader,
    displayName: 'AccordionHeader',
    helperComponents: [AccordionHeaderContext.Provider],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    resetIdsForTests();

    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for AccordionHeader in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<AccordionHeader>Default AccordionHeader</AccordionHeader>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
