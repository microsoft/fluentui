import { BaseButton } from '../BaseButton';
import styles = require('./PrimaryButton.scss');

export class PrimaryButton extends BaseButton {
  protected classNames = {
    base: 'ms-Button',
    variant: 'ms-Button--primary',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
  };

  protected onRenderDescription() { return null; }

}
