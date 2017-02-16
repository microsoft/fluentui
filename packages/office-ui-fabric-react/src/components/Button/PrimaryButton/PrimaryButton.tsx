import { css } from '../../../Utilities';
import { BaseButton } from '../BaseButton';
import styles from './PrimaryButton.scss';

export class PrimaryButton extends BaseButton {
  protected getRootClassName() {
    let { disabled } = this.props;

    return css(
      super.getRootClassName(),
      'ms-Button--primary',
      styles.root,
      {
        [styles.isActive]: !disabled,
        [styles.isDisabled]: disabled
      });
  }

  protected getIconClassName() { return styles.icon; }

  protected getLabelClassName() { return styles.label; }

  protected onRenderDescription() { return null; }
}
