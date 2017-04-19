import { BaseButton } from '../BaseButton';
import styles = require('./IconButton.scss');

export class IconButton extends BaseButton {
  protected classNames = {
    base: 'ms-Button',
    variant: 'ms-Button--icon',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    root: styles.root
  };

  protected onRenderLabel() { return null; }
  protected onRenderDescription() { return null; }
}
