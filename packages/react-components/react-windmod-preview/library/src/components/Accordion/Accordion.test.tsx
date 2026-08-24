import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { AccordionHeader } from '../AccordionHeader/AccordionHeader';
import { AccordionItem } from '../AccordionItem/AccordionItem';
import { AccordionPanel } from '../AccordionPanel/AccordionPanel';
import { Accordion } from './Accordion';
import type { AccordionState } from './Accordion.types';
import { accordionClassNames, useAccordionStyles } from './useAccordionStyles';

// Every state the component hands to the headless context-values helper, in call order.
const mockContextValuesStates: { root?: { className?: string } }[] = [];

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/accordion', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/accordion');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAccordion: (...args: Parameters<typeof actual.useAccordion>) => deepFreezeState(actual.useAccordion(...args)),
    useAccordionContextValues: (state: { root?: { className?: string } }) => {
      mockContextValuesStates.push(state);

      return actual.useAccordionContextValues(state);
    },
  };
});

const item = (value: string) => (
  <AccordionItem key={value} value={value} data-testid={`item-${value}`}>
    <AccordionHeader data-testid={`header-${value}`}>{value}</AccordionHeader>
    <AccordionPanel data-testid={`panel-${value}`}>body {value}</AccordionPanel>
  </AccordionItem>
);

const renderAccordionTree = (props: React.ComponentProps<typeof Accordion> = {}) => {
  const result = render(
    <Accordion data-testid="root" {...props}>
      {item('a')}
      {item('b')}
    </Accordion>,
  );

  return {
    ...result,
    toggle: (value: string) => fireEvent.click(result.getByTestId(`header-${value}`).querySelector('button')!),
    isOpen: (value: string) => result.getByTestId(`item-${value}`).hasAttribute('data-open'),
  };
};

describe('Accordion', () => {
  beforeEach(() => {
    mockContextValuesStates.length = 0;
  });

  isConformant({
    Component: Accordion,
    displayName: 'Accordion',
  });

  it('stamps its marker pair, slash-free class first', () => {
    // This component ships no stylesheet of its own — the base typography and text colour every
    // panel paints come from FluentProvider — so the marker set is the whole class contract.
    const { getByTestId } = renderAccordionTree();
    const root = getByTestId('root');

    expect(root).toHaveClass('fui-accordion');
    expect(root).toHaveClass('group/fui-accordion');
    expect(root.classList[0]).toBe('fui-accordion');
    expect(accordionClassNames.root).toBe('fui-accordion group/fui-accordion');
  });

  it.each([
    ['data-collapsible', { collapsible: true }],
    ['data-multiple', { multiple: true }],
  ] as const)('carries the headless %s stamp', (attribute, props) => {
    const stamped = renderAccordionTree(props);

    expect(stamped.getByTestId('root').getAttribute(attribute)).toBe('');
    stamped.unmount();

    expect(renderAccordionTree().getByTestId('root').hasAttribute(attribute)).toBe(false);
  });

  it('opens the items named by defaultOpenItems on mount', () => {
    const tree = renderAccordionTree({ defaultOpenItems: 'b' });

    expect(tree.isOpen('a')).toBe(false);
    expect(tree.isOpen('b')).toBe(true);
  });

  it('opens one item at a time by default', () => {
    const tree = renderAccordionTree();

    tree.toggle('a');
    tree.toggle('b');

    expect(tree.isOpen('a')).toBe(false);
    expect(tree.isOpen('b')).toBe(true);
  });

  it('opens several items with multiple', () => {
    const tree = renderAccordionTree({ multiple: true });

    tree.toggle('a');
    tree.toggle('b');

    expect(tree.isOpen('a')).toBe(true);
    expect(tree.isOpen('b')).toBe(true);
  });

  it('closes the last open item with collapsible', () => {
    const tree = renderAccordionTree({ collapsible: true, defaultOpenItems: 'a' });

    tree.toggle('a');

    expect(tree.isOpen('a')).toBe(false);
  });

  it('honours a controlled openItems and does not self-toggle', () => {
    const onToggle = jest.fn();
    const tree = renderAccordionTree({ openItems: 'a', onToggle });

    expect(tree.isOpen('a')).toBe(true);

    tree.toggle('b');

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(tree.isOpen('b')).toBe(false);
    expect(tree.isOpen('a')).toBe(true);
  });

  it('builds its context values from the styled state', () => {
    renderAccordionTree();

    expect(mockContextValuesStates[mockContextValuesStates.length - 1].root!.className).toContain('fui-accordion');
  });

  it('passes consumer props and the ref through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Accordion ref={ref} data-testid="root" id="acc" aria-label="Sections" className="consumer" style={{ zIndex: 6 }}>
        {item('a')}
      </Accordion>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('acc');
    expect(root.getAttribute('aria-label')).toBe('Sections');
    expect(root).toHaveClass('consumer');
    expect(root.style.zIndex).toBe('6');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
    } as unknown as AccordionState;

    const styled = useAccordionStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});
