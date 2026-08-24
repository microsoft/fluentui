import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Accordion } from '../Accordion/Accordion';
import { AccordionHeader } from '../AccordionHeader/AccordionHeader';
import { AccordionItem } from '../AccordionItem/AccordionItem';
import { AccordionPanel } from './AccordionPanel';
import type { AccordionPanelState } from './AccordionPanel.types';
import { accordionPanelClassNames, useAccordionPanelStyles } from './useAccordionPanelStyles';

import styles from './AccordionPanel.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/accordion', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/accordion');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAccordionPanel: (...args: Parameters<typeof actual.useAccordionPanel>) =>
      deepFreezeState(actual.useAccordionPanel(...args)),
  };
});

const renderItem = (open: boolean) =>
  render(
    <Accordion {...(open ? { defaultOpenItems: 'a' } : {})}>
      <AccordionItem value="a">
        <AccordionHeader data-testid="header">Section</AccordionHeader>
        <AccordionPanel data-testid="panel">
          <input data-testid="field" defaultValue="" />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );

describe('AccordionPanel', () => {
  isConformant({
    Component: AccordionPanel,
    displayName: 'AccordionPanel',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { container } = render(<AccordionPanel>Body</AccordionPanel>);
    const root = container.firstElementChild as HTMLElement;

    expect(root).toHaveClass('fui-accordion-panel');
    expect(root).toHaveClass('group/fui-accordion-panel');
    expect(root.classList[0]).toBe('fui-accordion-panel');
    expect(accordionPanelClassNames.root).toBe('fui-accordion-panel group/fui-accordion-panel');
  });

  it('renders the root in both states and carries its class in both', () => {
    // Griffel unmounts a closed panel; the headless panel stays mounted, so the closed look is a
    // stylesheet rule on this class. Both halves of that must hold.
    for (const open of [false, true]) {
      const { getByTestId, unmount } = renderItem(open);

      expect(getByTestId('panel')).toHaveClass(styles.root);
      unmount();
    }
  });

  it('carries data-open only when the item is open', () => {
    const closed = renderItem(false);

    expect(closed.getByTestId('panel').hasAttribute('data-open')).toBe(false);
    closed.unmount();

    expect(renderItem(true).getByTestId('panel').getAttribute('data-open')).toBe('');
  });

  it('keeps the closed panel inert rather than unmounted', () => {
    const panel = renderItem(false).getByTestId('panel');

    expect(panel.getAttribute('tabindex')).toBe('-1');
    expect(panel.hasAttribute('inert')).toBe(true);
  });

  it('keeps panel content mounted across a close and reopen', () => {
    // The mount contract Griffel's collapse motion carried is gone with the motion: state inside a
    // closed panel survives here where Griffel would have destroyed it.
    const { getByTestId } = renderItem(true);

    fireEvent.change(getByTestId('field'), { target: { value: 'typed' } });
    fireEvent.click(getByTestId('header').querySelector('button')!);
    fireEvent.click(getByTestId('header').querySelector('button')!);

    expect((getByTestId('field') as HTMLInputElement).value).toBe('typed');
  });

  it('passes consumer props and the ref through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <AccordionPanel ref={ref} data-testid="panel" id="pnl" className="consumer" style={{ zIndex: 4 }}>
        Body
      </AccordionPanel>,
    );

    const root = getByTestId('panel');

    expect(root.id).toBe('pnl');
    expect(root).toHaveClass('consumer');
    expect(root.style.zIndex).toBe('4');
    expect(root.textContent).toBe('Body');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
    } as unknown as AccordionPanelState;

    const styled = useAccordionPanelStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});
