import { BaseButton } from '../BaseButton';
let styles: any = require('./IconButton.scss');

export class IconButton extends BaseButton {
  protected classNames = {
    base: 'ms-Button',
    variant: 'ms-Button--icon',
    icon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    root: styles.root
  };

  protected onRenderLabel() { return null; }
  protected onRenderDescription() { return null; }
}
