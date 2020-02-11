import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, commonPropTypes, UIComponentProps, ChildrenComponentProps } from '../../utils'
import { WithAsProp, withSafeTypeForAs } from '../../types'
import FlexItem from './FlexItem'

export interface FlexProps extends UIComponentProps, ChildrenComponentProps {
  /** Defines if container should be inline element. */
  inline?: boolean

  /** Sets vertical flow direction. */
  column?: boolean

  /** Allows overflow items to wrap on the next container's line. */
  wrap?: boolean

  /** Controls items alignment in horizontal direction. */
  hAlign?: 'start' | 'center' | 'end' | 'stretch'

  /** Controls items alignment in vertical direction. */
  vAlign?: 'start' | 'center' | 'end' | 'stretch'

  /** Defines strategy for distributing remaining space between items. */
  space?: 'around' | 'between' | 'evenly'

  /** Defines gap between each two adjacent child items. */
  gap?: 'gap.smaller' | 'gap.small' | 'gap.medium' | 'gap.large'

  /** Defines container's padding. */
  padding?: 'padding.medium'

  /** Enables debug mode. */
  debug?: boolean

  /** Orders container to fill all parent's space available. */
  fill?: boolean
}

class Flex extends UIComponent<WithAsProp<FlexProps>> {
  static Item = FlexItem

  static displayName = 'Flex'
  static className = 'ui-flex'

  static defaultProps = {
    as: 'div',
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      content: false,
    }),

    inline: PropTypes.bool,

    column: PropTypes.bool,

    wrap: PropTypes.bool,

    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
    vAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),

    space: PropTypes.oneOf(['around', 'between', 'evenly']),

    gap: PropTypes.oneOf(['gap.smaller', 'gap.small', 'gap.medium', 'gap.large']),

    padding: PropTypes.oneOf(['padding.medium']),
    fill: PropTypes.bool,

    debug: PropTypes.bool,
  }

  renderComponent({ ElementType, classes, unhandledProps }): React.ReactNode {
    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {this.renderChildren()}
      </ElementType>
    )
  }

  renderChildren = () => {
    const { column, children } = this.props

    return React.Children.map(children, (child: any) => {
      const isFlexItemElement: boolean = _.get(child, 'type.__isFlexItem')

      return isFlexItemElement
        ? React.cloneElement(child, {
            flexDirection: column ? 'column' : 'row',
          })
        : child
    })
  }
}

/**
 * A Flex is a layout component that arranges group of items aligned towards common direction (either row or column).
 */
export default withSafeTypeForAs<typeof Flex, FlexProps>(Flex)
