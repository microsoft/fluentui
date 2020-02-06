import { Accessibility } from '@fluentui/accessibility'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  pxToRem,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils'

import Icon, { IconProps } from '../Icon/Icon'
import Image, { ImageProps } from '../Image/Image'
import Layout from '../Layout/Layout'

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'

export interface LabelProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** A Label can be circular. */
  circular?: boolean

  /** A Label can take up the width of its container. */
  fluid?: boolean

  /** A Label can have an icon. */
  icon?: ShorthandValue<IconProps>

  /** A Label can position its Icon at the start or end of the layout. */
  iconPosition?: 'start' | 'end'

  /** A Label can contain an image. */
  image?: ShorthandValue<ImageProps>

  /** A Label can position its image at the start or end of the layout. */
  imagePosition?: 'start' | 'end'
}

class Label extends UIComponent<WithAsProp<LabelProps>, any> {
  static displayName = 'Label'

  static create: ShorthandFactory<LabelProps>

  static className = 'ui-label'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    circular: PropTypes.bool,
    icon: customPropTypes.itemShorthandWithoutJSX,
    iconPosition: PropTypes.oneOf(['start', 'end']),
    image: customPropTypes.itemShorthandWithoutJSX,
    imagePosition: PropTypes.oneOf(['start', 'end']),
    fluid: PropTypes.bool,
  }

  static defaultProps = {
    as: 'span',
    imagePosition: 'start',
    iconPosition: 'end',
  }

  handleIconOverrides = iconProps => {
    return {
      ...(!iconProps.xSpacing && {
        xSpacing: 'none',
      }),
    }
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps, variables, styles }) {
    const { children, content, icon, iconPosition, image, imagePosition } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType
          {...rtlTextContainer.getAttributes({ forElements: [children] })}
          {...accessibility.attributes.root}
          {...unhandledProps}
          className={classes.root}
        >
          {children}
        </ElementType>
      )
    }

    const imageElement = Image.create(image, {
      defaultProps: () => ({
        styles: styles.image,
        variables: variables.image,
      }),
    })
    const iconElement = Icon.create(icon, {
      defaultProps: () => ({
        styles: styles.icon,
        variables: variables.icon,
      }),
      overrideProps: this.handleIconOverrides,
    })

    const startImage = imagePosition === 'start' && imageElement
    const startIcon = iconPosition === 'start' && iconElement
    const endIcon = iconPosition === 'end' && iconElement
    const endImage = imagePosition === 'end' && imageElement

    const hasStartElement = startImage || startIcon
    const hasEndElement = endIcon || endImage

    return (
      <ElementType {...accessibility.attributes.root} {...unhandledProps} className={classes.root}>
        <Layout
          start={
            hasStartElement && (
              <>
                {startImage}
                {startIcon}
              </>
            )
          }
          main={content}
          end={
            hasEndElement && (
              <>
                {endIcon}
                {endImage}
              </>
            )
          }
          gap={pxToRem(3)}
        />
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory({ Component: Label, mappedProp: 'content' })

/**
 * A Label allows user to classify content.
 */
export default withSafeTypeForAs<typeof Label, LabelProps, 'span'>(Label)
