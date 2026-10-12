import * as React from 'react';
import { Legends } from './index';
import { render, act, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Wrapper of the Legends to be tested.
const legends = [
  {
    title: 'Legend 1',
    color: '#FF0000',
  },
  {
    title: 'Legend 2',
    color: '#000000',
  },
  {
    title: 'Legend 3',
    color: '#008000',
  },
  {
    title: 'Legend 4',
    color: '#0000ff',
  },
  {
    title: 'Legend 5',
    color: '#191970',
  },
  {
    title: 'Legend 6',
    color: '#E4E3E9',
  },
  {
    title: 'Legend 7',
    color: '#013220',
  },
  {
    title: 'Legend 8',
    color: '#00008B',
  },
  {
    title: 'Legend 9',
    color: '#FFA500',
  },
  {
    title: 'Legend 10',
    color: '#301934',
  },
  {
    title: 'Legend 11',
    color: '#Ffffed',
  },
  {
    title: 'Legend 12',
    color: '#90ee90',
  },
  {
    title: 'Legend 13',
    color: '#FFA500',
  },
  {
    title: 'Legend 14',
    color: '#008080',
  },
  {
    title: 'Legend 15',
    color: '#008080',
  },
  {
    title: 'Legend 16',
    color: 'FF0000',
  },
  {
    title: 'Legend 17',
    color: '#FFFFFF',
  },
];

const styles = {
  rect: {
    borderRadius: '3px',
  },
};

const overflowProps = {
  styles: {
    item: { border: `1px dotted #008000` },
    root: {},
    overflowButton: { backgroundColor: '#Ffe536' },
  },
};

const focusZonePropsInHoverCard = {
  'aria-label': 'Legend 1 selected',
};

describe('Legends snapShot testing', () => {
  it('renders Legends correctly', () => {
    const { container } = render(<Legends legends={legends} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders allowFocusOnLegends correctly', () => {
    const { container } = render(<Legends legends={legends} allowFocusOnLegends={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders canSelectMultipleLegends correctly', () => {
    const { container } = render(<Legends legends={legends} canSelectMultipleLegends={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders styles correctly', () => {
    const { container } = render(<Legends legends={legends} {...styles} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Legends - basic props', () => {
  it('Should not mount legends when empty', () => {
    const wrapper = render(<Legends legends={[]} />);
    const legend = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(legend!.length).toBe(0);
  });

  it('Should mount legends when not empty', () => {
    const wrapper = render(<Legends legends={legends} />);
    const legend = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(legend).toBeDefined();
  });

  it('Should mount Overflow Button when not empty', () => {
    const wrapper = render(<Legends legends={legends} /* {...overflowProps} */ overflowText={'OverFlow Items'} />);
    const overflowBtnText = wrapper.container.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtnText).toBeDefined();
  });

  it('Should not mount Overflow when empty', () => {
    const wrapper = render(<Legends legends={legends} />);
    const overflowBtn = wrapper.container.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtn!.length).toBe(0);
  });

  it('Should be not able to select multiple Legends', () => {
    const wrapper = render(<Legends legends={legends} canSelectMultipleLegends={false} />);
    const canSelectMultipleLegends = wrapper.container
      .querySelector('[class^="legend"]')
      ?.getAttribute('canSelectMultipleLegends');
    expect(canSelectMultipleLegends).toBeFalsy();
  });

  it('Should render data-is-focusable correctly', () => {
    const wrapper = render(<Legends legends={legends} data-is-focusable={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Render calling with respective to props', () => {
  //To Do - This tc will be need to revisit because the logic is not correct.
  it('No prop changes', () => {
    const props = {
      legends,
    };

    const { rerender, container } = render(<Legends {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<Legends {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });
  it.skip('prop changes', () => {
    const props = {
      legends,
      allowFocusOnLegends: true,
      focusZonePropsInHoverCard,
      overflowProps,
      overflowText: 'OverFlow Items',
    };
    const { rerender, container } = render(<Legends {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<Legends {...props} allowFocusOnLegends={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe.skip('Legends - multi Legends', () => {
  it('Should render defaultSelectedLegends', () => {
    const { container } = render(
      <Legends
        legends={legends}
        canSelectMultipleLegends={true}
        defaultSelectedLegends={[legends[0].title, legends[2].title]}
      />,
    );
    const renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(2);
  });
});

describe.skip('Legends - controlled legend selection', () => {
  it('follows updates in the selectedLegends prop', () => {
    const { rerender, container } = render(
      <Legends legends={legends} canSelectMultipleLegends={true} selectedLegends={[legends[0].title]} />,
    );
    let renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(1);

    rerender(
      <Legends
        legends={legends}
        canSelectMultipleLegends={true}
        selectedLegends={[legends[1].title, legends[2].title]}
      />,
    );
    renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(2);
  });

  it('follows updates in the selectedLegend prop', () => {
    const { rerender, container } = render(<Legends legends={legends} selectedLegend={legends[0].title} />);
    let renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(1);

    rerender(<Legends legends={legends} selectedLegend={legends[1].title} />);
    renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(1);
  });
});

describe('Legends - dynamic overflow', () => {
  const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
  let originalWindowResizeObserver: typeof window.ResizeObserver;
  let originalGlobalResizeObserver: typeof global.ResizeObserver;
  let capturedObservers: { callback: ResizeObserverCallback; element: HTMLElement }[] = [];

  beforeEach(() => {
    capturedObservers = [];
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 250 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get(this: HTMLElement) {
        return this.isConnected ? 50 : 0;
      },
    });

    originalWindowResizeObserver = window.ResizeObserver;
    originalGlobalResizeObserver = global.ResizeObserver;

    class MockResizeObserver implements ResizeObserver {
      private _callback: ResizeObserverCallback;
      private _element?: HTMLElement;

      constructor(callback: ResizeObserverCallback) {
        this._callback = callback;
      }

      public observe(element: Element) {
        this._element = element as HTMLElement;
        capturedObservers.push({ callback: this._callback, element: element as HTMLElement });
      }

      public unobserve() {
        capturedObservers = capturedObservers.filter(entry => entry.element !== this._element);
      }

      public disconnect() {
        capturedObservers = capturedObservers.filter(entry => entry.element !== this._element);
      }
    }

    window.ResizeObserver = MockResizeObserver;
    global.ResizeObserver = MockResizeObserver;
  });

  afterEach(() => {
    window.ResizeObserver = originalWindowResizeObserver;
    global.ResizeObserver = originalGlobalResizeObserver;

    if (originalClientWidth) {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'clientWidth');
    }
    if (originalOffsetWidth) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'offsetWidth');
    }
  });

  it('does not throw when legends shrink while overflow is being reconciled', () => {
    const result = render(<Legends legends={legends} overflowText="Overflow Items" />);

    expect(result.getByText('+14 Overflow Items')).toBeTruthy();
    result.rerender(<Legends legends={legends.slice(0, 3)} overflowText="Overflow Items" />);

    expect(result.queryByText(/Overflow Items/)).toBeNull();
    expect(result.container.querySelectorAll('button[role="option"]:not([data-overflowing])').length).toBe(3);
  });

  it('maintains trigger element identity and updates count when item count changes while still overflowing', () => {
    const result = render(<Legends legends={legends} overflowText="Overflow Items" />);

    expect(result.getByText('+14 Overflow Items')).toBeTruthy();
    const initialTrigger = result.container.querySelector('[data-overflow-menu]');
    expect(initialTrigger).not.toBeNull();
    expect(initialTrigger?.isConnected).toBe(true);

    result.rerender(<Legends legends={legends.slice(0, 10)} overflowText="Overflow Items" />);

    expect(result.getByText('+7 Overflow Items')).toBeTruthy();
    const updatedTrigger = result.container.querySelector('[data-overflow-menu]');
    expect(updatedTrigger).toBe(initialTrigger);
    expect(updatedTrigger?.isConnected).toBe(true);
    expect(result.container.querySelectorAll('button[role="option"]:not([data-overflowing])').length).toBe(3);
  });

  it('renders exact remaining items in menu popover without removed legends and preserves aria metadata', () => {
    const result = render(
      <Legends legends={legends} overflowText="Overflow Items" selectedLegend={legends[4].title} />,
    );

    expect(result.getByRole('button', { name: '+14 Overflow Items' })).toHaveAttribute('data-overflow-menu');
    result.rerender(
      <Legends legends={legends.slice(0, 10)} overflowText="Overflow Items" selectedLegend={legends[4].title} />,
    );

    const triggerButton = result.getByText('+7 Overflow Items');
    fireEvent.click(triggerButton);

    const menu = document.querySelector('div[role="menu"]');
    expect(menu).not.toBeNull();

    const checkboxItems = document.querySelectorAll('div[role="menuitemcheckbox"]');
    expect(checkboxItems.length).toBe(7);

    checkboxItems.forEach((item, itemIndex) => {
      expect(item.getAttribute('aria-setsize')).toBe('10');
      expect(item.getAttribute('aria-posinset')).toBe(String(itemIndex + 4));
      expect(item.querySelector(`[data-title="Legend ${itemIndex + 4}"]`)).not.toBeNull();
    });

    for (let index = 11; index <= 17; index++) {
      expect(document.querySelector(`div[role="menuitemcheckbox"] [data-title="Legend ${index}"]`)).toBeNull();
    }

    const selectedItem = document.querySelector('div[role="menuitemcheckbox"][aria-posinset="5"]');
    expect(selectedItem?.getAttribute('aria-checked')).toBe('true');
  });

  it('adapts visible and overflow counts on resize after legends shrink while still overflowing', () => {
    let currentContainerWidth = 250;
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return currentContainerWidth;
      },
    });

    const result = render(<Legends legends={legends} overflowText="Overflow Items" />);

    expect(result.getByText('+14 Overflow Items')).toBeTruthy();
    const trigger = result.container.querySelector('[data-overflow-menu]');
    expect(trigger).not.toBeNull();

    result.rerender(<Legends legends={legends.slice(0, 10)} overflowText="Overflow Items" />);
    expect(result.getByRole('button', { name: '+7 Overflow Items' })).toBe(trigger);

    expect(capturedObservers.length).toBeGreaterThan(0);
    const activeObserver = capturedObservers[0];

    act(() => {
      currentContainerWidth = 200;
      activeObserver.callback(
        [{ target: activeObserver.element } as unknown as ResizeObserverEntry],
        activeObserver as unknown as ResizeObserver,
      );
    });

    expect(result.getByRole('button', { name: '+8 Overflow Items' })).toBe(trigger);
    expect(result.container.querySelectorAll('button[role="option"]:not([data-overflowing])').length).toBe(2);
    expect(result.container.querySelector('[data-overflow-menu]')).toBe(trigger);

    act(() => {
      currentContainerWidth = 300;
      activeObserver.callback(
        [{ target: activeObserver.element } as unknown as ResizeObserverEntry],
        activeObserver as unknown as ResizeObserver,
      );
    });

    expect(result.getByRole('button', { name: '+6 Overflow Items' })).toBe(trigger);
    expect(result.container.querySelectorAll('button[role="option"]:not([data-overflowing])').length).toBe(4);
    expect(result.container.querySelector('[data-overflow-menu]')).toBe(trigger);
  });

  it('recovers cleanly when shrinking to 0 items and restoring to full list', () => {
    const result = render(<Legends legends={legends} overflowText="Overflow Items" />);

    expect(result.getByText('+14 Overflow Items')).toBeTruthy();

    result.rerender(<Legends legends={[]} overflowText="Overflow Items" />);
    expect(result.queryByText(/Overflow Items/)).toBeNull();
    expect(result.container.querySelectorAll('button[role="option"]').length).toBe(0);

    result.rerender(<Legends legends={legends} overflowText="Overflow Items" />);
    expect(result.getByText('+14 Overflow Items')).toBeTruthy();
    expect(result.container.querySelectorAll('button[role="option"]:not([data-overflowing])').length).toBe(3);
  });
});

describe('Legends - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<Legends legends={legends} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
