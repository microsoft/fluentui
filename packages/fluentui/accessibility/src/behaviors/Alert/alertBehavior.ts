import { Accessibility } from '../../types'
import alertWarningBehavior, { AlertProps } from './alertWarningBehavior'

/**
 * @description
 * Uses `alertWarningBehavior` for 'danger' and 'warning' variants.
 */
const alertBehavior: Accessibility<AlertProps> = props =>
  props.warning || props.danger ? alertWarningBehavior(props) : {}

export default alertBehavior
