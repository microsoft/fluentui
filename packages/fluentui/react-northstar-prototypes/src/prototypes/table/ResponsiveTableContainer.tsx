import * as React from 'react';
import { TableProps, Table, tableCellClassName, tableClassName } from '@fluentui/react-northstar';
import calculateBreakpoints, { Column, Breakpoint } from './calculateBreakpoints';
import * as _ from 'lodash';

interface ResponsiveTableProps extends TableProps {
  columns: Column[];
  children: React.ReactElement<typeof Table>;
  breakpoints?: number[];
  id?: string;
}

const ResponsiveTableContainer: React.FC<ResponsiveTableProps> = props => {
  const { columns: config, children } = props;

  const responsiveTableID = React.useMemo(
    () => props.id || _.uniqueId(`${tableClassName}__responsive-wrapper`),
    [props.id],
  );

  const [breakpoints, setBreakpoints] = React.useState<Breakpoint | undefined>();

  /**
   * Generate the stylesheet once and for all checking if
   * the total size of the table ( based in th esum of the minWidth columns ) still fits in the current breakpoint
   */
  React.useLayoutEffect(() => {
    setBreakpoints(calculateBreakpoints(config, props.breakpoints || [1200, 960, 600, 280]));
  }, [config, props.breakpoints]);

  return (
    <div id={responsiveTableID}>
      <style>
        {_.map(
          breakpoints,
          (breakpoint, key) => `
              @media (max-width: ${key}px) {
                ${breakpoint
                  .map(
                    column =>
                      `#${responsiveTableID} .${tableCellClassName}:nth-child(${column.childIndex}) { display: none }`,
                  )
                  .join('\n  ')}
              }`,
        ).join('\n')}
      </style>
      {children}
    </div>
  );
};

export default ResponsiveTableContainer;
