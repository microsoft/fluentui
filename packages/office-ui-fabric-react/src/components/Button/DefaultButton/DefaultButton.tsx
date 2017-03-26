import { BaseButton } from '../BaseButton';
const styles: any = require('./DefaultButton.scss');

export class DefaultButton extends BaseButton {
  protected classNames = {
    base: 'ms-Button',
    variant: 'ms-Button--default',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
  };

  protected onRenderDescription() { return null; }
}
