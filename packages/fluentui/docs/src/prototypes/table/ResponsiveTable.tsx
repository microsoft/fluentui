import * as React from 'react';
import { Table, TableCell } from '@fluentui/react';
import calculateBreakpoints, { Column, Breakpoint } from '../../utils/calculateBreakpoints';
import { TableProps } from '../../../../react/src/components/Table/Table';
import * as _ from 'lodash';

interface ResponsiveTableProps extends TableProps {
  label: string;
  id?: string;
  header: {
    items: Column[];
  };
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = props => {
  const {
    rows,
    label,
    header: { items }
  } = props;

  const responsiveTableID = props.id || _.uniqueId(`${Table.className}__responsive-wrapper`);

  const columns = items.map(({ title }) => title);

  const [breakpoints, setBreakpoints] = React.useState<Breakpoint[]>();

  // Generate the stylesheet once and for all
  React.useLayoutEffect(() => {
    const breakpoints = Array.from(calculateBreakpoints(items, { default: 16 }));
    setBreakpoints(breakpoints);
  }, []);

  return (
    <div id={responsiveTableID}>
      <style>
        {items.map((c, i) => `#${responsiveTableID} .${TableCell.className}:nth-child(${i + 1}) { flex: ${c.ratio}; }`).join('\n')}
        {breakpoints &&
          breakpoints.map(
            breakpoint => `
            /* Viewport ${breakpoint.viewport} | Table ${breakpoint.table} | ${breakpoint.columns
              .map((column, index) => `${columns[index]} ${column.state}${column.state === 'visible' ? ` (${column.size}px)` : ''}`)
              .join(' | ')} */
              @media (max-width: ${breakpoint.viewport}px) {
              ${breakpoint.columns
                .map(
                  (column, index) =>
                    `#${responsiveTableID} .${TableCell.className}:nth-child(${index + 1}) { display: ${
                      column.state === 'visible' ? 'initial' : 'none'
                    }; }`
                )
                .join('\n  ')}
            }`
          )}
      </style>
      <Table rows={rows} header={{ items: columns }} arial-label={label} />
    </div>
  );
};

export default ResponsiveTable;
