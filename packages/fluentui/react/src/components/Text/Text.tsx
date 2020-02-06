import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  SizeValue,
  AlignValue,
  ShorthandFactory,
} from '../../utils'
import { Accessibility } from '@fluentui/accessibility'

import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface TextProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** At mentions can be formatted to draw users' attention. Mentions for "me" can be formatted to appear differently. */
  atMention?: boolean | 'me'

  /** Set as disabled Text component */
  disabled?: boolean

  /** Set as error Text component */
  error?: boolean

  /** The text can appear more important and draw user's attention */
  important?: boolean

  /** The size for the Text component */
  size?: SizeValue

  /** The weight for the Text component */
  weight?: 'light' | 'semilight' | 'regular' | 'semibold' | 'bold'

  /** Set as success Text component */
  success?: boolean

  /** The text can signify a temporary state */
  temporary?: boolean

  /** Align text content. */
  align?: AlignValue

  /** Set as timestamp Text component */
  timestamp?: boolean

  /** Truncates text as needed */
  truncated?: boolean
}

class Text extends UIComponent<WithAsProp<TextProps>, any> {
  static create: ShorthandFactory<TextProps>

  static className = 'ui-text'

  static displayName = 'Text'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    atMention: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['me'])]),
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    important: PropTypes.bool,
    size: customPropTypes.size,
    weight: PropTypes.oneOf(['light', 'semilight', 'regular', 'semibold', 'bold']),
    success: PropTypes.bool,
    temporary: PropTypes.bool,
    align: customPropTypes.align,
    timestamp: PropTypes.bool,
    truncated: PropTypes.bool,
  }

  static defaultProps = {
    as: 'span',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps }): React.ReactNode {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Text.create = createShorthandFactory({ Component: Text, mappedProp: 'content' })

/**
 * A Text consistently styles and formats occurrences of text.
 */
export default withSafeTypeForAs<typeof Text, TextProps, 'span'>(Text)
