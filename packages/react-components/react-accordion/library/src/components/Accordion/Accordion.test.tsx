import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Accordion } from './Accordion';

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
    const { container } = render(<Accordion>Default Accordion</Accordion>);
    expect(container).toMatchSnapshot();
  });
});
