import * as React from 'react';
import { act, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TabList } from '../TabList/TabList';
import { Tab } from './Tab';
import type { TabState } from './Tab.types';
import { useTabAnimatedIndicator } from './useTabAnimatedIndicator';
import { tabClassNames, useTabStyles } from './useTabStyles';

import styles from './Tab.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/tab-list', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tab-list');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTab: (...args: Parameters<typeof actual.useTab>) => deepFreezeState(actual.useTab(...args)),
  };
});

const Icon = () => <svg data-testid="glyph" />;

const tabRoots = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLElement>('.fui-tab'));

/** The reserved-space span is the sibling of the content span carrying its own hashed class. */
const reservedSpaceOf = (tab: HTMLElement) =>
  Array.from(tab.children).find(child => child.classList.contains(styles.contentReservedSpace)) ?? null;

const contentOf = (tab: HTMLElement) =>
  Array.from(tab.children).find(child => child.classList.contains(styles.content)) ?? null;

describe('Tab', () => {
  isConformant({
    Component: Tab,
    displayName: 'Tab',
    requiredProps: { value: 'a' },
  });

  it('stamps the marker pair', () => {
    const { getByTestId } = render(<Tab data-testid="tab" value="a" />);

    const tab = getByTestId('tab');

    expect(tab).toHaveClass('fui-tab');
    expect(tab).toHaveClass('group/fui-tab');
    expect(tab.classList[0]).toBe('fui-tab');
    expect(tab).toHaveClass(styles.root);
    // fui-tab is a prefix of fui-tab-list, so the negative control is a class token test.
    expect(tab.classList.contains('fui-tab-list')).toBe(false);
  });

  it('stamps the orientation the list resolves', () => {
    const { container: horizontal } = render(<TabList>{<Tab value="a">Tab A</Tab>}</TabList>);
    const { container: vertical } = render(<TabList vertical>{<Tab value="a">Tab A</Tab>}</TabList>);

    expect(tabRoots(horizontal)[0].getAttribute('data-orientation')).toBe('horizontal');
    expect(tabRoots(vertical)[0].getAttribute('data-orientation')).toBe('vertical');
  });

  it('stamps data-icon only when an icon is supplied', () => {
    const { getByTestId } = render(
      <>
        <Tab data-testid="plain" value="a">
          Tab A
        </Tab>
        <Tab data-testid="withIcon" value="b" icon={<Icon />}>
          Tab B
        </Tab>
      </>,
    );

    expect(getByTestId('plain').hasAttribute('data-icon')).toBe(false);
    expect(getByTestId('withIcon').getAttribute('data-icon')).toBe('true');
  });

  it('decorates every slot with its own hashed class', () => {
    const { getByTestId } = render(
      <Tab data-testid="tab" value="a" icon={<Icon />}>
        Tab A
      </Tab>,
    );

    const tab = getByTestId('tab');
    const icon = tab.querySelector<HTMLElement>('span');

    expect(icon).toHaveClass(styles.icon);
    expect(contentOf(tab)).not.toBeNull();
    expect(reservedSpaceOf(tab)).not.toBeNull();
    // fuicm-content is a prefix of fuicm-content-reserved-space under the jest ident generator,
    // so these must be class-token assertions on distinct elements, never substring checks.
    expect(contentOf(tab)).not.toBe(reservedSpaceOf(tab));
    expect(contentOf(tab)!.classList.contains(styles.contentReservedSpace)).toBe(false);
    expect(reservedSpaceOf(tab)!.classList.contains(styles.content)).toBe(false);
  });

  describe('reserved space', () => {
    it('renders a hidden copy of the label on an unselected tab by default', () => {
      const { container } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      const [, unselected] = tabRoots(container);
      const reserved = reservedSpaceOf(unselected);

      expect(reserved).not.toBeNull();
      expect(reserved!.textContent).toBe('Tab B');
      expect(reserved!.textContent).toBe(contentOf(unselected)!.textContent);
    });

    it('is absent on the selected tab', () => {
      const { container } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      expect(reservedSpaceOf(tabRoots(container)[0])).toBeNull();
    });

    it('is absent on an icon-only tab', () => {
      const { container } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b" icon={<Icon />} />
        </TabList>,
      );

      const iconOnly = tabRoots(container)[1];

      expect(iconOnly.hasAttribute('data-icon-only')).toBe(true);
      expect(reservedSpaceOf(iconOnly)).toBeNull();
    });

    it('is absent when the list turns it off', () => {
      const { container } = render(
        <TabList selectedValue="a" reserveSelectedTabSpace={false}>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      expect(reservedSpaceOf(tabRoots(container)[1])).toBeNull();
    });

    it('is a real slot, so an object content renders without an assertSlots warning', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      const { container } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b" content={{ id: 'content-b', children: 'Tab B' }} />
        </TabList>,
      );

      const unselected = tabRoots(container)[1];

      expect(contentOf(unselected)!.id).toBe('content-b');
      expect(reservedSpaceOf(unselected)!.textContent).toBe('Tab B');
      expect(warn).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();

      warn.mockRestore();
      error.mockRestore();
    });

    it('keeps a consumer content ref off the reserved copy', () => {
      const ref = React.createRef<HTMLSpanElement>();

      const { container } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b" content={{ ref, children: 'Tab B' }} />
        </TabList>,
      );

      const unselected = tabRoots(container)[1];

      // Both spans render, so an unstripped ref would land on whichever mounts last.
      expect(reservedSpaceOf(unselected)).not.toBeNull();
      expect(ref.current).toBe(contentOf(unselected));
      expect(ref.current).not.toBe(reservedSpaceOf(unselected));
    });
  });

  describe('animated indicator', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('arms the transition and writes the resting variables on an enabled tab', () => {
      const { container } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
        </TabList>,
      );

      const tab = tabRoots(container)[0];

      expect(tab.hasAttribute('data-animating')).toBe(true);
      expect(tab.style.getPropertyValue('--fui-tab-indicator-offset')).toBe('0px');
      expect(tab.style.getPropertyValue('--fui-tab-indicator-scale')).toBe('1');
    });

    it('writes neither the flag nor the variables on a disabled tab', () => {
      const { container } = render(
        <TabList selectedValue="a" disabled>
          <Tab value="a">Tab A</Tab>
        </TabList>,
      );

      const tab = tabRoots(container)[0];

      expect(tab.hasAttribute('data-animating')).toBe(false);
      expect(tab.style.getPropertyValue('--fui-tab-indicator-offset')).toBe('');
      expect(tab.style.getPropertyValue('--fui-tab-indicator-scale')).toBe('');
    });

    it('measures the previous and current rects, then resets on the next frame', () => {
      const { container, rerender } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      const [a, b] = tabRoots(container);

      // jsdom reports a zero rect for every element, so the two selected tabs are given distinct
      // ones; the shared offset parent keeps its zero rect and drops out of the subtraction.
      a.getBoundingClientRect = () => ({ x: 0, y: 0, width: 40, height: 10 }) as DOMRect;
      b.getBoundingClientRect = () => ({ x: 100, y: 0, width: 60, height: 10 }) as DOMRect;

      rerender(
        <TabList selectedValue="b">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      const selected = tabRoots(container)[1];

      expect(selected.style.getPropertyValue('--fui-tab-indicator-offset')).toBe('-100px');
      expect(selected.style.getPropertyValue('--fui-tab-indicator-scale')).toBe(`${40 / 60}`);
      expect(selected.hasAttribute('data-animating')).toBe(false);

      act(() => {
        jest.runAllTimers();
      });

      expect(selected.style.getPropertyValue('--fui-tab-indicator-offset')).toBe('0px');
      expect(selected.style.getPropertyValue('--fui-tab-indicator-scale')).toBe('1');
      expect(selected.hasAttribute('data-animating')).toBe(true);
    });

    it('measures the block axis when the list is vertical', () => {
      const { container, rerender } = render(
        <TabList vertical selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      const [a, b] = tabRoots(container);

      a.getBoundingClientRect = () => ({ x: 0, y: 0, width: 40, height: 10 }) as DOMRect;
      b.getBoundingClientRect = () => ({ x: 0, y: 30, width: 40, height: 20 }) as DOMRect;

      rerender(
        <TabList vertical selectedValue="b">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      const selected = tabRoots(container)[1];

      expect(selected.style.getPropertyValue('--fui-tab-indicator-offset')).toBe('-30px');
      expect(selected.style.getPropertyValue('--fui-tab-indicator-scale')).toBe(`${10 / 20}`);
    });

    it('does not re-measure the same handoff on a later render', () => {
      const { container, rerender } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      const [a, b] = tabRoots(container);

      a.getBoundingClientRect = () => ({ x: 0, y: 0, width: 40, height: 10 }) as DOMRect;
      b.getBoundingClientRect = () => ({ x: 100, y: 0, width: 60, height: 10 }) as DOMRect;

      const selectB = (
        <TabList selectedValue="b">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>
      );

      rerender(selectB);

      act(() => {
        jest.runAllTimers();
      });

      rerender(selectB);

      const selected = tabRoots(container)[1];

      expect(selected.style.getPropertyValue('--fui-tab-indicator-offset')).toBe('0px');
      expect(selected.style.getPropertyValue('--fui-tab-indicator-scale')).toBe('1');
    });

    it('animates the same handoff again after the selection has moved away and back', () => {
      const { container, rerender } = render(
        <TabList selectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>,
      );

      const [a, b] = tabRoots(container);

      a.getBoundingClientRect = () => ({ x: 0, y: 0, width: 40, height: 10 }) as DOMRect;
      b.getBoundingClientRect = () => ({ x: 100, y: 0, width: 60, height: 10 }) as DOMRect;

      const select = (value: string) =>
        rerender(
          <TabList selectedValue={value}>
            <Tab value="a">Tab A</Tab>
            <Tab value="b">Tab B</Tab>
          </TabList>,
        );
      const settle = () =>
        act(() => {
          jest.runAllTimers();
        });

      select('b');
      settle();
      // Deselecting b must forget the a -> b handoff, or repeating it below is treated as
      // already animated and the bar jumps instead of sliding.
      select('a');
      settle();
      select('b');

      expect(tabRoots(container)[1].style.getPropertyValue('--fui-tab-indicator-offset')).toBe('-100px');
      expect(tabRoots(container)[1].style.getPropertyValue('--fui-tab-indicator-scale')).toBe(`${40 / 60}`);
    });
  });

  it('keeps the consumer classNames on every slot', () => {
    const { getByTestId } = render(
      <Tab
        data-testid="tab"
        value="a"
        className="consumer-root"
        icon={{ children: <Icon />, className: 'consumer-icon' }}
        content={{ children: 'Tab A', className: 'consumer-content' }}
      />,
    );

    const tab = getByTestId('tab');
    const icon = tab.querySelector<HTMLElement>(`.${styles.icon}`);

    expect(tab).toHaveClass('consumer-root');
    expect(icon).toHaveClass('consumer-icon');
    // The reserved-space span also receives the CONTENT slot's className, so this has to be
    // asserted on the content element itself or the reserved copy alone would satisfy it.
    expect(contentOf(tab)).toHaveClass('consumer-content');
    expect(reservedSpaceOf(tab)).toHaveClass('consumer-content');
  });

  it('passes root props straight through', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(<Tab data-testid="tab" value="a" id="my-tab" style={{ marginTop: 3 }} ref={ref} />);

    const tab = getByTestId('tab');

    expect(tab.id).toBe('my-tab');
    expect(tab.style.marginTop).toBe('3px');
    expect(tab.getAttribute('role')).toBe('tab');
    expect(tab.getAttribute('type')).toBe('button');
    expect(ref.current).toBe(tab);
  });

  it('does not mutate the state either hook is given', () => {
    const state = {
      appearance: 'subtle',
      size: 'medium',
      vertical: false,
      selected: false,
      disabled: false,
      root: { as: 'button', className: 'consumer' },
      content: { as: 'span', className: 'consumer-content' },
    } as unknown as TabState;

    const styled = useTabStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect((state.root as Record<string, unknown>)['data-orientation']).toBeUndefined();
    expect(state.content.className).toBe('consumer-content');
  });

  it('does not mutate the state the indicator hook is given', () => {
    const seen: TabState[] = [];
    const state = {
      appearance: 'transparent',
      size: 'medium',
      vertical: false,
      selected: false,
      disabled: false,
      root: { as: 'button', className: 'consumer' },
      content: { as: 'span' },
    } as unknown as TabState;

    const Probe = () => {
      seen.push(useTabAnimatedIndicator(state));

      return null;
    };

    render(<Probe />);

    const next = seen[0];

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect((state.root as Record<string, unknown>)['data-animating']).toBeUndefined();
    expect((state.root as Record<string, unknown>).style).toBeUndefined();
  });

  it('carries the marker pair and not the list marker inside a list', () => {
    const { container } = render(
      <TabList>
        <Tab value="a">Tab A</Tab>
      </TabList>,
    );

    const tab = tabRoots(container)[0];

    expect(tab).toHaveClass(tabClassNames.root.split(' ')[0]);
    expect(tab.classList.contains('fui-tab-list')).toBe(false);
  });
});
