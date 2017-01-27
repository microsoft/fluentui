import { BaseButton } from '../BaseButton';
import './PrimaryButton.scss';
import '../ButtonCore/ButtonCore.scss';

export class PrimaryButton extends BaseButton {
  protected _variantClassName = 'ms-Button--primary';
}
