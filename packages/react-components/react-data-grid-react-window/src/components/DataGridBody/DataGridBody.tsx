import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDataGridBodyStyles_unstable } from './useDataGridBodyStyles.styles';
import { useDataGridBody_unstable } from './useDataGridBody';
import { renderDataGridBody_unstable } from './renderDataGridBody';
import type { DataGridBodyProps } from './DataGridBody.types';

/**
 * @deprecated - please use [\@fluentui-contrib/react-data-grid-react-window](https://www.npmjs.com/package/\@fluentui-contrib/react-data-grid-react-window) instead
 */
export const DataGridBody: ForwardRefComponent<DataGridBodyProps> &
  (<TItem>(props: DataGridBodyProps<TItem>) => JSX.Element) = React.forwardRef((props, ref) => {
  const state = useDataGridBody_unstable(props, ref);

  useDataGridBodyStyles_unstable(state);
  return renderDataGridBody_unstable(state);
}) as ForwardRefComponent<DataGridBodyProps> & (<TItem>(props: DataGridBodyProps<TItem>) => JSX.Element);

// eslint-disable-next-line deprecation/deprecation
DataGridBody.displayName = 'DataGridBody';
