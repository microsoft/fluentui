'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it calls `useDataGridContext_unstable` and
 * `useTableRowStyles_unstable`, so `enforce-use-client` sees a hook call and never reports
 * the directive as unnecessary. Converted leaf hooks call nothing and carry no directive at
 * all; see useTableRowStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridRowState } from './DataGridRow.types';
import { useTableRowStyles_unstable } from '../TableRow/useTableRowStyles.styles';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';

import styles from './DataGridRow.module.css';

/**
 * DataGridRow's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity. The `fui-DataGridRow` / `fui-DataGridRow__selectionCell` BEM
 * statics are gone (D16.1) and the type has narrowed from `SlotClassNames<DataGridRowSlots>`
 * to `{ root: string }`, so a read of `selectionCell` is a compile error on the exact line
 * that would otherwise have silently stopped matching.
 *
 * A DataGridRow IS a TableRow, so this element ALSO carries `group/fui-table-row` from
 * `useTableRowStyles_unstable` — two markers by design (D16.3), declared to
 * react-conformance through `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: use `fuiSelector(dataGridRowClassNames.root)`
 * from `@fluentui/react-utilities` (D16.5). `apps/vr-tests-react-components`'s two
 * `DataGrid/DataGridSubtle*.stories.tsx` build a StoryWright hover selector from the literal
 * `.fui-DataGridHeader > .fui-DataGridRow` and have to move to the marker form.
 */
export const dataGridRowClassNames: { root: string } = {
  root: 'group/fui-data-grid-row',
};

/**
 * Apply styling to the DataGridRow slots based on the state
 */
export const useDataGridRowStyles_unstable = (state: DataGridRowState): DataGridRowState => {
  const isSubtle = useDataGridContext_unstable(ctx => ctx.subtleSelection);

  // `useTableRowStyles_unstable` is called LAST (it ran first under Griffel) so that its
  // unconditional `styles.root` is PREPENDED and `group/fui-data-grid-row` can never be
  // `classList[0]`, where nwsapi's jsdom `:scope` polyfill throws on the `/` (D15.1 /
  // D16.2). `styles['subtle-selection']` is conditional and so cannot hold that position
  // itself, which is exactly the case D16.2 warns about.
  //
  // The consumer className also moves to LAST, where the Griffel call had it SECOND — see
  // DataGridRow.module.css for why that is the migration's stated contract rather than a
  // regression: `subtle-selection` lives in `fui.components.l2` and an unlayered consumer
  // rule beats every `fui.*` layer (D2 / D9).
  //
  // No `data-subtle-selection` mirror is minted: `isSubtle` gates one module class on this
  // very element and nothing reads it from CSS across an element boundary (D15.6).
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(dataGridRowClassNames.root, isSubtle && styles['subtle-selection'], state.root.className),
    },
  };

  // NOTE: there is deliberately no `state.selectionCell` assignment. Its only library token
  // was the `fui-DataGridRow__selectionCell` static (D16.1 removed it), so what remained,
  // `clsx(state.selectionCell.className)`, was an identity on the consumer's own string:
  // dead code implying this hook styles a slot it does not (CONVERSION_GUIDE "a slot whose
  // only library token is the static"). The TableSelectionCell that fills the slot styles
  // itself, and this row reaches it through its marker — see DataGridRow.module.css.

  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal).
  // DataGridRow adds a `selectionCell` slot, so TableRow's `components` map is NARROWER than this
  // one; it is dropped off the return so this component keeps its own, and every other key
  // TableRow composed is merged onto this component's wider shape.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { components: tableRowComponents, ...composedTableRow } = useTableRowStyles_unstable(state);
  state = { ...state, ...composedTableRow };

  return state;
};
