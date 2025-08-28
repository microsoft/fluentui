import * as React from 'react';
import { render } from '@testing-library/react';
import { AccordionPanel } from './AccordionPanel';
import { isConformant } from '../../testing/isConformant';
import { AccordionItemProvider } from '../../contexts/accordionItem';
import { mockAccordionItemContextValue } from '../../testing/mockContextValue';

describe('AccordionPanel', () => {
  const Wrapper: React.FC<{ children?: React.ReactNode }> = props => (
    <AccordionItemProvider
      value={mockAccordionItemContextValue({
        open: true,
      })}
    >
      {props.children}
    </AccordionItemProvider>
  );

  isConformant({
    Component: AccordionPanel,
    displayName: 'AccordionPanel',
    renderOptions: { wrapper: Wrapper },
  });

  /**
   * Note: see more visual regression tests for AccordionPanel in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<AccordionPanel>Default AccordionPanel</AccordionPanel>);
    expect(container).toMatchSnapshot();
  });
});
