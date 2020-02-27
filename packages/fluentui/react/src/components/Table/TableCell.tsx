import * as customPropTypes from '@fluentui/react-proptypes';
import { Accessibility, tableCellBehavior } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import {
  UIComponent,
  childrenExist,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  ShorthandFactory,
  createShorthandFactory,
  applyAccessibilityKeyHandlers
} from '../../utils';
import Box, { BoxProps } from '../Box/Box';
import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';

export interface TableCellProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available TableCellBehavior
   * */
  accessibility?: Accessibility;

  /**
   * Truncate cell's content
   */
  truncateContent?: boolean;
}

export interface TableCellSlotClassNames {
  content: string;
}

class TableCell extends UIComponent<WithAsProp<TableCellProps>> {
  static displayName = 'TableCell';

  static className = 'ui-table__cell';

  static slotClassNames: TableCellSlotClassNames = {
    content: `${TableCell.className}__content`
  };

  static create: ShorthandFactory<TableCellProps>;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false
    }),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(customPropTypes.nodeContent), customPropTypes.nodeContent])
    ]),
    truncateContent: PropTypes.bool
  };

  static defaultProps = {
    accessibility: tableCellBehavior as Accessibility
  };

  cellRef = React.createRef<HTMLElement>();

  actionHandlers = {
    focusCell: e => {
      e.preventDefault();
      this.cellRef.current.focus();
    },
    performClick: e => {
      this.handleClick(e);
    }
  };

  handleClick = (e: React.SyntheticEvent) => {
    if (e.currentTarget === e.target) {
      _.invoke(this.props, 'onClick', e, this.props);
      e.preventDefault();
    }
  };

  renderComponent({ accessibility, ElementType, styles, classes, unhandledProps }: RenderResultConfig<any>): React.ReactNode {
    const { children, content } = this.props;
    const hasChildren = childrenExist(children);

    return (
      <Ref innerRef={this.cellRef}>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {hasChildren
            ? children
            : Box.create(content, {
                defaultProps: () => ({ as: 'div', styles: styles.content })
              })}
        </ElementType>
      </Ref>
    );
  }
}

TableCell.create = createShorthandFactory({ Component: TableCell, mappedProp: 'content' });

/**
 * Component represents a table cell
 */
export default withSafeTypeForAs<typeof TableCell, TableCellProps, 'div'>(TableCell);
