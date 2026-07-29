'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useTableHeaderStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useTableHeaderStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridHeaderState } from './DataGridHeader.types';
import { useTableHeaderStyles_unstable } from '../TableHeader/useTableHeaderStyles.styles';

/**
 * DataGridHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity. The `fui-DataGridHeader` BEM static is gone (D16.1) and the
 * type has narrowed from `SlotClassNames<DataGridHeaderSlots>` to `{ root: string }`.
 *
 * A DataGridHeader IS a TableHeader, so this element ALSO carries `group/fui-table-header`
 * from `useTableHeaderStyles_unstable` — two markers by design (D16.3), declared to
 * react-conformance through `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(dataGridHeaderClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 * `apps/vr-tests-react-components`'s two `DataGrid/DataGridSubtle*.stories.tsx` build a
 * StoryWright hover selector from the literal `.fui-DataGridHeader > .fui-DataGridRow` and
 * have to move to the marker form.
 */
export const dataGridHeaderClassNames: { root: string } = {
  root: 'group/fui-data-grid-header',
};

/**
 * Apply styling to the DataGridHeader slots based on the state
 */
export const useDataGridHeaderStyles_unstable = (state: DataGridHeaderState): DataGridHeaderState => {
  // `useTableHeaderStyles_unstable` is called LAST (it ran first under Griffel) so that its
  // unconditional layout class is PREPENDED and `group/fui-data-grid-header` can never be
  // `classList[0]`, where nwsapi's jsdom `:scope` polyfill throws on the `/` (D15.1 /
  // D16.2). It also keeps the consumer className last. The swap is cascade-inert: this
  // component contributes no declarations, and `@layer fui.*` decides every tie (D2).
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx('group/fui-data-grid-header', state.root.className);

  useTableHeaderStyles_unstable(state);

  return state;
};
