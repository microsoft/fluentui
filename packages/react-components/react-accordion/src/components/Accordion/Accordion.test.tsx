import * as React from 'react';
import { Accordion } from './Accordion';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../testing/isConformant';

describe('Accordion', () => {
  isConformant({
    Component: Accordion,
    displayName: 'Accordion',
    // Accordion does not have own styles
    disabledTests: ['make-styles-overrides-win', 'consistent-callback-args'],
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
