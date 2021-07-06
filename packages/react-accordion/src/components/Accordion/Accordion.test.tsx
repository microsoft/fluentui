import * as React from 'react';
import { Accordion } from './Accordion';
import * as renderer from 'react-test-renderer';
import { DescendantProvider } from '@fluentui/react-utilities';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { AccordionContext, AccordionDescendantContext } from './useAccordionContext';

describe('Accordion', () => {
  isConformant({
    Component: Accordion,
    displayName: 'Accordion',
    helperComponents: [AccordionContext.Provider, DescendantProvider, AccordionDescendantContext.Provider],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Accordion in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Accordion>Default Accordion</Accordion>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
