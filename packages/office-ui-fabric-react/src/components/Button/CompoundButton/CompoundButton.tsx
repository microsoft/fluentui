import { BaseButton } from '../BaseButton';
import styles from './CompoundButton.scss';

export class CompoundButton extends BaseButton {
  protected classNames = {
    base: 'ms-Button',
    variant: 'ms-Button--compound',
    description: styles.description,
    flexContainer: styles.flexContainer,
    icon: null,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
  };
}
