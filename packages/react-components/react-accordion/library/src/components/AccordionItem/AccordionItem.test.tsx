import * as React from 'react';
import { render } from '@testing-library/react';

import { AccordionItem } from './AccordionItem';
import { isConformant } from '../../testing/isConformant';

describe('AccordionItem', () => {
  isConformant({
    Component: AccordionItem,
    displayName: 'AccordionItem',
    // Accordion does not have own styles
    disabledTests: ['make-styles-overrides-win'],
  });

  /**
   * Note: see more visual regression tests for AccordionItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<AccordionItem value={0}>Default AccordionItem</AccordionItem>);
    expect(container).toMatchSnapshot();
  });
});
