import { pxToRem, SizeValue } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { StatusProps } from '../../../../components/Status/Status'
import { StatusVariables } from './statusVariables'

const getBackgroundColor = (state: string, variables: StatusVariables) => {
  switch (state) {
    case 'success':
      return variables.successBackgroundColor
    case 'info':
      return variables.infoBackgroundColor
    case 'warning':
      return variables.warningBackgroundColor
    case 'error':
      return variables.errorBackgroundColor
    case 'unknown':
    default:
      return variables.defaultBackgroundColor
  }
}

const getTextColor = (state: string, variables: StatusVariables) => {
  switch (state) {
    case 'success':
      return variables.successTextColor
    case 'info':
      return variables.infoTextColor
    case 'warning':
      return variables.warningTextColor
    case 'error':
      return variables.errorTextColor
    case 'unknown':
    default:
      return variables.defaultTextColor
  }
}

const sizeToPxValue: Record<SizeValue, number> = {
  smallest: 8,
  smaller: 8,
  small: 8,
  medium: 10,
  large: 12,
  larger: 14,
  largest: 16,
}

export const getSizeStyles = (sizeInPx: number, variables: StatusVariables) => {
  const borderWidth = (variables.borderColor && variables.borderWidth) || 0
  const sizeInRem = pxToRem(sizeInPx + 2 * borderWidth)

  return {
    height: sizeInRem,
    width: sizeInRem,
  }
}

const statusStyles: ComponentSlotStylesPrepared<StatusProps, StatusVariables> = {
  root: ({ props: { color, size, state }, variables }): ICSSInJSStyle => {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...getSizeStyles(sizeToPxValue[size], variables),
      verticalAlign: 'middle',
      borderRadius: '9999px',
      ...(variables.borderColor && {
        borderColor: variables.borderColor,
        borderWidth: pxToRem(variables.borderWidth),
        borderStyle: 'solid',
      }),
      backgroundColor: color || getBackgroundColor(state, variables),
    }
  },

  icon: ({ props: { state }, variables }): ICSSInJSStyle => ({
    color: getTextColor(state, variables),
  }),
}

export default statusStyles
