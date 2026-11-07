import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Tab } from '../Tab/Tab';
import { TabList } from './TabList';
import type { TabListState } from './TabList.types';
import { useTabListContext } from './TabListContext';
import { tabListClassNames, useTabListStyles } from './useTabListStyles';
import { tabClassNames } from '../Tab/useTabStyles';

import styles from './TabList.module.css';
import tabStyles from '../Tab/Tab.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/tab-list', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tab-list');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTabList: (...args: Parameters<typeof actual.useTabList>) => deepFreezeState(actual.useTabList(...args)),
    useTabListContextValues: (...args: Parameters<typeof actual.useTabListContextValues>) => {
      contextValueArgs.push(args[0] as Record<string, unknown>);

      return actual.useTabListContextValues(...args);
    },
  };
});

// The state each render hands to the Griffel context builder.
const contextValueArgs: Array<Record<string, unknown>> = [];

beforeEach(() => {
  contextValueArgs.length = 0;
});

const tabs = (
  <>
    <Tab value="a">Tab A</Tab>
    <Tab value="b">Tab B</Tab>
    <Tab value="c">Tab C</Tab>
  </>
);

const tabRoots = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLElement>('.fui-tab'));

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
  });

  it('stamps the marker pair', () => {
    const { getByTestId } = render(<TabList data-testid="root">{tabs}</TabList>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-tab-list');
    expect(root).toHaveClass('group/fui-tab-list');
    expect(root.classList[0]).toBe('fui-tab-list');
    expect(root).toHaveClass(styles.root);
    // fui-tab is a prefix of fui-tab-list, so the negative control has to be a class token test.
    expect(root.classList.contains('fui-tab')).toBe(false);
    expect(root).not.toHaveClass(tabStyles.content);
  });

  it('stamps the look-prop defaults on the list and on every tab', () => {
    const { container, getByTestId } = render(<TabList data-testid="root">{tabs}</TabList>);

    const root = getByTestId('root');

    expect(root.getAttribute('data-appearance')).toBe('transparent');
    expect(root.getAttribute('data-size')).toBe('medium');

    for (const tab of tabRoots(container)) {
      expect(tab.getAttribute('data-appearance')).toBe('transparent');
      expect(tab.getAttribute('data-size')).toBe('medium');
    }
  });

  it('stamps the explicit look props on the list and carries them to every tab', () => {
    const { container, getByTestId } = render(
      <TabList data-testid="root" appearance="subtle-circular" size="large">
        {tabs}
      </TabList>,
    );

    expect(getByTestId('root').getAttribute('data-appearance')).toBe('subtle-circular');
    expect(getByTestId('root').getAttribute('data-size')).toBe('large');

    for (const tab of tabRoots(container)) {
      expect(tab.getAttribute('data-appearance')).toBe('subtle-circular');
      expect(tab.getAttribute('data-size')).toBe('large');
    }
  });

  it('composes the rounded module class only for the circular appearances', () => {
    for (const appearance of ['subtle-circular', 'filled-circular'] as const) {
      const { getByTestId, unmount } = render(<TabList data-testid="root" appearance={appearance} />);

      expect(getByTestId('root')).toHaveClass(styles.rounded);
      unmount();
    }

    for (const appearance of ['transparent', 'subtle'] as const) {
      const { getByTestId, unmount } = render(<TabList data-testid="root" appearance={appearance} />);

      expect(getByTestId('root')).not.toHaveClass(styles.rounded);
      unmount();
    }
  });

  it('falls back to the default look values for a tab rendered outside any list', () => {
    const { getByTestId } = render(<Tab data-testid="tab" value="a" />);

    const tab = getByTestId('tab');

    expect(tab.getAttribute('data-appearance')).toBe('transparent');
    expect(tab.getAttribute('data-size')).toBe('medium');
  });

  it('moves the selection stamps to the selected tab only', () => {
    const { container } = render(<TabList selectedValue="b">{tabs}</TabList>);

    const [a, b, c] = tabRoots(container);

    expect(a.hasAttribute('data-selected')).toBe(false);
    expect(b.hasAttribute('data-selected')).toBe(true);
    expect(c.hasAttribute('data-selected')).toBe(false);
    expect(a.getAttribute('aria-selected')).toBe('false');
    expect(b.getAttribute('aria-selected')).toBe('true');
  });

  it('honours defaultSelectedValue on the first render', () => {
    const { container } = render(<TabList defaultSelectedValue="c">{tabs}</TabList>);

    const [a, b, c] = tabRoots(container);

    expect(a.hasAttribute('data-selected')).toBe(false);
    expect(b.hasAttribute('data-selected')).toBe(false);
    expect(c.hasAttribute('data-selected')).toBe(true);
  });

  it('selects nothing when neither selection prop is given', () => {
    const { container } = render(<TabList>{tabs}</TabList>);

    for (const tab of tabRoots(container)) {
      expect(tab.hasAttribute('data-selected')).toBe(false);
    }
  });

  it('moves the selection on click when uncontrolled, and reports it', () => {
    const onTabSelect = jest.fn();
    const { container } = render(
      <TabList defaultSelectedValue="a" onTabSelect={onTabSelect}>
        {tabs}
      </TabList>,
    );

    const [, b] = tabRoots(container);

    fireEvent.click(b);

    expect(tabRoots(container)[1].hasAttribute('data-selected')).toBe(true);
    expect(tabRoots(container)[0].hasAttribute('data-selected')).toBe(false);
    expect(onTabSelect).toHaveBeenCalledTimes(1);
    expect(onTabSelect.mock.calls[0][1]).toEqual({ value: 'b' });
  });

  it('does not move a controlled selection on click', () => {
    const onTabSelect = jest.fn();
    const { container } = render(
      <TabList selectedValue="a" onTabSelect={onTabSelect}>
        {tabs}
      </TabList>,
    );

    fireEvent.click(tabRoots(container)[1]);

    expect(tabRoots(container)[0].hasAttribute('data-selected')).toBe(true);
    expect(tabRoots(container)[1].hasAttribute('data-selected')).toBe(false);
    expect(onTabSelect).toHaveBeenCalledTimes(1);
  });

  it('disables every tab when the list is disabled', () => {
    const { container } = render(<TabList disabled>{tabs}</TabList>);

    for (const tab of tabRoots(container)) {
      expect(tab).toBeDisabled();
      expect(tab.hasAttribute('data-disabled')).toBe(true);
    }
  });

  it('disables only the tab that asks for it', () => {
    const { container } = render(
      <TabList>
        <Tab value="a">Tab A</Tab>
        <Tab value="b" disabled>
          Tab B
        </Tab>
      </TabList>,
    );

    const [a, b] = tabRoots(container);

    expect(a).not.toBeDisabled();
    expect(a.hasAttribute('data-disabled')).toBe(false);
    expect(b).toBeDisabled();
    expect(b.hasAttribute('data-disabled')).toBe(true);
  });

  it('publishes the look values and the tab registry through the windmod context', () => {
    const seen: Array<ReturnType<typeof useTabListContext>> = [];

    const Probe = () => {
      seen.push(useTabListContext());

      return null;
    };

    render(
      <TabList appearance="subtle" size="small" reserveSelectedTabSpace={false}>
        <Tab value="a">Tab A</Tab>
        <Tab value="b">Tab B</Tab>
        <Probe />
      </TabList>,
    );

    const context = seen[seen.length - 1];

    expect(context.appearance).toBe('subtle');
    expect(context.size).toBe('small');
    expect(context.reserveSelectedTabSpace).toBe(false);

    const registered = context.getRegisteredTabs?.();

    expect(Object.keys(registered?.registeredTabs ?? {}).sort()).toEqual([JSON.stringify('a'), JSON.stringify('b')]);
    expect(registered?.registeredTabs[JSON.stringify('a')].ref.current).toBeInstanceOf(HTMLElement);
  });

  it('hands the Griffel context builder a state carrying all three look values', () => {
    render(
      <TabList appearance="subtle-circular" size="large" reserveSelectedTabSpace={false}>
        {tabs}
      </TabList>,
    );

    // The headless TabList state omits all three; a Griffel Tab nested in a windmod TabList is
    // styled only because they are merged on before the context values are built.
    const seen = contextValueArgs[contextValueArgs.length - 1];

    expect(seen.appearance).toBe('subtle-circular');
    expect(seen.size).toBe('large');
    expect(seen.reserveSelectedTabSpace).toBe(false);
  });

  it('keeps the consumer className on the root', () => {
    const { getByTestId } = render(
      <TabList data-testid="root" className="consumer">
        {tabs}
      </TabList>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('consumer');
    expect(root).toHaveClass(tabListClassNames.root.split(' ')[0]);
  });

  it('passes root props straight through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      // The headless TabList root slot is typed to `div` alone, so there is no `as` to forward.
      <TabList data-testid="root" id="my-list" style={{ marginTop: 3 }} ref={ref} aria-label="Sections">
        {tabs}
      </TabList>,
    );

    const root = getByTestId('root');

    expect(root.tagName).toBe('DIV');
    expect(root.getAttribute('aria-label')).toBe('Sections');
    expect(root.id).toBe('my-list');
    expect(root.style.marginTop).toBe('3px');
    expect(ref.current).toBe(root);
  });

  it('keeps the headless accessibility contract intact', () => {
    const { getByTestId } = render(<TabList data-testid="root">{tabs}</TabList>);

    const root = getByTestId('root');

    expect(root.getAttribute('role')).toBe('tablist');
    expect(root.getAttribute('aria-orientation')).toBe('horizontal');
    expect(root.getAttribute('data-orientation')).toBe('horizontal');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'subtle',
      size: 'large',
      reserveSelectedTabSpace: true,
      root: { as: 'div', className: 'consumer' },
    } as unknown as TabListState;

    const next = useTabListStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect((state.root as Record<string, unknown>)['data-appearance']).toBeUndefined();
    expect(next.root.className).toContain('consumer');
  });

  it('marks the tabs, not the list, with the tab marker pair', () => {
    const { container, getByTestId } = render(<TabList data-testid="root">{tabs}</TabList>);

    for (const tab of tabRoots(container)) {
      expect(tab).toHaveClass('fui-tab');
      expect(tab).toHaveClass('group/fui-tab');
      expect(tab.classList[0]).toBe('fui-tab');
      expect(tab.classList.contains('fui-tab-list')).toBe(false);
    }

    expect(getByTestId('root').classList.contains(tabClassNames.root.split(' ')[0])).toBe(false);
  });
});
