import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../../testing/isConformant';
import { Accordion } from '../Accordion';
import { AccordionHeader } from '../AccordionHeader';
import { AccordionPanel } from '../AccordionPanel';
import { AccordionItem } from './AccordionItem';
import type { AccordionItemState } from './AccordionItem.types';
import { accordionItemClassNames, useAccordionItemStyles } from './useAccordionItemStyles';

// Every state the component hands to the headless context-values helper, in call order.
const mockContextValuesStates: { root?: { className?: string } }[] = [];

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/accordion', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/accordion');
  const { deepFreezeState } = require('../../../testing/freezeState');

  return {
    ...actual,
    useAccordionItem: (...args: Parameters<typeof actual.useAccordionItem>) =>
      deepFreezeState(actual.useAccordionItem(...args)),
    useAccordionItemContextValues: (state: { root?: { className?: string } }) => {
      mockContextValuesStates.push(state);

      return actual.useAccordionItemContextValues(state);
    },
  };
});

const renderTrio = () =>
  render(
    <Accordion>
      <AccordionItem value="a" data-testid="item">
        <AccordionHeader data-testid="header">Section</AccordionHeader>
        <AccordionPanel data-testid="panel">Body</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );

describe('AccordionItem', () => {
  beforeEach(() => {
    mockContextValuesStates.length = 0;
  });

  isConformant({
    Component: AccordionItem,
    displayName: 'AccordionItem',
    requiredProps: { value: 'a' } as never,
  });

  it('stamps its marker pair, slash-free class first', () => {
    // This component ships no stylesheet of its own: the marker set is the only class-shaped
    // evidence that its styles hook still runs.
    const { getByTestId } = renderTrio();
    const root = getByTestId('item');

    expect(root).toHaveClass('fui-accordion-item');
    expect(root).toHaveClass('group/fui-accordion-item');
    expect(root.classList[0]).toBe('fui-accordion-item');
    expect(accordionItemClassNames.root).toBe('fui-accordion-item group/fui-accordion-item');
  });

  it('carries the headless open and disabled stamps', () => {
    const { getByTestId } = render(
      <Accordion defaultOpenItems="a">
        <AccordionItem value="a" data-testid="open">
          <AccordionHeader>Open</AccordionHeader>
        </AccordionItem>
        <AccordionItem value="b" disabled data-testid="disabled">
          <AccordionHeader>Disabled</AccordionHeader>
        </AccordionItem>
      </Accordion>,
    );

    expect(getByTestId('open').getAttribute('data-open')).toBe('');
    expect(getByTestId('disabled').getAttribute('data-disabled')).toBe('');
    expect(getByTestId('disabled').hasAttribute('data-open')).toBe(false);
  });

  it('drives its header and panel from one toggle', () => {
    const { getByTestId } = renderTrio();

    expect(getByTestId('item').hasAttribute('data-open')).toBe(false);

    fireEvent.click(getByTestId('header').querySelector('button')!);

    for (const id of ['item', 'header', 'panel']) {
      expect(getByTestId(id).getAttribute('data-open')).toBe('');
    }
  });

  it('does not toggle a disabled item', () => {
    const { getByTestId } = render(
      <Accordion>
        <AccordionItem value="a" disabled data-testid="item">
          <AccordionHeader data-testid="header">Section</AccordionHeader>
        </AccordionItem>
      </Accordion>,
    );

    fireEvent.click(getByTestId('header').querySelector('button')!);

    expect(getByTestId('item').hasAttribute('data-open')).toBe(false);
  });

  it('builds its context values from the styled state', () => {
    renderTrio();

    expect(mockContextValuesStates[mockContextValuesStates.length - 1].root!.className).toContain('fui-accordion-item');
  });

  it('passes consumer props and the ref through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <AccordionItem ref={ref} value="a" data-testid="item" id="itm" className="consumer" style={{ zIndex: 5 }}>
        <AccordionHeader>Section</AccordionHeader>
      </AccordionItem>,
    );

    const root = getByTestId('item');

    expect(root.id).toBe('itm');
    expect(root).toHaveClass('consumer');
    expect(root.style.zIndex).toBe('5');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
    } as unknown as AccordionItemState;

    const styled = useAccordionItemStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});
