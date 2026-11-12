import type { JSXElement } from '@fluentui/react-utilities';
import { renderTable_unstable } from '@fluentui/react-table';
import type { TableContextValues, TableState } from './Table.types';

/**
 * Renders the final JSX of the Table component, given the state and the context values.
 */
export const renderTable = renderTable_unstable as (state: TableState, contextValues: TableContextValues) => JSXElement;
