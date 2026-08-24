import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Accordion } from '../Accordion/Accordion';
import { AccordionItem } from '../AccordionItem/AccordionItem';
import { AccordionHeader } from './AccordionHeader';
import type { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';
import { accordionHeaderClassNames, useAccordionHeaderStyles } from './useAccordionHeaderStyles';

import styles from './AccordionHeader.module.css';

// Every state the component hands to the headless context-values helper, in call order.
const mockContextValuesStates: { size?: string; inline?: boolean }[] = [];

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/accordion', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/accordion');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAccordionHeader: (...args: Parameters<typeof actual.useAccordionHeader>) =>
      deepFreezeState(actual.useAccordionHeader(...args)),
    useAccordionHeaderContextValues: (state: { size?: string; inline?: boolean }) => {
      mockContextValuesStates.push(state);

      return actual.useAccordionHeaderContextValues(state);
    },
  };
});

const sizes = ['small', 'medium', 'large', 'extra-large'] as const;

// Read structurally, never by class query: a dropped module class must be able to fail a test
// rather than hide the element it was dropped from.
const parts = (root: HTMLElement) => {
  const button = root.querySelector('button')!;

  return {
    root,
    button,
    expandIcon: button.querySelector('span'),
    icon: button.querySelector('div'),
  };
};

const renderHeader = (props: AccordionHeaderProps = {}) => {
  const { container } = render(<AccordionHeader {...props}>Section</AccordionHeader>);

  return parts(container.firstElementChild as HTMLElement);
};

describe('AccordionHeader', () => {
  beforeEach(() => {
    mockContextValuesStates.length = 0;
  });

  isConformant({
    Component: AccordionHeader,
    displayName: 'AccordionHeader',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { root } = renderHeader();

    expect(root).toHaveClass('fui-accordion-header');
    expect(root).toHaveClass('group/fui-accordion-header');
    expect(root.classList[0]).toBe('fui-accordion-header');
    expect(accordionHeaderClassNames.root).toBe('fui-accordion-header group/fui-accordion-header');
  });

  it('decorates the root, button and expandIcon slots with their own classes', () => {
    const { root, button, expandIcon } = renderHeader();

    expect(root).toHaveClass(styles.root);
    expect(button).toHaveClass(styles.button);
    expect(expandIcon).toHaveClass(styles.expandIcon);
  });

  it('decorates the icon slot when one is supplied', () => {
    const { icon } = renderHeader({ icon: <i data-testid="glyph" /> });

    expect(icon).toHaveClass(styles.icon);
  });

  it.each(sizes)('stamps data-size=%s', size => {
    expect(renderHeader({ size }).root.getAttribute('data-size')).toBe(size);
  });

  it('defaults data-size to medium', () => {
    expect(renderHeader().root.getAttribute('data-size')).toBe('medium');
  });

  it('stamps data-inline only when inline', () => {
    expect(renderHeader({ inline: true }).root.getAttribute('data-inline')).toBe('');
    expect(renderHeader().root.hasAttribute('data-inline')).toBe(false);
  });

  it('stamps data-icon only when an icon slot resolved', () => {
    expect(renderHeader({ icon: <i /> }).root.getAttribute('data-icon')).toBe('');
    expect(renderHeader().root.hasAttribute('data-icon')).toBe(false);
    expect(renderHeader({ icon: null }).root.hasAttribute('data-icon')).toBe(false);
  });

  it('feeds the look props to the header context through the styled state', () => {
    renderHeader({ size: 'large', inline: true });

    // The headless state omits both, so children would read `undefined` if the unstyled state
    // reached the helper instead.
    expect(mockContextValuesStates[mockContextValuesStates.length - 1]).toMatchObject({
      size: 'large',
      inline: true,
    });
  });

  it('defaults the size it publishes to the header context', () => {
    renderHeader();

    expect(mockContextValuesStates[mockContextValuesStates.length - 1]).toMatchObject({ size: 'medium' });
  });

  it('restores one chevron glyph, carrying no inline rotation of its own', () => {
    const { expandIcon } = renderHeader();
    const glyphs = expandIcon!.querySelectorAll('svg');

    expect(glyphs).toHaveLength(1);
    // The rotation is a stylesheet rule keyed off the root, not an inline transform.
    expect(glyphs[0].hasAttribute('style')).toBe(false);
  });

  it('restores the glyph as the only element child of the slot', () => {
    // The rotation rule targets direct children only, so a second element child would rotate too.
    expect(renderHeader().expandIcon!.children).toHaveLength(1);
  });

  it('keeps a consumer expandIcon child instead of the chevron', () => {
    const { expandIcon } = renderHeader({ expandIcon: { children: <b data-testid="mine" /> } });

    expect(expandIcon!.querySelectorAll('svg')).toHaveLength(0);
    expect(expandIcon!.querySelector('b')).not.toBeNull();
  });

  it('renders no expandIcon slot when it is suppressed', () => {
    expect(renderHeader({ expandIcon: null }).expandIcon).toBeNull();
  });

  it('carries the headless stamps the styles hook must not rebuild', () => {
    expect(renderHeader().root.getAttribute('data-expand-icon-position')).toBe('start');
    expect(renderHeader({ expandIconPosition: 'end' }).root.getAttribute('data-expand-icon-position')).toBe('end');
  });

  it('takes open and disabled from the item context', () => {
    const { getByTestId } = render(
      <Accordion defaultOpenItems="a">
        <AccordionItem value="a">
          <AccordionHeader data-testid="open">Open</AccordionHeader>
        </AccordionItem>
        <AccordionItem value="b" disabled>
          <AccordionHeader data-testid="disabled">Disabled</AccordionHeader>
        </AccordionItem>
      </Accordion>,
    );

    expect(getByTestId('open').getAttribute('data-open')).toBe('');
    expect(getByTestId('disabled').getAttribute('data-disabled')).toBe('');
    expect(getByTestId('disabled').querySelector('button')!.disabled).toBe(true);
  });

  it('keeps consumer class names on every slot', () => {
    const { root, button, expandIcon, icon } = renderHeader({
      className: 'consumer-root',
      button: { className: 'consumer-button' },
      expandIcon: { className: 'consumer-expand' },
      icon: { className: 'consumer-icon', children: <i /> },
    });

    expect(root).toHaveClass('consumer-root');
    expect(button).toHaveClass('consumer-button');
    expect(expandIcon).toHaveClass('consumer-expand');
    expect(icon).toHaveClass('consumer-icon');
  });

  it('passes consumer props and the ref through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <AccordionHeader ref={ref} as="h3" data-testid="root" id="hdr" aria-label="Section" style={{ zIndex: 3 }}>
        Section
      </AccordionHeader>,
    );

    const root = getByTestId('root');

    expect(root.tagName).toBe('H3');
    expect(root.id).toBe('hdr');
    expect(root.getAttribute('aria-label')).toBe('Section');
    expect(root.style.zIndex).toBe('3');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div', button: 'button', expandIcon: 'span', icon: 'div' },
      root: { as: 'div', className: 'consumer' },
      button: { as: 'button', className: 'consumer-button' },
      expandIcon: { as: 'span', className: 'consumer-expand' },
      icon: { as: 'div', className: 'consumer-icon' },
      inline: false,
      size: 'medium',
    } as unknown as AccordionHeaderState;

    const styled = useAccordionHeaderStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.button).not.toBe(state.button);
    expect(styled.expandIcon).not.toBe(state.expandIcon);
    expect(styled.icon).not.toBe(state.icon);
    expect(state.root.className).toBe('consumer');
    expect(state.button.className).toBe('consumer-button');
  });
});
