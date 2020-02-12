import { Accessibility, tableBehavior } from '@fluentui/accessibility'
import { ReactAccessibilityBehavior } from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import {
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  UIComponent,
  applyAccessibilityKeyHandlers,
  childrenExist,
} from '../../utils'
import { ComponentVariablesObject, mergeComponentVariables } from '@fluentui/styles'
import TableRow, { TableRowProps } from './TableRow'
import TableCell from './TableCell'
import { WithAsProp, ShorthandCollection, ShorthandValue } from '../../types'

export interface TableSlotClassNames {
  header: string
}

export interface TableProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /** The columns of the Table with a space-separated list of values.
   */
  header?: ShorthandValue<TableRowProps>

  /** The rows of the Table with a space-separated list of values.
   */
  rows?: ShorthandCollection<TableRowProps>

  /**
   * Render table in compact mode
   */
  compact?: boolean
}

const handleVariablesOverrides = variables => predefinedProps => ({
  variables: mergeComponentVariables(variables, predefinedProps.variables),
})

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
 */
class Table extends UIComponent<WithAsProp<TableProps>> {
  static displayName = 'Table'
  static className = 'ui-table'

  static Cell = TableCell
  static Row = TableRow

  static slotClassNames: TableSlotClassNames = {
    header: `${Table.className}__header`,
  }

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
    header: customPropTypes.itemShorthand,
    rows: customPropTypes.collectionShorthand,
    compact: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: tableBehavior as Accessibility,
  }

  renderRows(accessibility: ReactAccessibilityBehavior, variables: ComponentVariablesObject) {
    const { rows, compact } = this.props

    return _.map(rows, (row: TableRowProps, index: number) => {
      const props = {
        compact,
        onClick: (e, props) => {
          _.invoke(row, 'onClick', e, props)
        },
      } as TableRowProps
      const overrideProps = handleVariablesOverrides(variables)
      return TableRow.create(row, {
        defaultProps: () => ({
          ...props,
          accessibility: accessibility.childBehaviors
            ? accessibility.childBehaviors.row
            : undefined,
        }),
        overrideProps,
      })
    })
  }

  renderHeader(accessibility: ReactAccessibilityBehavior, variables: ComponentVariablesObject) {
    const { header, compact } = this.props
    if (!header) {
      return null
    }

    const headerRowProps = {
      header: true,
      compact,
      className: Table.slotClassNames.header,
    } as TableRowProps

    const overrideProps = handleVariablesOverrides(variables)

    return TableRow.create(header, {
      defaultProps: () => ({
        ...headerRowProps,
        accessibility: accessibility.childBehaviors ? accessibility.childBehaviors.row : undefined,
      }),
      overrideProps,
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
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {hasChildren && children}
        {/* <thead> */}
        {!hasChildren && this.renderHeader(accessibility, variables)}
        {/* </thead> */}
        {/* <tbody> */}
        {!hasChildren && this.renderRows(accessibility, variables)}
        {/* </tbody> */}
      </ElementType>
    )
  }
}

export default Table
