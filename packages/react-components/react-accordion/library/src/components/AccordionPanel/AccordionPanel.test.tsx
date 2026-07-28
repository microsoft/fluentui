import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
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
