import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTabListBase_unstable } from './useTabListBase';
import { renderTabList_unstable } from './renderTabList';
import { renderTab_unstable, TabState, useTabBase_unstable } from '../Tab';
import { useTabListContextValues_unstable } from './useTabListContextValues';
import { mergeClasses } from '@griffel/react';
import { useTabListContext_unstable } from './TabListContext';
import { TabListState } from './TabList.types';

describe('useTabListBase', () => {
  type CustomTabAppearance = 'filled' | 'outline';

  type CustomTabProps = Parameters<typeof useTabBase_unstable>[0];

  const CustomTab = React.forwardRef<HTMLButtonElement, CustomTabProps>((props, ref) => {
    const state = useTabBase_unstable(props, ref);
    const appearance = useTabListContext_unstable(ctx => ctx.appearance as CustomTabAppearance);

    state.root.className = mergeClasses(
      'tab',
      `tab--${appearance}`,
      state.selected && 'tab-selected',
      state.root.className,
    );

    return renderTab_unstable(state as TabState);
  });

  type CustomTabListProps = Parameters<typeof useTabListBase_unstable>[0] & {
    appearance?: 'filled' | 'outline';
  };

  const CustomTabList = React.forwardRef<HTMLDivElement, CustomTabListProps>(
    ({ appearance = 'filled', ...props }, ref) => {
      const state = useTabListBase_unstable(props, ref);
      Object.assign(state, { appearance });
      const contextValues = useTabListContextValues_unstable(state as TabListState);

      state.root.className = mergeClasses('tab-list', `tab-list--${appearance}`, state.root.className);

      return renderTabList_unstable(state as TabListState, contextValues);
    },
  );

  it('render tabs', () => {
    const result = render(
      <CustomTabList appearance="outline" defaultSelectedValue="1">
        <CustomTab value="1">First</CustomTab>
        <CustomTab value="2">Second</CustomTab>
      </CustomTabList>,
    );

    expect(result.getByRole('tablist')).toMatchInlineSnapshot(`
      <div
        aria-orientation="horizontal"
        class="tab-list tab-list--outline"
        data-tabster="{\\"mover\\":{\\"cyclic\\":true,\\"direction\\":2,\\"memorizeCurrent\\":false,\\"hasDefault\\":true}}"
        role="tablist"
      >
        <button
          aria-selected="true"
          class="tab tab--outline tab-selected"
          data-tabster="{\\"focusable\\":{\\"isDefault\\":true}}"
          role="tab"
          type="button"
          value="1"
        >
          <span>
            First
          </span>
        </button>
        <button
          aria-selected="false"
          class="tab tab--outline"
          data-tabster="{\\"focusable\\":{\\"isDefault\\":false}}"
          role="tab"
          type="button"
          value="2"
        >
          <span>
            Second
          </span>
        </button>
      </div>
    `);

    // Selected the `Second` tab
    userEvent.click(result.getByRole('tab', { name: 'Second' }));

    // Ensure the `Second` tab is selected
    expect(result.getByRole('tablist')).toMatchInlineSnapshot(`
      <div
        aria-orientation="horizontal"
        class="tab-list tab-list--outline"
        data-tabster="{\\"mover\\":{\\"cyclic\\":true,\\"direction\\":2,\\"memorizeCurrent\\":false,\\"hasDefault\\":true}}"
        role="tablist"
      >
        <button
          aria-selected="false"
          class="tab tab--outline"
          data-tabster="{\\"focusable\\":{\\"isDefault\\":false}}"
          role="tab"
          type="button"
          value="1"
        >
          <span>
            First
          </span>
        </button>
        <button
          aria-selected="true"
          class="tab tab--outline tab-selected"
          data-tabster="{\\"focusable\\":{\\"isDefault\\":true}}"
          role="tab"
          type="button"
          value="2"
        >
          <span>
            Second
          </span>
        </button>
      </div>
    `);
  });
});
