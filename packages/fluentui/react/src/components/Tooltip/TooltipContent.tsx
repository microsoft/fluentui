import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@fluentui/react-proptypes'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils'
import { Accessibility } from '@fluentui/accessibility'

import { PopperChildrenProps } from '../../utils/positioner'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface TooltipContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement']

  /** Defines whether tooltip is displayed. */
  open?: boolean

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean

  /** A ref to a pointer element. */
  pointerRef?: React.Ref<HTMLDivElement>
}

class TooltipContent extends UIComponent<WithAsProp<TooltipContentProps>> {
  static create: ShorthandFactory<TooltipContentProps>

  static displayName = 'TooltipContent'
  static className = 'ui-tooltip__content'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    placement: PropTypes.string,
    pointing: PropTypes.bool,
    pointerRef: customPropTypes.ref,
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<TooltipContentProps>): React.ReactNode {
    const { children, content, open, pointing, pointerRef } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
      >
        {open && pointing && <div className={classes.pointer} ref={pointerRef} />}

        <div className={classes.content}>{childrenExist(children) ? children : content}</div>
      </ElementType>
    )
  }
}

TooltipContent.create = createShorthandFactory({ Component: TooltipContent, mappedProp: 'content' })

/**
 * A TooltipContent contains the content of a Tooltip component.
 */
export default withSafeTypeForAs<typeof TooltipContent, TooltipContentProps>(TooltipContent)
