import { ReactAccessibilityBehavior } from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import { Ref } from '@fluentui/react-component-ref'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import TableCell, { TableCellProps } from './TableCell'
import {
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  createShorthandFactory,
  applyAccessibilityKeyHandlers,
  childrenExist,
} from '../../utils'
import { ShorthandCollection, WithAsProp } from '../../types'
import { Accessibility, tableRowBehavior } from '@fluentui/accessibility'
import { ComponentVariablesObject, mergeComponentVariables } from '@fluentui/styles'

export interface TableRowProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /**
   * Row cells
   */
  items?: ShorthandCollection<TableCellProps>

  /**
   * Is the row a table header
   */
  header?: boolean

  /**
   * Render table in compact mode
   */
  compact?: boolean
}

const handleVariablesOverrides = variables => predefinedProps => ({
  variables: mergeComponentVariables(variables, predefinedProps.variables),
})

/**
 * Component represents a single row in a tabular structure
 */
class TableRow extends UIComponent<WithAsProp<TableRowProps>, any> {
  static displayName = 'TableRow'

  static className = 'ui-table__row'

  static create: ShorthandFactory<TableRowProps>

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.nodeContent),
        customPropTypes.nodeContent,
      ]),
    ]),
    items: customPropTypes.collectionShorthand,
    header: PropTypes.bool,
    compact: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: tableRowBehavior as Accessibility,
  }

  rowRef = React.createRef<HTMLElement>()

  actionHandlers = {
    // https://github.com/microsoft/fluent-ui-react/issues/2150
    unsetRowTabbable: e => {
      this.rowRef.current.setAttribute('tabindex', '-1')
    },
    performClick: e => {
      this.handleClick(e)
    },
  }

  handleClick = (e: React.SyntheticEvent) => {
    if (e.currentTarget === e.target) {
      _.invoke(this.props, 'onClick', e, this.props)
      e.preventDefault()
    }
  }

  renderCells(accessibility: ReactAccessibilityBehavior, variables: ComponentVariablesObject) {
    const { items } = this.props

    const cellAccessibility = accessibility.childBehaviors
      ? accessibility.childBehaviors.cell
      : undefined

    return _.map(items, (item: TableCellProps, index: number) => {
      const cellProps = {
        accessibility: cellAccessibility as Accessibility,
      }
      const overrideProps = handleVariablesOverrides(variables)

      return TableCell.create(item, {
        defaultProps: () => cellProps,
        overrideProps,
      })
    })
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    variables,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    const { children } = this.props
    const hasChildren = childrenExist(children)

    return (
      <Ref innerRef={this.rowRef}>
        <ElementType
          className={classes.root}
          onClick={this.handleClick}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {hasChildren && children}
          {!hasChildren && this.renderCells(accessibility, variables)}
        </ElementType>
      </Ref>
    )
  }
}

TableRow.create = createShorthandFactory({ Component: TableRow, mappedArrayProp: 'items' })

export default TableRow
