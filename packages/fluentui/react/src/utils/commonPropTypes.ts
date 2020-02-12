import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'

export interface CreateCommonConfig {
  accessibility?: boolean
  children?: boolean | 'node' | 'element'
  as?: boolean
  className?: boolean
  color?: boolean
  content?: boolean | 'node' | 'shorthand'
  styled?: boolean
}

export const createCommon = (config: CreateCommonConfig = {}) => {
  const {
    accessibility = true,
    as = true,
    children = 'node',
    className = true,
    color = false,
    content = 'node',
    styled = true,
  } = config
  return {
    ...(accessibility && {
      accessibility: customPropTypes.accessibility,
    }),
    ...(as && {
      as: PropTypes.elementType,
    }),
    ...(children && {
      children: children === 'element' ? PropTypes.element : PropTypes.node,
    }),
    ...(className && {
      className: PropTypes.string,
    }),
    ...(color && {
      color: PropTypes.string,
    }),
    ...(content && {
      content:
        content === 'shorthand' ? customPropTypes.itemShorthand : customPropTypes.nodeContent,
    }),
    ...(styled && {
      styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      design: customPropTypes.design,
    }),
  }
}
