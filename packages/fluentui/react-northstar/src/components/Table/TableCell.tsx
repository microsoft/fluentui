import * as customPropTypes from '@fluentui/react-proptypes';
import { Accessibility, tableCellBehavior, TableCellBehaviorProps } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import {
  childrenExist,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
} from '../../utils';
import {
  useTelemetry,
  useStyles,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

import { Box, BoxProps } from '../Box/Box';
import { ShorthandValue, FluentComponentStaticProps } from '../../types';

export interface TableCellProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available TableCellBehavior
   * */
  accessibility?: Accessibility<TableCellBehaviorProps>;

  /**
   * Truncate cell's content
   */
  truncateContent?: boolean;
}

export type TableCellStylesProps = Pick<TableCellProps, 'truncateContent'>;

export interface TableCellSlotClassNames {
  content: string;
}

export const tableCellClassName = 'ui-table__cell';
export const tableCellSlotClassNames: TableCellSlotClassNames = {
  content: `${tableCellClassName}__content`,
};

/**
 * Component represents a table cell.
 */
export const TableCell = React.forwardRef<HTMLDivElement, TableCellProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(TableCell.displayName, context.telemetry);
  setStart();
  const cellRef = React.useRef<HTMLElement>();

  const { children, content, truncateContent, className, design, styles, variables } = props;
  const hasChildren = childrenExist(children);
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TableCell.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: TableCell.displayName,
    actionHandlers: {
      focusCell: e => {
        e.preventDefault();
        cellRef.current.focus();
      },
      performClick: e => {
        if (e.currentTarget === e.target) {
          _.invoke(props, 'onClick', e, props);
          e.preventDefault();
        }
      },
    },
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<TableCellStylesProps>(TableCell.displayName, {
    className: tableCellClassName,
    mapPropsToStyles: () => ({
      truncateContent,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <Ref innerRef={cellRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ref,
            ...unhandledProps,
          })}
        >
          {hasChildren
            ? children
            : Box.create(content, {
                defaultProps: () => ({ className: tableCellSlotClassNames.content, styles: resolvedStyles.content }),
              })}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, TableCellProps> & FluentComponentStaticProps<TableCellProps>;

TableCell.displayName = 'TableCell';

TableCell.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  content: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(customPropTypes.nodeContent), customPropTypes.nodeContent]),
  ]),
  truncateContent: PropTypes.bool,
};

TableCell.handledProps = Object.keys(TableCell.propTypes) as any;

TableCell.defaultProps = {
  accessibility: tableCellBehavior,
};

TableCell.create = createShorthandFactory({ Component: TableCell, mappedProp: 'content' });
