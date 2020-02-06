import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import { isBrowser, ChildrenComponentProps, commonPropTypes } from '../../utils'

export interface PortalInnerProps extends ChildrenComponentProps {
  /** Existing element the portal should be bound to. */
  mountNode?: HTMLElement

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param data - All props.
   */
  onMount?: (props: PortalInnerProps) => void

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param data - All props.
   */
  onUnmount?: (props: PortalInnerProps) => void
}

/**
 * A PortalInner is a container for Portal's content.
 */
class PortalInner extends React.Component<PortalInnerProps> {
  static contextType = ThemeContext

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      as: false,
      className: false,
      content: false,
      styled: false,
    }),
    mountNode: PropTypes.object,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
  }

  componentDidMount() {
    _.invoke(this.props, 'onMount', this.props)
  }

  componentWillUnmount() {
    _.invoke(this.props, 'onUnmount', this.props)
  }

  render() {
    const { children, mountNode } = this.props

    const target: HTMLElement | null = isBrowser() ? this.context.target.body : null
    const container: HTMLElement | null = mountNode || target

    return container && ReactDOM.createPortal(children, container)
  }
}

export default PortalInner
