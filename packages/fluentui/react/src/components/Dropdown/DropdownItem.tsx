import * as customPropTypes from '@fluentui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import {
  UIComponent,
  RenderResultConfig,
  createShorthandFactory,
  commonPropTypes,
  ShorthandFactory,
} from '../../utils'
import { ShorthandValue, ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types'
import { UIComponentProps } from '../../utils/commonPropInterfaces'
import ListItem from '../List/ListItem'
import Icon, { IconProps } from '../Icon/Icon'
import Image, { ImageProps } from '../Image/Image'
import Box, { BoxProps } from '../Box/Box'

export interface DropdownItemSlotClassNames {
  content: string
  header: string
  image: string
  checkableIndicator: string
}

export interface DropdownItemProps extends UIComponentProps<DropdownItemProps> {
  /** A dropdown item can be active. */
  active?: boolean

  /** Item's accessibility props. */
  accessibilityItemProps?: any

  /** Item's content. */
  content?: ShorthandValue<BoxProps>

  /** Item can show check indicator if selected. */
  checkable?: boolean

  /** A slot for a checkable indicator. */
  checkableIndicator?: ShorthandValue<IconProps>

  /** Item's header. */
  header?: ShorthandValue<BoxProps>

  /** Item's image. */
  image?: ShorthandValue<ImageProps>

  /** Indicated whether the item has been set active by keyboard. */
  isFromKeyboard?: boolean

  /**
   * Called on dropdown item click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownItemProps>

  /** A dropdown item can be selected if single selection Dropdown is used. */
  selected?: boolean
}

class DropdownItem extends UIComponent<WithAsProp<DropdownItemProps>> {
  static displayName = 'DropdownItem'

  static create: ShorthandFactory<DropdownItemProps>

  static className = 'ui-dropdown__item'

  static slotClassNames: DropdownItemSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      children: false,
      content: false,
    }),
    accessibilityItemProps: PropTypes.object,
    active: PropTypes.bool,
    content: customPropTypes.itemShorthand,
    checkable: PropTypes.bool,
    checkableIndicator: customPropTypes.itemShorthandWithoutJSX,
    header: customPropTypes.itemShorthand,
    image: customPropTypes.itemShorthandWithoutJSX,
    onClick: PropTypes.func,
    isFromKeyboard: PropTypes.bool,
    selected: PropTypes.bool,
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ classes, styles, unhandledProps }: RenderResultConfig<DropdownItemProps>) {
    const {
      content,
      header,
      image,
      accessibilityItemProps,
      selected,
      checkable,
      checkableIndicator,
    } = this.props
    return (
      <ListItem
        className={DropdownItem.className}
        styles={styles.root}
        onClick={this.handleClick}
        header={Box.create(header, {
          defaultProps: () => ({
            className: DropdownItem.slotClassNames.header,
            styles: styles.header,
          }),
        })}
        media={Image.create(image, {
          defaultProps: () => ({
            avatar: true,
            className: DropdownItem.slotClassNames.image,
            styles: styles.image,
          }),
        })}
        content={Box.create(content, {
          defaultProps: () => ({
            className: DropdownItem.slotClassNames.content,
            styles: styles.content,
          }),
        })}
        endMedia={
          selected &&
          checkable && {
            content: Icon.create(checkableIndicator, {
              defaultProps: () => ({
                className: DropdownItem.slotClassNames.checkableIndicator,
                styles: styles.checkableIndicator,
              }),
            }),
            styles: styles.endMedia,
          }
        }
        truncateContent
        truncateHeader
        {...accessibilityItemProps}
        {...unhandledProps}
      />
    )
  }
}

DropdownItem.slotClassNames = {
  content: `${DropdownItem.className}__content`,
  header: `${DropdownItem.className}__header`,
  image: `${DropdownItem.className}__image`,
  checkableIndicator: `${DropdownItem.className}__checkable-indicator`,
}

DropdownItem.create = createShorthandFactory({ Component: DropdownItem, mappedProp: 'header' })

/**
 * A DropdownItem represents an option of Dropdown list.
 * Displays an item with optional rich media metadata.
 */
export default withSafeTypeForAs<typeof DropdownItem, DropdownItemProps>(DropdownItem)
