import * as React from 'react';
import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mergeClasses } from '@griffel/react';

import {
  useAccordion_unstable,
  useAccordionBase_unstable,
  renderAccordion_unstable,
  useAccordionContextValues_unstable,
} from './index';
import { useAccordionContext_unstable } from '../../contexts/accordion';
import type { AccordionBaseProps, AccordionState } from './Accordion.types';
import {
  useAccordionItem_unstable,
  useAccordionItemContextValues_unstable,
  renderAccordionItem_unstable,
} from '../AccordionItem';
import type { AccordionItemProps, AccordionItemState } from '../AccordionItem';
import {
  useAccordionHeaderBase_unstable,
  useAccordionHeaderContextValues_unstable,
  renderAccordionHeader_unstable,
} from '../AccordionHeader';
import type { AccordionHeaderProps, AccordionHeaderState } from '../AccordionHeader';
import { useAccordionPanelBase_unstable, renderAccordionPanel_unstable } from '../AccordionPanel';
import type { AccordionPanelBaseProps, AccordionPanelState } from '../AccordionPanel';

describe('useAccordion_unstable', () => {
  it('handle toggle behavior', () => {
    const { result } = renderHook(() => useAccordion_unstable({ defaultOpenItems: [0, 1, 2] }, React.createRef()));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(0)).toBeTruthy();

    act(() => result.current.requestToggle({ value: 1, event: undefined! }));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(1)).toBeTruthy();
  });

  describe('multiple', () => {
    it('should only have zero open items before having any items', () => {
      const { result } = renderHook(() => useAccordion_unstable({ multiple: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle({ value: 0, event: undefined! }));
      expect(result.current.openItems.length).toEqual(1);
      act(() => result.current.requestToggle({ value: 0, event: undefined! }));
      expect(result.current.openItems.length).toEqual(1);
    });
    it('should not have less than 1 open item', () => {
      const { result } = renderHook(() =>
        useAccordion_unstable({ multiple: true, defaultOpenItems: [0] }, React.createRef()),
      );

      expect(result.current.openItems.length).toEqual(1);

      act(() => result.current.requestToggle({ value: 0, event: undefined! }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
    });
    it('should open multiple panels', () => {
      const { result } = renderHook(() => useAccordion_unstable({ multiple: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle({ value: 0, event: undefined! }));
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle({ value: 1, event: undefined! }));
      expect(result.current.openItems.includes(1)).toBeTruthy();
      expect(result.current.openItems.length).toEqual(2);
    });
  });
  describe('collapsible', () => {
    it('should have zero panels opened', () => {
      const { result } = renderHook(() => useAccordion_unstable({ collapsible: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle({ value: 0, event: undefined! }));
      expect(result.current.openItems.length).toEqual(1);
      act(() => result.current.requestToggle({ value: 0, event: undefined! }));
      expect(result.current.openItems.length).toEqual(0);
    });
    it('should not open more than one panel', () => {
      const { result } = renderHook(() => useAccordion_unstable({ collapsible: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle({ value: 0, event: undefined! }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle({ value: 1, event: undefined! }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(1)).toBeTruthy();
      expect(result.current.openItems.includes(0)).toBeFalsy();
    });
  });
});

describe('useAccordionBase', () => {
  type CustomAccordionAppearance = 'filled' | 'outline';

  type CustomAccordionContextValue = {
    appearance: CustomAccordionAppearance;
  };

  type CustomAccordionProps = AccordionBaseProps & CustomAccordionContextValue;

  type CustomAccordionItemProps = AccordionItemProps;

  type CustomAccordionHeaderProps = AccordionHeaderProps;

  type CustomAccordionPanelProps = AccordionPanelBaseProps;

  const CustomAccordion = React.forwardRef<HTMLDivElement, CustomAccordionProps>(
    ({ appearance = 'filled', ...props }, ref) => {
      const state = useAccordionBase_unstable(props, ref);
      const contextValues = useAccordionContextValues_unstable(state as AccordionState);

      // Extend context to include appearance
      Object.assign(contextValues.accordion, { appearance });

      state.root.className = mergeClasses('accordion', `accordion--${appearance}`, state.root.className);

      return renderAccordion_unstable(state as AccordionState, contextValues);
    },
  );

  const CustomAccordionItem = React.forwardRef<HTMLDivElement, CustomAccordionItemProps>((props, ref) => {
    const state = useAccordionItem_unstable(props, ref);
    const appearance = useAccordionContext_unstable((ctx: unknown) => (ctx as CustomAccordionContextValue).appearance);

    state.root.className = mergeClasses('accordion-item', `accordion-item--${appearance}`, state.root.className);

    const contextValues = useAccordionItemContextValues_unstable(state);
    return renderAccordionItem_unstable(state as AccordionItemState, contextValues);
  });

  const CustomAccordionHeader = React.forwardRef<HTMLDivElement, CustomAccordionHeaderProps>((props, ref) => {
    const state = useAccordionHeaderBase_unstable(props, ref);
    const appearance = useAccordionContext_unstable((ctx: unknown) => (ctx as CustomAccordionContextValue).appearance);

    state.root.className = mergeClasses(
      'accordion-header',
      `accordion-header--${appearance}`,
      state.open && 'accordion-header-open',
      state.root.className,
    );

    const contextValues = useAccordionHeaderContextValues_unstable(state);
    return renderAccordionHeader_unstable(state as AccordionHeaderState, contextValues);
  });

  const CustomAccordionPanel = React.forwardRef<HTMLDivElement, CustomAccordionPanelProps>((props, ref) => {
    const state = useAccordionPanelBase_unstable(props, ref);
    const appearance = useAccordionContext_unstable((ctx: unknown) => (ctx as CustomAccordionContextValue).appearance);

    state.root.className = mergeClasses('accordion-panel', `accordion-panel--${appearance}`, state.root.className);

    // Don't render if not open (simulating unmountOnExit behavior)
    if (!state.open) {
      return null;
    }

    return renderAccordionPanel_unstable(state as AccordionPanelState);
  });

  it('renders accordion items', () => {
    const result = render(
      <CustomAccordion appearance="outline" defaultOpenItems={['1']}>
        <CustomAccordionItem value="1">
          <CustomAccordionHeader>First</CustomAccordionHeader>
          <CustomAccordionPanel>First panel content</CustomAccordionPanel>
        </CustomAccordionItem>
        <CustomAccordionItem value="2">
          <CustomAccordionHeader>Second</CustomAccordionHeader>
          <CustomAccordionPanel>Second panel content</CustomAccordionPanel>
        </CustomAccordionItem>
      </CustomAccordion>,
    );

    const accordion = result.container.querySelector('.accordion');
    expect(accordion).toMatchInlineSnapshot(`
      <div
        class="accordion accordion--outline"
      >
        <div
          class="accordion-item accordion-item--outline"
        >
          <div
            class="accordion-header accordion-header--outline accordion-header-open"
          >
            <button
              aria-disabled="true"
              aria-expanded="true"
              type="button"
            >
              <span
                aria-hidden="true"
              />
              First
            </button>
          </div>
          <div
            class="accordion-panel accordion-panel--outline"
          >
            First panel content
          </div>
        </div>
        <div
          class="accordion-item accordion-item--outline"
        >
          <div
            class="accordion-header accordion-header--outline"
          >
            <button
              aria-expanded="false"
              type="button"
            >
              <span
                aria-hidden="true"
              />
              Second
            </button>
          </div>
        </div>
      </div>
    `);

    // Click the `Second` accordion header to open it
    userEvent.click(result.getByText('Second'));

    // Ensure the `Second` panel is now visible
    expect(result.getByText('Second panel content')).toBeInTheDocument();
    // Ensure the `First` panel is now closed (not in document) since multiple is false by default
    expect(result.queryByText('First panel content')).not.toBeInTheDocument();
  });

  it('supports multiple open items', () => {
    const result = render(
      <CustomAccordion appearance="filled" multiple defaultOpenItems={['1']}>
        <CustomAccordionItem value="1">
          <CustomAccordionHeader>First</CustomAccordionHeader>
          <CustomAccordionPanel>First panel content</CustomAccordionPanel>
        </CustomAccordionItem>
        <CustomAccordionItem value="2">
          <CustomAccordionHeader>Second</CustomAccordionHeader>
          <CustomAccordionPanel>Second panel content</CustomAccordionPanel>
        </CustomAccordionItem>
      </CustomAccordion>,
    );

    // First panel should be open
    expect(result.getByText('First panel content')).toBeInTheDocument();

    // Click the `Second` accordion header to open it
    userEvent.click(result.getByText('Second'));

    // Both panels should now be visible
    expect(result.getByText('First panel content')).toBeInTheDocument();
    expect(result.getByText('Second panel content')).toBeInTheDocument();
  });

  it('supports collapsible mode', () => {
    const result = render(
      <CustomAccordion appearance="outline" collapsible defaultOpenItems={['1']}>
        <CustomAccordionItem value="1">
          <CustomAccordionHeader>First</CustomAccordionHeader>
          <CustomAccordionPanel>First panel content</CustomAccordionPanel>
        </CustomAccordionItem>
      </CustomAccordion>,
    );

    // Panel should be open initially
    expect(result.getByText('First panel content')).toBeInTheDocument();

    // Click to collapse
    userEvent.click(result.getByText('First'));

    // Panel should now be closed
    expect(result.queryByText('First panel content')).not.toBeInTheDocument();
  });

  it('calls onToggle callback', () => {
    const onToggle = jest.fn();
    const result = render(
      <CustomAccordion appearance="outline" onToggle={onToggle}>
        <CustomAccordionItem value="1">
          <CustomAccordionHeader>First</CustomAccordionHeader>
          <CustomAccordionPanel>First panel content</CustomAccordionPanel>
        </CustomAccordionItem>
      </CustomAccordion>,
    );

    userEvent.click(result.getByText('First'));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        value: '1',
        openItems: ['1'],
      }),
    );
  });
});
