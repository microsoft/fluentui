import { Accessibility } from '../../types';
import alertWarningBehavior from './alertWarningBehavior';
import alertBaseBehavior from './alertBaseBehavior';

/**
 * @description
 * Uses `alertWarningBehavior` for 'danger' and 'warning' variants.
 */
const alertBehavior: Accessibility<AlertBehaviorProps> = props =>
  props.warning || props.danger ? alertWarningBehavior(props) : alertBaseBehavior(props);

export default alertBehavior;

export type AlertBehaviorProps = {
  warning?: boolean;
  danger?: boolean;
  bodyId?: string;
};
