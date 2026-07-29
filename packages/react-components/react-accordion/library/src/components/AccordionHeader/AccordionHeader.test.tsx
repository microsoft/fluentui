import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { AccordionHeader } from './AccordionHeader';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import { render, fireEvent, screen } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Accordion } from '../Accordion/Accordion';
import { AccordionItem } from '../AccordionItem';
import { AccordionPanel } from '../AccordionPanel';

describe('AccordionHeader', () => {
  isConformant<AccordionHeaderProps>({
    Component: AccordionHeader,
    displayName: 'AccordionHeader',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: [
      'make-styles-overrides-win',
      // Statics removal (DECISIONS.md D16.1 / D16.6) — see Accordion.test.tsx for the full
      // rationale. The `has-static-classnames` testOptions entry that used to render this
      // component with an `icon` (so the `fui-AccordionHeader__icon` static appeared in the
      // DOM) went with it: there are no sub-slot statics left to find.
      'component-has-static-classnames-object',
    ],
    // `component-has-group-marker` asserts the D16 public contract: exactly one
    // `group/fui-accordion-header` marker on the outermost slot, and never at `classList[0]`
    // (DECISIONS.md D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for AccordionHeader in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<AccordionHeader>Default AccordionHeader</AccordionHeader>);
    expect(container.firstChild).toMatchSnapshot();
  });

  /**
   * Note: see more visual regression tests for AccordionHeader in /apps/vr-tests.
   */
  it('renders when expandIcon is null', () => {
    const { container } = render(<AccordionHeader expandIcon={null}>Default AccordionHeader</AccordionHeader>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should invoke click and toggle', () => {
    const mockClick = jest.fn();
    render(
      <Accordion collapsible openItems={0} onToggle={mockClick}>
        <AccordionItem value={0}>
          <AccordionHeader button={{ onClick: mockClick }}>Header</AccordionHeader>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button, { defaultPrevented: false });
    expect(mockClick).toHaveBeenCalledTimes(2);
  });

  it('should invoke click and prevent toggle', () => {
    const mockClick = jest.fn();
    render(
      <Accordion collapsible openItems={0} onToggle={mockClick}>
        <AccordionItem value={0}>
          <AccordionHeader button={{ onClick: mockClick }}>Header</AccordionHeader>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    const button = screen.getByRole('button');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'defaultPrevented', { value: true });
    button.dispatchEvent(event);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
