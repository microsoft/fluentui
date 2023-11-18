import { Accessibility, tableBehavior, TableBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useTelemetry,
  mergeVariablesOverrides,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useFluentContext,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import * as React from 'react';
import {
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  childrenExist,
  createShorthandFactory,
} from '../../utils';
import { TableRow, TableRowProps } from './TableRow';
import { TableCell } from './TableCell';

import { ShorthandCollection, ShorthandValue, FluentComponentStaticProps } from '../../types';

export interface TableSlotClassNames {
  header: string;
}

export interface TableProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility<TableBehaviorProps>;

  /** The columns of the Table with a space-separated list of values.
   */
  header?: ShorthandValue<TableRowProps>;

  /** The rows of the Table with a space-separated list of values.
   */
  rows?: ShorthandCollection<TableRowProps>;

  /**
   * Render table in compact mode
   */
  compact?: boolean;
}

export const tableClassName = 'ui-table';
export const tableSlotClassNames: TableSlotClassNames = {
  header: `${tableClassName}__header`,
};

export type TableStylesProps = never;

/**
 * A Table is used to display data in tabular layout
 * * @accessibility
 * Implements ARIA [Data Grid](https://www.w3.org/TR/wai-aria-practices/#dataGrid) design pattern for presenting tabular information.
 * When gridcell contains actionable element, use [gridCellWithFocusableElementBehavior](/components/table/accessibility#grid-cell-with-focusable-element-behavior-ts). [More information available in aria documentation.](https://www.w3.org/TR/wai-aria-practices/#gridNav_focus)
 * Use [gridCellMultipleFocusableBehavior](/components/table/accessibility#gridCellMultipleFocusableBehavior), when gridcell contains:
 * \- editable content
 * \- multiple actionable elements
 * \- component that utilizes arrow keys in its navigation, like menu button, dropdown, radio group, slider, etc.
 * [More information available in aria documentation.](https://www.w3.org/TR/wai-aria-practices/#gridNav_inside)
 * @accessibilityIssues
 * [NVDA narrate table title(aria-label) twice](https://github.com/nvaccess/nvda/issues/10548)
 * [Accessibility DOM > Table > gridcell > when gridcell is focused, then selected state is send to reader](https://bugs.chromium.org/p/chromium/issues/detail?id=1030378)
 * [JAWS narrate grid name twice, once as table and second time as grid](https://github.com/FreedomScientific/VFO-standards-support/issues/346)
 * [JAWS doesn't narrate grid column name, when focus is on actionable element in the cell] (https://github.com/FreedomScientific/VFO-standards-support/issues/348)
 * [aria-sort is not output at child elements](https://github.com/FreedomScientific/VFO-standards-support/issues/319)
 * [VoiceOver not announcing rows correctly for a grid with presentation elements inside](https://bugs.chromium.org/p/chromium/issues/detail?id=1054424)
 * VoiceOver doesn't narrate aria-rowcount value in table or grid
 */
export const Table = React.forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Table.displayName, context.telemetry);
  setStart();
  const { children, rows, header, compact, accessibility, className, design, styles, variables } = props;
  const hasChildren = childrenExist(children);
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Table.handledProps, props);

  const getA11yProps = useAccessibility<TableBehaviorProps>(accessibility, {
    debugName: Table.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<TableStylesProps>(Table.displayName, {
    className: tableClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const renderRows = () => {
    return _.map(rows, (row: TableRowProps) => {
      return TableRow.create(row, {
        defaultProps: () =>
          getA11yProps('row', {
            compact,
            onClick: (e, props) => {
              _.invoke(row, 'onClick', e, props);
            },
          }),
        overrideProps: predefinedProps => ({
          variables: mergeVariablesOverrides(variables, predefinedProps.variables),
        }),
      });
    });
  };

  const renderHeader = () => {
    return TableRow.create(header, {
      defaultProps: () =>
        getA11yProps('row', {
          header: true,
          compact,
          className: tableSlotClassNames.header,
        }),
      overrideProps: predefinedProps => ({
        variables: mergeVariablesOverrides(variables, predefinedProps.variables),
      }),
    });
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
    >
      {hasChildren && children}
      {/* <thead> */}
      {!hasChildren && renderHeader()}
      {/* </thead> */}
      {/* <tbody> */}
      {!hasChildren && renderRows()}
      {/* </tbody> */}
    </ElementType>,
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, TableProps> &
  FluentComponentStaticProps<TableProps> & {
    Cell: typeof TableCell;
    Row: typeof TableRow;
  };

Table.displayName = 'Table';

Table.Cell = TableCell;

Table.Row = TableRow;

Table.create = createShorthandFactory({
  Component: Table,
});

Table.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  header: customPropTypes.itemShorthand,
  rows: customPropTypes.collectionShorthand,
  compact: PropTypes.bool,
};

Table.handledProps = Object.keys(Table.propTypes) as any;

Table.defaultProps = {
  accessibility: tableBehavior,
};
