import { Accessibility, tableRowBehavior, GridRowBehaviorProps } from '@fluentui/accessibility';
import { getElementType, useAccessibility, useStyles, useTelemetry, useUnhandledProps } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import { mergeComponentVariables } from '@fluentui/styles';
import * as _ from 'lodash';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  FluentComponentStaticProps,
  ProviderContextPrepared,
  ShorthandCollection,
  WithAsProp,
  withSafeTypeForAs,
  ComponentEventHandler,
} from '../../types';
import { childrenExist, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
import TableCell, { TableCellProps } from './TableCell';

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

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<TableRowProps>;
}

const handleVariablesOverrides = variables => predefinedProps => ({
  variables: mergeComponentVariables(variables, predefinedProps.variables),
});

export const tableRowClassName = 'ui-table__row';

export type TableRowStylesProps = Pick<TableRowProps, 'header' | 'compact'>;

const TableRow: React.FC<WithAsProp<TableRowProps>> & FluentComponentStaticProps<TableRowProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(TableRow.displayName, context.telemetry);
  setStart();
  const rowRef = React.useRef<HTMLElement>();
  const { className, design, styles, items, header, compact, children, accessibility, variables, selected } = props;

  const hasChildren = childrenExist(children);
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TableRow.handledProps, props);
  const getA11yProps = useAccessibility(accessibility, {
    debugName: TableRow.displayName,
    actionHandlers: {
      // https://github.com/microsoft/fluent-ui-react/issues/2150
      unsetRowTabbable: e => {
        rowRef.current.setAttribute('tabindex', '-1');
      },
      performClick: e => {
        handleClick(e);
      },
    },
    mapPropsToBehavior: () => ({
      selected,
      header,
    }),
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

  const handleClick = (e: React.SyntheticEvent) => {
    if (e.currentTarget === e.target) {
      _.invoke(props, 'onClick', e, props);
      e.preventDefault();
    }
  };

  const renderCells = () => {
    return _.map(items, (item: TableCellProps, index: number) => {
      const overrideProps = handleVariablesOverrides(variables);
      return TableCell.create(item, {
        defaultProps: () =>
          getA11yProps('cell', {
            ...overrideProps,
          }),
      });
    });
  };

  const element = (
    <Ref innerRef={rowRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            onClick: handleClick,
            ...unhandledProps,
          })}
        >
          {hasChildren && children}
          {!hasChildren && renderCells()}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
};

TableRow.displayName = 'TableRow';

TableRow.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  items: customPropTypes.collectionShorthand,
  header: PropTypes.bool,
  compact: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

TableRow.handledProps = Object.keys(TableRow.propTypes) as any;

TableRow.defaultProps = {
  accessibility: tableRowBehavior,
};

TableRow.create = createShorthandFactory({ Component: TableRow, mappedArrayProp: 'items' });

/**
 * Component represents a single row in a tabular structure
 */
export default withSafeTypeForAs<typeof TableRow, TableRowProps, 'div'>(TableRow);
