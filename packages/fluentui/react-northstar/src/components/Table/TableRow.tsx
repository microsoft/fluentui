import { Accessibility, tableRowBehavior, GridRowBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  mergeVariablesOverrides,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  wrapWithFocusZone,
  useStyles,
  useUnhandledProps,
  useFluentContext,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FluentComponentStaticProps, ShorthandCollection } from '../../types';
import { childrenExist, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
import { TableCell, TableCellProps } from './TableCell';

export interface TableRowProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility<GridRowBehaviorProps>;

  /**
   * Row cells
   */
  items?: ShorthandCollection<TableCellProps>;

  /**
   * Is the row a table header
   */
  header?: boolean;

  /**
   * Render table in compact mode
   */
  compact?: boolean;

  /**
   * Whether a row is currently selected or not.
   */
  selected?: boolean;
}

export const tableRowClassName = 'ui-table__row';

export type TableRowStylesProps = Pick<TableRowProps, 'header' | 'compact'>;

/**
 * Component represents a single row in a tabular structure
 */
export const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>((props, ref) => {
  const context = useFluentContext();

  const rowRef = React.useRef<HTMLElement>();
  const {
    className,
    design,
    styles,
    items,
    header,
    compact,
    children,
    accessibility = tableRowBehavior,
    variables,
    selected,
  } = props;

  const hasChildren = childrenExist(children);
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TableRow.handledProps, props);
  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    actionHandlers: {
      // https://github.com/microsoft/fluent-ui-react/issues/2150
      unsetRowTabbable: e => {
        rowRef.current.setAttribute('tabindex', '-1');
      },
      performClick: e => {
        if (e.currentTarget === e.target) {
          _.invoke(props, 'onClick', e, props);
          e.preventDefault();
        }
      },
    },
    behaviorProps: {
      selected,
      header,
    },
    rtl: context.rtl,
  });

  const { classes } = useStyles<TableRowStylesProps>(TableRow.displayName, {
    className: tableRowClassName,
    mapPropsToStyles: () => ({
      header,
      compact,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const cellA11yProps = useAccessibilitySlotProps(a11yBehavior, 'cell', {});

  const renderCells = () => {
    return _.map(items, (item: TableCellProps) => {
      return TableCell.create(item, {
        defaultProps: () => cellA11yProps,
        overrideProps: predefinedProps => ({
          variables: mergeVariablesOverrides(variables, predefinedProps.variables),
        }),
      });
    });
  };

  const element = (
    <Ref innerRef={rowRef}>
      {wrapWithFocusZone(
        a11yBehavior,
        <ElementType
          {...useAccessibilitySlotProps(a11yBehavior, 'root', {
            className: classes.root,
            ref,
            ...unhandledProps,
          })}
        >
          {hasChildren && children}
          {!hasChildren && renderCells()}
        </ElementType>,
      )}
    </Ref>
  );

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, TableRowProps> & FluentComponentStaticProps<TableRowProps>;

TableRow.displayName = 'TableRow';

TableRow.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  items: customPropTypes.collectionShorthand,
  header: PropTypes.bool,
  compact: PropTypes.bool,
  selected: PropTypes.bool,
};

TableRow.handledProps = Object.keys(TableRow.propTypes) as any;

TableRow.create = createShorthandFactory({ Component: TableRow, mappedArrayProp: 'items' });
