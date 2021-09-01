import * as React from 'react';
import { Accordion } from './Accordion';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';
import { AccordionContext } from './AccordionContext';

describe('Accordion', () => {
  isConformant({
    Component: Accordion,
    displayName: 'Accordion',
    helperComponents: [AccordionContext.Provider],
    // Accordion does not have own styles
    disabledTests: ['classname-wins'],
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
