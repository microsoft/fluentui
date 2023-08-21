import { attr } from '@microsoft/fast-element';
import { FASTSwitch } from '@microsoft/fast-foundation/switch.js';
import { SwitchLabelPosition } from './switch.options.js';

export class Switch extends FASTSwitch {
  /**
   * The label position of the switch
   *
   * @public
   * @default 'after'
   * @remarks
   * HTML Attribute: labelposition
   */
  @attr({ attribute: 'label-position' })
  public labelPosition: SwitchLabelPosition | undefined;
}
