import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { AccordionPanel } from './AccordionPanel';
import { isConformant } from '../../testing/isConformant';
import { AccordionItemProvider } from '../../contexts/accordionItem';
import { mockAccordionItemContextValue } from '../../testing/mockContextValue';
import { useAccordionPanelBase_unstable } from './useAccordionPanel';

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

  it('sets inert and tabIndex -1 on root when closed to prevent keyboard focus entering the panel', () => {
    const ref = React.createRef<HTMLElement>();
    const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
      <AccordionItemProvider value={mockAccordionItemContextValue({ open: false })}>{children}</AccordionItemProvider>
    );
    const { result } = renderHook(() => useAccordionPanelBase_unstable({}, ref), { wrapper });
    expect(result.current.root.inert).toBe(true);
    expect(result.current.root.tabIndex).toBe(-1);
  });

  it('does not set inert or tabIndex -1 on root when open', () => {
    const ref = React.createRef<HTMLElement>();
    const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
      <AccordionItemProvider value={mockAccordionItemContextValue({ open: true })}>{children}</AccordionItemProvider>
    );
    const { result } = renderHook(() => useAccordionPanelBase_unstable({}, ref), { wrapper });
    expect(result.current.root.inert).toBeUndefined();
    expect(result.current.root.tabIndex).toBeUndefined();
  });
});
